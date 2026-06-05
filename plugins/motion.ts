// Global motion directives for the wildlife rebrand.
//   v-reveal        → fade/slide/scale/blur in when scrolled into view
//   v-reveal:left   → directional variant (left | right | scale | blur)
//   v-reveal="{ delay: 200, once: false }"  → options
//   v-reveal.stagger → stagger the element's direct children
//   v-tilt           → playful pointer-driven 3D tilt on hover
//   v-parallax="0.2" → translate element on scroll for depth
//
// Registered universally so SSR can resolve the directives (each provides a
// no-op getSSRProps). All DOM work happens in client-only hooks (mounted/etc.).
// Honors prefers-reduced-motion: content is never hidden and interactive
// motion is a no-op for users who ask for less.

export default defineNuxtPlugin((nuxtApp) => {
  const isClient = typeof window !== 'undefined'
  const prefersReduced = isClient && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Flag the document so CSS only hides [data-reveal] when JS is present
  // (progressive enhancement — no-JS users see everything).
  if (isClient && !prefersReduced && typeof document !== 'undefined') {
    document.documentElement.classList.add('motion-ready')

    // Failsafe: independent of the IntersectionObserver, reveal any reveal
    // element whose top has reached the viewport. Guarantees content can never
    // get stuck hidden, regardless of element height or observer timing.
    // setTimeout-throttled (not rAF) so it still runs if rAF is throttled.
    let queued = false
    const sweep = () => {
      queued = false
      const vh = window.innerHeight || 800
      const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
      els.forEach((el) => {
        // top has entered (or passed) the viewport bottom → reveal & keep
        if (el.getBoundingClientRect().top < vh * 0.95) {
          const d = Number(el.dataset.revealDelay || 0)
          window.setTimeout(() => el.classList.add('is-visible'), d)
        }
      })
      return els.length
    }
    const requestSweep = () => {
      if (queued) return
      queued = true
      window.setTimeout(sweep, 60)
    }
    window.addEventListener('scroll', requestSweep, { passive: true })
    window.addEventListener('resize', requestSweep, { passive: true })
    // Brief post-mount poll catches async-rendered & above-the-fold content
    // without waiting for a scroll event.
    let ticks = 0
    const poll = window.setInterval(() => {
      sweep()
      if (++ticks > 24) window.clearInterval(poll) // ~4s safety window
    }, 160)
  }

  // ---- Shared reveal observer ---------------------------------------------
  let observer: IntersectionObserver | null = null
  const onceEls = new WeakSet<Element>()

  const ensureObserver = () => {
    if (observer || typeof IntersectionObserver === 'undefined') return observer
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            const delay = Number(el.dataset.revealDelay || 0)
            window.setTimeout(() => el.classList.add('is-visible'), delay)
            if (el.dataset.revealOnce !== 'false') {
              observer?.unobserve(el)
              onceEls.add(el)
            }
          } else if (el.dataset.revealOnce === 'false' && !onceEls.has(el)) {
            el.classList.remove('is-visible')
          }
        }
      },
      // threshold 0 → fire as soon as ANY pixel enters (tall sections taller
      // than the viewport could never reach a fractional threshold and would
      // otherwise stay hidden forever).
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (prefersReduced) {
        el.classList.add('is-visible')
        return
      }
      const variant = binding.arg // left | right | scale | blur
      el.setAttribute('data-reveal', variant || '')
      const opts = binding.value || {}
      if (opts.delay) el.dataset.revealDelay = String(opts.delay)
      if (opts.once === false) el.dataset.revealOnce = 'false'
      if (binding.modifiers.stagger) {
        Array.from(el.children).forEach((child, i) => {
          const c = child as HTMLElement
          c.setAttribute('data-reveal', '')
          c.dataset.revealDelay = String(i * 90)
          ensureObserver()?.observe(c)
        })
        return
      }
      ensureObserver()?.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })

  // ---- Playful 3D tilt on hover -------------------------------------------
  nuxtApp.vueApp.directive('tilt', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (prefersReduced) return
      const max = Number(binding.value ?? 8)
      el.style.transition = 'transform 0.25s cubic-bezier(0.22,1,0.36,1)'
      el.style.transformStyle = 'preserve-3d'

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        el.style.transform =
          `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-4px)`
      }
      const onLeave = () => {
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)'
      }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      ;(el as any).__tiltCleanup = () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    unmounted(el: HTMLElement) {
      ;(el as any).__tiltCleanup?.()
    },
  })

  // ---- Scroll parallax -----------------------------------------------------
  const parallaxEls: { el: HTMLElement; speed: number }[] = []
  let ticking = false

  const applyParallax = () => {
    const vh = window.innerHeight
    for (const { el, speed } of parallaxEls) {
      const r = el.getBoundingClientRect()
      const offset = (r.top + r.height / 2 - vh / 2) * speed
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }
    ticking = false
  }
  const onScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(applyParallax)
  }

  nuxtApp.vueApp.directive('parallax', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (prefersReduced) return
      const speed = Number(binding.value ?? 0.15)
      el.style.willChange = 'transform'
      parallaxEls.push({ el, speed })
      if (parallaxEls.length === 1) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
      }
      applyParallax()
    },
    unmounted(el: HTMLElement) {
      const i = parallaxEls.findIndex((p) => p.el === el)
      if (i > -1) parallaxEls.splice(i, 1)
      if (parallaxEls.length === 0) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    },
  })
})
