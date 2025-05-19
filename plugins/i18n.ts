import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en: {
        // Navigation
        nav: {
          webProjects: 'WEB PROJECTS',
          photography: 'PHOTOGRAPHY',
          weddings: 'WEDDINGS',
          drone: 'DRONE',
          '3dPrinting': '3D PRINTING',
          about: 'ABOUT',
          contact: 'CONTACT'
        },
        
        // Photography categories
        photoCategories: {
          all: 'All Photography',
          wildlife: 'Wildlife',
          landscape: 'Landscape & Nature',
          portraits: 'Portraits & People',
          abstract: 'Abstract & Art',
          weddings: 'Weddings',
          realEstate: 'Real Estate'
        },
        
        // Hero section
        hero: {
          greeting: "Hi, I'm Lasse",
          tagline: 'Web Developer & Photographer',
          watchWork: 'Watch My Work'
        },
        
        // Contact form
        contactForm: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          success: 'Message sent successfully!',
          error: 'There was an error sending your message. Please try again.'
        },
        
        // Footer
        footer: {
          copyright: '© {year} Lasse Harm. All rights reserved.',
          privacyPolicy: 'Privacy Policy',
          imprint: 'Imprint'
        },
        
        // Call to action section
        cta: {
          title: 'Ready to Start Your Project?',
          description: "Let's discuss how I can help bring your vision to life with professional web development, stunning photography, or custom 3D printing.",
          button: 'Contact Me Today'
        },
        
        // Home page
        home: {
          services: 'Professional Services',
          webDev: {
            title: 'Web Development',
            description: 'Custom websites and web applications built with modern technologies.'
          },
          drone: {
            title: 'Drone Photography',
            description: 'Certified FPV drone pilot specializing in aerial photography and videography.'
          },
          photography: {
            title: 'Photography',
            description: 'Professional photography services for events, real estate, products and more.'
          },
          printing: {
            title: '3D Printing',
            description: 'Custom 3D printing services for prototypes, models, and functional parts.'
          },
          viewProjects: 'View projects',
          learnMore: 'Learn more',
          explorePortfolio: 'Explore Portfolio',
          bookSession: 'Book a Session',
          viewPackages: 'View Packages',
          exploreServices: 'Explore services'
        },
        
        // Photography pages
        photography: {
          moments: 'Capturing Moments',
          memories: 'Creating Memories',
          capturing: 'capturing love, joy, and celebration',
          gallery: 'Gallery',
          portfolio: 'Portfolio',
          approach: 'My Approach to Photography',
          aboutPhotography: 'About Photography',
          backToCollections: 'Back to Photography Collections',
          checkAvailability: 'Check Availability',
          requestPortfolio: 'Request Full Portfolio'
        },
        
        // Wedding photography
        wedding: {
          title: 'Wedding Photography',
          packages: 'Wedding Packages',
          approach: 'My Approach to Wedding Photography',
          portfolio: 'Wedding Portfolio',
          process: 'The Wedding Photography Process',
          couples: 'Happy Couples',
          faqs: 'Frequently Asked Questions',
          customPackage: 'Contact me for a custom package',
          askQuestion: 'Ask a Question',
          bookNow: 'Book This Package'
        },
        
        // Buttons and common UI elements
        common: {
          viewMore: 'View More',
          readMore: 'Read More',
          getInTouch: 'Get in Touch',
          loading: 'Loading...',
          notFound: 'Not Found',
          backHome: 'Back to Home',
          close: 'Close',
          next: 'Next',
          previous: 'Previous'
        }
      },
      de: {
        // Navigation
        nav: {
          webProjects: 'WEB PROJEKTE',
          photography: 'FOTOGRAFIE',
          weddings: 'HOCHZEITEN',
          drone: 'DROHNE',
          '3dPrinting': '3D DRUCK',
          about: 'ÜBER MICH',
          contact: 'KONTAKT'
        },
        
        // Photography categories
        photoCategories: {
          all: 'Alle Fotografien',
          wildlife: 'Wildtiere',
          landscape: 'Landschaft & Natur',
          portraits: 'Portraits & Menschen',
          abstract: 'Abstrakt & Kunst',
          weddings: 'Hochzeiten',
          realEstate: 'Immobilien'
        },
        
        // Hero section
        hero: {
          greeting: 'Hallo, ich bin Lasse',
          tagline: 'Webentwickler & Fotograf',
          watchWork: 'Meine Arbeit ansehen'
        },
        
        // Contact form
        contactForm: {
          name: 'Name',
          email: 'E-Mail',
          subject: 'Betreff',
          message: 'Nachricht',
          send: 'Nachricht senden',
          success: 'Nachricht erfolgreich gesendet!',
          error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
        },
        
        // Footer
        footer: {
          copyright: '© {year} Lasse Harm. Alle Rechte vorbehalten.',
          privacyPolicy: 'Datenschutzerklärung',
          imprint: 'Impressum'
        },
        
        // Call to action section
        cta: {
          title: 'Bereit, Ihr Projekt zu starten?',
          description: 'Lassen Sie uns besprechen, wie ich Ihre Vision mit professioneller Webentwicklung, beeindruckender Fotografie oder maßgeschneidertem 3D-Druck zum Leben erwecken kann.',
          button: 'Kontaktieren Sie mich'
        },
        
        // Home page
        home: {
          services: 'Professionelle Leistungen',
          webDev: {
            title: 'Webentwicklung',
            description: 'Maßgeschneiderte Websites und Webanwendungen mit modernen Technologien.'
          },
          drone: {
            title: 'Drohnenfotografie',
            description: 'Zertifizierter FPV-Drohnenpilot, spezialisiert auf Luftaufnahmen und Videografie.'
          },
          photography: {
            title: 'Fotografie',
            description: 'Professionelle Fotografie für Veranstaltungen, Immobilien, Produkte und mehr.'
          },
          printing: {
            title: '3D-Druck',
            description: 'Maßgeschneiderte 3D-Druckdienstleistungen für Prototypen, Modelle und funktionale Teile.'
          },
          viewProjects: 'Projekte anzeigen',
          learnMore: 'Mehr erfahren',
          explorePortfolio: 'Portfolio erkunden',
          bookSession: 'Termin buchen',
          viewPackages: 'Pakete anzeigen',
          exploreServices: 'Dienstleistungen erkunden'
        },
        
        // Photography pages
        photography: {
          moments: 'Momente festhalten',
          memories: 'Erinnerungen schaffen',
          capturing: 'Liebe, Freude und Feiern festhalten',
          gallery: 'Galerie',
          portfolio: 'Portfolio',
          approach: 'Mein Ansatz zur Fotografie',
          aboutPhotography: 'Über Fotografie',
          backToCollections: 'Zurück zu Fotografie-Kollektionen',
          checkAvailability: 'Verfügbarkeit prüfen',
          requestPortfolio: 'Vollständiges Portfolio anfordern'
        },
        
        // Wedding photography
        wedding: {
          title: 'Hochzeitsfotografie',
          packages: 'Hochzeitspakete',
          approach: 'Mein Ansatz zur Hochzeitsfotografie',
          portfolio: 'Hochzeitsportfolio',
          process: 'Der Hochzeitsfotografie-Prozess',
          couples: 'Glückliche Paare',
          faqs: 'Häufig gestellte Fragen',
          customPackage: 'Kontaktieren Sie mich für ein individuelles Paket',
          askQuestion: 'Frage stellen',
          bookNow: 'Dieses Paket buchen'
        },
        
        // Buttons and common UI elements
        common: {
          viewMore: 'Mehr anzeigen',
          readMore: 'Weiterlesen',
          getInTouch: 'Kontakt aufnehmen',
          loading: 'Wird geladen...',
          notFound: 'Nicht gefunden',
          backHome: 'Zurück zur Startseite',
          close: 'Schließen',
          next: 'Weiter',
          previous: 'Zurück'
        }
      }
    }
  })

  vueApp.use(i18n)
})