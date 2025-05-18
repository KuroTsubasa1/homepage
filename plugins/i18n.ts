import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en: {
        nav: {
          webProjects: 'WEB PROJECTS',
          photography: 'PHOTOGRAPHY',
          weddings: 'WEDDINGS',
          drone: 'DRONE',
          '3dPrinting': '3D PRINTING',
          about: 'ABOUT',
          contact: 'CONTACT'
        },
        photoCategories: {
          all: 'All Photography',
          wildlife: 'Wildlife',
          landscape: 'Landscape & Nature',
          portraits: 'Portraits & People',
          abstract: 'Abstract & Art',
          weddings: 'Weddings',
          realEstate: 'Real Estate'
        },
        hero: {
          greeting: "Hi, I'm Lasse",
          tagline: 'Web Developer & Photographer'
        },
        contactForm: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          success: 'Message sent successfully!',
          error: 'There was an error sending your message. Please try again.'
        },
        footer: {
          copyright: '© {year} Lasse Harm. All rights reserved.',
          privacyPolicy: 'Privacy Policy',
          imprint: 'Imprint'
        },
        cta: {
          title: 'Ready to Start Your Project?',
          description: "Let's discuss how I can help bring your vision to life with professional web development, stunning photography, or custom 3D printing.",
          button: 'Contact Me Today'
        }
      },
      de: {
        nav: {
          webProjects: 'WEB PROJEKTE',
          photography: 'FOTOGRAFIE',
          weddings: 'HOCHZEITEN',
          drone: 'DROHNE',
          '3dPrinting': '3D DRUCK',
          about: 'ÜBER MICH',
          contact: 'KONTAKT'
        },
        photoCategories: {
          all: 'Alle Fotografien',
          wildlife: 'Wildtiere',
          landscape: 'Landschaft & Natur',
          portraits: 'Portraits & Menschen',
          abstract: 'Abstrakt & Kunst',
          weddings: 'Hochzeiten',
          realEstate: 'Immobilien'
        },
        hero: {
          greeting: 'Hallo, ich bin Lasse',
          tagline: 'Webentwickler & Fotograf'
        },
        contactForm: {
          name: 'Name',
          email: 'E-Mail',
          subject: 'Betreff',
          message: 'Nachricht',
          send: 'Nachricht senden',
          success: 'Nachricht erfolgreich gesendet!',
          error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
        },
        footer: {
          copyright: '© {year} Lasse Harm. Alle Rechte vorbehalten.',
          privacyPolicy: 'Datenschutzerklärung',
          imprint: 'Impressum'
        },
        cta: {
          title: 'Bereit, Ihr Projekt zu starten?',
          description: 'Lassen Sie uns besprechen, wie ich Ihre Vision mit professioneller Webentwicklung, beeindruckender Fotografie oder maßgeschneidertem 3D-Druck zum Leben erwecken kann.',
          button: 'Kontaktieren Sie mich'
        }
      }
    }
  })

  vueApp.use(i18n)
})