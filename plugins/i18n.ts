import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en: {
        // Contact Section
        contactSection: {
          title: 'Get in Touch',
          name: 'Your Name',
          email: 'Your Email',
          service: 'Service You\'re Interested In',
          serviceOptions: {
            select: 'Select a service',
            web: 'Web Development',
            drone: 'Drone Photography',
            photo: 'Photography',
            '3d': '3D Printing',
            other: 'Other / Not Sure'
          },
          message: 'Your Message',
          messagePlaceholder: 'Describe your project or inquiry',
          sendMessage: 'Send Message',
          sending: 'Sending...',
          success: 'Your message has been sent! I will get back to you soon.',
          error: 'There was a problem sending your message. Please try again later.',
          validationError: 'Please fill out all required fields.',
          contactInfo: {
            email: {
              title: 'Email',
              value: 'hello@lasseharm.space'
            },
            location: {
              title: 'Location',
              value: 'Schleswig-Holstein, Germany'
            },
            hours: {
              title: 'Working Hours',
              value: 'Monday - Friday: 9am - 5pm'
            }
          }
        },
        
        // About Page
        about: {
          title: 'Lasse Harm',
          subtitle: 'Web Developer | Photographer | Certified FPV Drone Pilot',
          tagline: 'Combining creativity and technology to build stunning web experiences and capture life\'s extraordinary moments.',
          aboutMeTitle: 'About Me',
          bio: {
            part1: 'Hi, I\'m Lasse Harm, a passionate web developer with a knack for problem-solving and creating intuitive web applications. My journey began in 2013, and since then, I have been dedicated to mastering the art of crafting seamless user experiences.',
            part2: 'Photography has always been close to my heart. I specialize in wildlife and macro photography, capturing the beauty of nature in intricate detail. As a certified FPV drone pilot, I love exploring the skies to capture unique aerial perspectives that tell captivating stories.',
            part3: 'My goal is to merge creativity with technology, whether it\'s through designing cutting-edge websites, snapping breathtaking photos, or flying drones to unlock new possibilities. Let\'s push the boundaries together!',
            part4: 'In my free time, I enjoy freediving in the Baltic Sea, exploring the underwater world and its hidden treasures. Surfing in the North Sea is another passion of mine, where I find thrill and excitement riding the waves.',
            part5: 'Mountain biking through the woodlands is a great way for me to stay active and connect with nature. The adrenaline rush and the scenic trails make it an exhilarating experience.'
          },
          journeyTitle: 'My Journey',
          journey: [
            { date: "2015", description: "Started my journey into web development." },
            { date: "2018", description: "Discovered my passion for photography and began exploring wildlife and macro shots." },
            { date: "2020", description: "Became a certified FPV drone pilot and started combining aerial shots with creative storytelling." },
            { date: "2023", description: "Joined exciting projects pushing the boundaries of web design and drone photography." }
          ]
        },
        
        // Testimonials
        testimonials: {
          title: 'What People Say',
          noTestimonials: 'No testimonials available for this category yet.',
          clients: {
            emmaJohnson: {
              name: 'Emma Johnson',
              role: 'Marketing Director',
              company: 'Creative Solutions',
              text: "Lasse's photography perfectly captured the essence of our brand. The images are being used across all our marketing materials and have received countless compliments."
            },
            thomasNielsen: {
              name: 'Thomas Nielsen',
              role: 'Real Estate Agent',
              company: 'Premium Properties',
              text: 'The aerial footage provided by Lasse gave our listings an incredible advantage. Properties with his drone shots sold 30% faster than our regular listings.'
            },
            sarahMartinez: {
              name: 'Sarah Martinez',
              role: 'Product Designer',
              company: 'Innovative Designs',
              text: "The 3D printed prototypes were delivered ahead of schedule and with incredible precision. Lasse's attention to detail helped us finalize our design much faster than expected."
            },
            michaelBerg: {
              name: 'Michael Berg',
              role: 'CEO',
              company: 'TechStart',
              text: 'Our website redesign by Lasse exceeded all expectations. Conversion rates improved by 45% within the first month after launch.'
            },
            lauraHansen: {
              name: 'Laura Hansen',
              role: 'Event Coordinator',
              company: 'Elite Events',
              text: 'Having Lasse photograph our corporate event was one of the best decisions we made. The images perfectly captured the energy and professionalism of our brand.'
            },
            davidAndersen: {
              name: 'David Andersen',
              role: 'Construction Manager',
              company: 'BuildRight',
              text: 'The aerial progress documentation saved us countless hours of site visits and provided valuable insights for our project management team.'
            }
          },
          at: 'at'
        },
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
          tagline: 'Developer. Photographer. Maker.',
          watchWork: 'See My Work'
        },
        
        // Contact form
        contactForm: {
          title: 'Say Hello',
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          send: 'Send Message',
          success: 'Message sent successfully!',
          error: 'There was an error sending your message. Please try again.',
          badRequest: 'Bad request. Please check the submitted data.'
        },
        
        // Footer
        footer: {
          copyright: '© {year} Lasse Harm. All rights reserved.',
          privacyPolicy: 'Privacy Policy',
          imprint: 'Imprint'
        },
        
        // Call to action section
        cta: {
          title: "Let's Build Something Together",
          description: "I'm always open to new opportunities, collaborations, and interesting projects. If you like what you see, let's talk.",
          button: 'Get in Touch'
        },
        
        // Home page
        home: {
          services: 'What I Do',
          webDev: {
            title: 'Web Development',
            description: 'I build modern web apps with Vue, Nuxt, and TypeScript. Clean code, great UX, and solid architecture.'
          },
          drone: {
            title: 'FPV Drones',
            description: 'Certified FPV drone pilot. I fly freestyle and cinematic — one of my favorite hobbies.'
          },
          photography: {
            title: 'Photography',
            description: 'Wildlife, landscapes, and the occasional wedding. Photography is how I slow down and see the world.'
          },
          printing: {
            title: '3D Printing',
            description: 'Prototypes, custom models, functional parts. Also running a small 3D printing side project.'
          },
          viewProjects: 'View projects',
          learnMore: 'Learn more',
          explorePortfolio: 'Browse photos',
          bookSession: 'Book a Session',
          viewPackages: 'View Packages',
          exploreServices: 'Visit 3DPS'
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
        // Contact Section
        contactSection: {
          title: 'Kontakt aufnehmen',
          name: 'Ihr Name',
          email: 'Ihre E-Mail',
          service: 'Dienstleistung, an der Sie interessiert sind',
          serviceOptions: {
            select: 'Wählen Sie einen Service',
            web: 'Webentwicklung',
            drone: 'Drohnenfotografie',
            photo: 'Fotografie',
            '3d': '3D-Druck',
            other: 'Anderes / Nicht sicher'
          },
          message: 'Ihre Nachricht',
          messagePlaceholder: 'Beschreiben Sie Ihr Projekt oder Ihre Anfrage',
          sendMessage: 'Nachricht senden',
          sending: 'Wird gesendet...',
          success: 'Ihre Nachricht wurde gesendet! Ich werde mich in Kürze bei Ihnen melden.',
          error: 'Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später noch einmal.',
          validationError: 'Bitte füllen Sie alle erforderlichen Felder aus.',
          contactInfo: {
            email: {
              title: 'E-Mail',
              value: 'hello@lasseharm.space'
            },
            location: {
              title: 'Standort',
              value: 'Kopenhagen, Dänemark'
            },
            hours: {
              title: 'Arbeitszeiten',
              value: 'Montag - Freitag: 9 - 17 Uhr'
            }
          }
        },
        
        // About Page
        about: {
          title: 'Lasse Harm',
          subtitle: 'Webentwickler | Fotograf | Zertifizierter FPV-Drohnenpilot',
          tagline: 'Verbindung von Kreativität und Technologie, um beeindruckende Web-Erlebnisse zu schaffen und die außergewöhnlichen Momente des Lebens einzufangen.',
          aboutMeTitle: 'Über Mich',
          bio: {
            part1: 'Hallo, ich bin Lasse Harm, ein leidenschaftlicher Webentwickler mit einem Talent für Problemlösung und die Erstellung intuitiver Webanwendungen. Meine Reise begann 2013, und seitdem widme ich mich der Meisterung der Kunst, nahtlose Benutzererlebnisse zu schaffen.',
            part2: 'Die Fotografie lag mir schon immer am Herzen. Ich bin spezialisiert auf Wildlife- und Makrofotografie und fange die Schönheit der Natur in feinen Details ein. Als zertifizierter FPV-Drohnenpilot erkunde ich gerne den Himmel, um einzigartige Luftperspektiven einzufangen, die fesselnde Geschichten erzählen.',
            part3: 'Mein Ziel ist es, Kreativität mit Technologie zu verbinden, sei es durch die Gestaltung modernster Websites, das Aufnehmen atemberaubender Fotos oder das Fliegen von Drohnen, um neue Möglichkeiten zu erschließen. Lasst uns gemeinsam Grenzen verschieben!',
            part4: 'In meiner Freizeit gehe ich gerne in der Ostsee freitauchen und erkunde die Unterwasserwelt mit ihren verborgenen Schätzen. Surfen in der Nordsee ist eine weitere Leidenschaft von mir, wo ich beim Wellenreiten Nervenkitzel und Aufregung finde.',
            part5: 'Mountainbiken durch die Wälder ist für mich eine großartige Möglichkeit, aktiv zu bleiben und mit der Natur in Verbindung zu treten. Der Adrenalinstoß und die malerischen Pfade machen es zu einem aufregenden Erlebnis.'
          },
          journeyTitle: 'Meine Reise',
          journey: [
            { date: "2015", description: "Begann meine Reise in die Webentwicklung." },
            { date: "2018", description: "Entdeckte meine Leidenschaft für Fotografie und begann, Wildlife- und Makroaufnahmen zu erkunden." },
            { date: "2020", description: "Wurde zertifizierter FPV-Drohnenpilot und begann, Luftaufnahmen mit kreativem Storytelling zu verbinden." },
            { date: "2023", description: "Beteiligte mich an spannenden Projekten, die die Grenzen von Webdesign und Drohnenfotografie erweitern." }
          ]
        },
        
        // Testimonials
        testimonials: {
          title: 'Was unsere Kunden sagen',
          noTestimonials: 'Für diese Kategorie sind noch keine Erfahrungsberichte verfügbar.',
          clients: {
            emmaJohnson: {
              name: 'Emma Johnson',
              role: 'Marketing Direktorin',
              company: 'Creative Solutions',
              text: "Lasses Fotografie hat die Essenz unserer Marke perfekt eingefangen. Die Bilder werden in all unseren Marketingmaterialien verwendet und haben zahllose Komplimente erhalten."
            },
            thomasNielsen: {
              name: 'Thomas Nielsen',
              role: 'Immobilienmakler',
              company: 'Premium Properties',
              text: 'Die von Lasse bereitgestellten Luftaufnahmen haben unseren Immobilienangeboten einen unglaublichen Vorteil verschafft. Objekte mit seinen Drohnenaufnahmen wurden 30% schneller verkauft als unsere regulären Angebote.'
            },
            sarahMartinez: {
              name: 'Sarah Martinez',
              role: 'Produktdesignerin',
              company: 'Innovative Designs',
              text: "Die 3D-gedruckten Prototypen wurden vor dem Zeitplan und mit unglaublicher Präzision geliefert. Lasses Liebe zum Detail half uns, unser Design viel schneller als erwartet zu finalisieren."
            },
            michaelBerg: {
              name: 'Michael Berg',
              role: 'CEO',
              company: 'TechStart',
              text: 'Unser Website-Redesign durch Lasse übertraf alle Erwartungen. Die Konversionsraten verbesserten sich innerhalb des ersten Monats nach dem Launch um 45%.'
            },
            lauraHansen: {
              name: 'Laura Hansen',
              role: 'Eventkoordinatorin',
              company: 'Elite Events',
              text: 'Lasse als Fotograf für unsere Firmenveranstaltung zu engagieren war eine der besten Entscheidungen, die wir getroffen haben. Die Bilder haben die Energie und Professionalität unserer Marke perfekt eingefangen.'
            },
            davidAndersen: {
              name: 'David Andersen',
              role: 'Bauleiter',
              company: 'BuildRight',
              text: 'Die Luftdokumentation des Fortschritts ersparte uns unzählige Stunden an Baustellenbesuchen und lieferte wertvolle Einblicke für unser Projektmanagement-Team.'
            }
          },
          at: 'bei'
        },
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
          title: 'Sagen Sie Hallo. Lassen Sie uns zusammenarbeiten.',
          name: 'Name',
          email: 'E-Mail',
          subject: 'Betreff',
          message: 'Nachricht',
          send: 'Nachricht senden',
          success: 'Nachricht erfolgreich gesendet!',
          error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
          badRequest: 'Ungültige Anfrage. Bitte überprüfen Sie die eingegebenen Daten.'
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