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
              value: 'lasse@lasseharm.space'
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
          ],
          cta: {
            question: 'Want to see my career timeline and professional projects?',
            viewJourney: 'View My Journey',
            downloadCv: 'Download CV',
            viewCv: 'View CV'
          }
        },

        // Contact page
        contact: {
          hero: {
            title: 'Contact Me',
            subtitle: "Let's discuss how I can help bring your vision to life. Get in touch today."
          }
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
          exploreServices: 'Visit 3DPS',
          currentlyAt: 'Currently at',
          workingOnTitle: "What I'm working on right now",
          current: 'Current',
          mainFocus: 'Main focus',
          hobbies: 'Hobbies & Side Projects',
          seeAllProjects: 'See all projects & career timeline',
          featuredHitDesc: 'Enterprise dealer information platform — complex data flows, real-time management.',
          featuredSsbpDesc: 'Complete rewrite of the application platform — front-end architecture, modernized stack.'
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
          requestPortfolio: 'Request Full Portfolio',
          hero: {
            titlePrefix: 'Capturing',
            titleHighlight: 'Moments',
            subtitle: 'Wildlife, landscapes, portraits, and the occasional wedding',
            browse: 'Browse Collections'
          },
          about: {
            title: 'About My Photography',
            p1: 'With a passion for capturing the beauty in both natural landscapes and human emotions, I strive to create images that tell stories and evoke feelings.',
            p2: "Whether I'm photographing wildlife in their natural habitat, documenting the joy of a wedding day, or creating captivating landscapes, my goal is to produce images that stand the test of time.",
            learnMore: 'Learn more about me'
          },
          collections: {
            title: 'Photography Collections',
            subtitle: 'Explore my diverse photography portfolio spanning from wildlife to weddings'
          },
          categories: {
            wildlife: {
              title: 'Wildlife',
              description: 'Capturing the beauty and behavior of animals in their natural habitats.'
            },
            landscape: {
              title: 'Landscape & Nature',
              description: "Breathtaking views of natural landscapes and close-ups of nature's wonders."
            },
            portraits: {
              title: 'Portraits & People',
              description: 'Authentic portraits and candid moments capturing human emotions and stories.'
            },
            abstract: {
              title: 'Abstract & Art',
              description: 'Creative interpretations and artistic compositions that challenge perception.'
            },
            weddings: {
              title: 'Weddings',
              description: 'Capturing the magic, emotions, and precious moments of wedding celebrations.'
            }
          },
          weddingSection: {
            title: 'Wedding Photography',
            subtitle: 'The one area where I do take bookings — because weddings deserve someone who genuinely cares about the story.',
            features: {
              engagement: {
                title: 'Engagement Sessions',
                description: 'Pre-wedding photoshoots to capture your love story and create beautiful save-the-date announcements.'
              },
              fullDay: {
                title: 'Full Day Coverage',
                description: 'Comprehensive documentation from getting ready to the last dance, ensuring no precious moment is missed.'
              },
              albums: {
                title: 'Luxury Albums',
                description: 'Handcrafted, high-quality wedding albums that tell the story of your day with elegance and style.'
              }
            },
            seeGallery: 'See Wedding Gallery'
          },
          ctaBlock: {
            title: 'Like what you see?',
            subtitle: "If you're interested in wedding photography or just want to chat about cameras, feel free to reach out.",
            button: 'Say Hi'
          }
        },

        // Drone page
        drone: {
          hero: {
            subtitle: 'Flying, building, crashing, rebuilding. Repeat.'
          },
          feeling: {
            title: 'The feeling',
            p1: 'FPV stands for First Person View. You wear goggles that show a live camera feed from the drone, so you see what the drone sees. It feels like you\'re actually flying.',
            p2: 'I fly both <span class="text-neon-cyan">freestyle</span> and <span class="text-neon-purple">cinematic</span>. Freestyle is creative expression — flips, rolls, power loops, diving through gaps. Cinematic is smooth, sweeping movements that make footage feel like it came out of a movie.',
            p3: "There's a feeling of freedom to it that's hard to describe. When you're locked in, flying a line you've been visualizing, everything else fades away. Just you and the sky."
          },
          building: {
            title: 'Building them is half the fun',
            p1: "Every quad I fly started as a pile of parts on my desk. Picking a frame, choosing motors, soldering the flight controller and ESC stack, wiring up the VTX and camera — it's deeply satisfying.",
            p2: "Then comes the software side: flashing Betaflight, configuring rates, dialing in PID values until the quad responds exactly how you want. And honestly, the build is never truly finished. You're always swapping props, trying different cameras, adjusting filters.",
            p3: "I prefer 5-inch true-X frames for freestyle. There's something about the way they fly — responsive, aggressive, but still smooth enough for cinematic lines when you want them."
          },
          sim: {
            title: 'Sim time',
            p1: "Before sending a quad into the sky, I spend hours in simulators. They're the safest and cheapest way to build muscle memory and try new tricks without breaking parts.",
            p2: '<span class="text-neon-cyan font-medium">Liftoff</span> is my main sim for freestyle practice. The physics feel very close to real life, and the track editor is great for building custom courses. <span class="text-neon-green font-medium">Velocidrone</span> is the go-to for racing — the timing systems and competitive multiplayer make it the closest thing to a real race without leaving the house.',
            p3: 'I plug in my actual radio controller and fly with the same sticks, same rates. When I go outside to fly for real, the transition is seamless.'
          },
          racing: {
            title: 'Racing',
            p1: "Tiny quads ripping through gates at over 120 km/h. Drone racing is one of the most intense hobbies I've picked up. It's less about creativity and more about precision, consistency, and split-second decisions. You fly a course over and over, shaving fractions of a second off your lap times.",
            p2: "What really makes it special is the community. Local race days are full of people sharing tips, lending parts, and cheering each other on. Everyone's there because they love the same weird, wonderful hobby. Whether you finish first or last, you leave wanting to come back."
          },
          fleet: {
            title: 'What I fly',
            p1: 'My <span class="text-neon-cyan font-medium">DJI Air 2S</span> is the go-to for landscape and travel shots. One-inch sensor, gorgeous detail, and intelligent modes that make getting cinematic results easy when I\'m exploring new places.',
            p2: 'The <span class="text-neon-green font-medium">5" Freestyle quad</span> is custom-built for ripping through the sky. Full manual flight, GoPro mounted on top. There\'s nothing like it.',
            p3: 'And the <span class="text-neon-purple font-medium">Cinewhoop</span> — ducted props make it safe for indoor flying. I love using it for smooth, slow proximity flights through tight spaces. Perfect for those buttery cinematic shots.'
          },
          footage: {
            title: 'Some footage'
          }
        },

        // 3D Printing page
        printing: {
          hero: {
            title1: '3D Printing',
            title2: '& Making',
            subtitle: 'Turning ideas into real, tangible things. One layer at a time.',
            visit: 'Visit 3dps.space'
          },
          why: {
            title: 'Why I print',
            p1: '3D printing combines everything I love: problem-solving, design, technology, and the satisfaction of building something real. The whole journey from a rough idea to a finished print is endlessly rewarding — sketching a concept, modeling it in CAD, dialing in the slicer settings, and watching layer after layer come to life.',
            p2: "What started as curiosity quickly turned into a full-blown workshop. Whether it's functional parts for around the house, custom enclosures for electronics projects, or purely creative prints just because they look cool — there's always something on the build plate.",
            p3: 'I also run <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="text-neon-green hover:underline font-medium">3dps.space</a> as a side project where I share more about printing and the maker community.'
          },
          cad: {
            title: 'Designing in 3D',
            p1: 'Every great print starts with a great model. I use <span class="text-neon-purple font-medium">Blender</span> for anything organic, sculptural, or artistically driven — sculpting, subdivision modeling, and quick concept work. When a shape needs to feel alive rather than measured, Blender is where it happens.',
            p2: 'For anything mechanical or dimensionally precise, I reach for <span class="text-neon-cyan font-medium">Plasticity</span>. It\'s a modern CAD tool that\'s fast and intuitive while delivering the exact, watertight geometry that 3D printing demands. Enclosures, brackets, mounts — anything that needs to fit just right.',
            p3: "The two complement each other perfectly. Sometimes a project starts in Plasticity for the precise shell and moves to Blender for decorative details. Other times it's pure Blender from start to finish."
          },
          workshop: {
            title: 'The workshop',
            p1: 'My main workhorse is the <span class="text-neon-green font-medium">Bambulab X1C</span> — a CoreXY speed machine with multi-material capabilities through the AMS system. It\'s fast, precise, and handles everything from PLA to ABS without breaking a sweat. The built-in lidar and camera monitoring mean I can start a print and walk away knowing it\'ll be fine.',
            p2: 'Next to it sits the <span class="text-neon-green font-medium">Bambulab P1S</span>, the enclosed everyday printer. Reliable, quiet, and perfect for materials that need a stable temperature. Between the two Bambulab machines, most of my printing happens here.',
            p3: 'The <span class="text-neon-cyan font-medium">Snapmaker U1</span> is the Swiss Army knife — swappable tool heads let it 3D print, laser engrave, and CNC mill. One machine, endless possibilities. It\'s great for projects that mix disciplines.',
            p4: 'And when the build plate needs to be big, the <span class="text-neon-purple font-medium">Anycubic Kobra Max 3</span> steps in. Large format printing for oversized projects and pieces that just won\'t fit anywhere else.'
          },
          multicolor: {
            title: 'Multi-color printing',
            p1: 'One of the most exciting parts of my setup is the Bambulab AMS (Automatic Material System). It switches between up to four filament spools during a single print — full multi-color without manual filament swaps.',
            p2: 'This opens up a whole new dimension: color-accurate logos, prints with contrasting accents, models with built-in text, or functional parts that combine different materials — like a rigid body with a flexible TPU grip. Chain multiple AMS units together and even 8- or 16-color prints become possible.',
            p3: "It's the kind of capability that used to require industrial machines, now sitting on a desk in my office."
          },
          prints: {
            title: 'Some prints'
          },
          ctaBlock: {
            title: 'Curious about 3D printing?',
            subtitle: 'Check out my side project for more builds, guides, and maker content.'
          }
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
          previous: 'Previous',
          back: 'Back',
          viewProject: 'View Project'
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
              value: 'lasse@lasseharm.space'
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
          ],
          cta: {
            question: 'Möchten Sie meinen beruflichen Werdegang und meine Projekte sehen?',
            viewJourney: 'Meinen Werdegang ansehen',
            downloadCv: 'Lebenslauf herunterladen',
            viewCv: 'Lebenslauf ansehen'
          }
        },

        // Contact page
        contact: {
          hero: {
            title: 'Kontakt',
            subtitle: 'Lassen Sie uns besprechen, wie ich Ihre Vision zum Leben erwecken kann. Nehmen Sie noch heute Kontakt auf.'
          }
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
          exploreServices: 'Dienstleistungen erkunden',
          currentlyAt: 'Aktuell bei',
          workingOnTitle: 'Woran ich gerade arbeite',
          current: 'Aktuell',
          mainFocus: 'Hauptfokus',
          hobbies: 'Hobbys & Nebenprojekte',
          seeAllProjects: 'Alle Projekte & Karriere-Verlauf ansehen',
          featuredHitDesc: 'Enterprise-Plattform für Händlerinformationen — komplexe Datenflüsse, Echtzeit-Verwaltung.',
          featuredSsbpDesc: 'Komplette Neuentwicklung der Anwendungsplattform — Frontend-Architektur, modernisierter Stack.'
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
          requestPortfolio: 'Vollständiges Portfolio anfordern',
          hero: {
            titlePrefix: 'Momente',
            titleHighlight: 'festhalten',
            subtitle: 'Wildtiere, Landschaften, Portraits und gelegentlich Hochzeiten',
            browse: 'Kollektionen ansehen'
          },
          about: {
            title: 'Über meine Fotografie',
            p1: 'Mit der Leidenschaft, die Schönheit von Naturlandschaften und menschlichen Emotionen gleichermaßen einzufangen, möchte ich Bilder schaffen, die Geschichten erzählen und Gefühle wecken.',
            p2: 'Ob ich Wildtiere in ihrem natürlichen Lebensraum fotografiere, die Freude eines Hochzeitstages dokumentiere oder beeindruckende Landschaften festhalte — mein Ziel ist es, Bilder zu schaffen, die die Zeit überdauern.',
            learnMore: 'Mehr über mich erfahren'
          },
          collections: {
            title: 'Fotografie-Kollektionen',
            subtitle: 'Entdecken Sie mein vielfältiges Fotografie-Portfolio von Wildtieren bis zu Hochzeiten'
          },
          categories: {
            wildlife: {
              title: 'Wildtiere',
              description: 'Die Schönheit und das Verhalten von Tieren in ihrem natürlichen Lebensraum festhalten.'
            },
            landscape: {
              title: 'Landschaft & Natur',
              description: 'Atemberaubende Ausblicke auf Naturlandschaften und Nahaufnahmen der Wunder der Natur.'
            },
            portraits: {
              title: 'Portraits & Menschen',
              description: 'Authentische Portraits und spontane Momente, die menschliche Emotionen und Geschichten einfangen.'
            },
            abstract: {
              title: 'Abstrakt & Kunst',
              description: 'Kreative Interpretationen und künstlerische Kompositionen, die die Wahrnehmung herausfordern.'
            },
            weddings: {
              title: 'Hochzeiten',
              description: 'Die Magie, Emotionen und kostbaren Momente von Hochzeitsfeiern festhalten.'
            }
          },
          weddingSection: {
            title: 'Hochzeitsfotografie',
            subtitle: 'Der eine Bereich, in dem ich Buchungen annehme — denn Hochzeiten verdienen jemanden, dem die Geschichte wirklich am Herzen liegt.',
            features: {
              engagement: {
                title: 'Verlobungs-Shootings',
                description: 'Vor-Hochzeits-Fotoshootings, um Ihre Liebesgeschichte einzufangen und wunderschöne Save-the-Date-Ankündigungen zu gestalten.'
              },
              fullDay: {
                title: 'Ganztägige Begleitung',
                description: 'Umfassende Dokumentation vom Getting-Ready bis zum letzten Tanz — kein kostbarer Moment geht verloren.'
              },
              albums: {
                title: 'Luxus-Alben',
                description: 'Handgefertigte, hochwertige Hochzeitsalben, die die Geschichte Ihres Tages mit Eleganz und Stil erzählen.'
              }
            },
            seeGallery: 'Hochzeitsgalerie ansehen'
          },
          ctaBlock: {
            title: 'Gefällt Ihnen, was Sie sehen?',
            subtitle: 'Wenn Sie sich für Hochzeitsfotografie interessieren oder einfach über Kameras plaudern möchten, melden Sie sich gerne.',
            button: 'Hallo sagen'
          }
        },

        // Drone page
        drone: {
          hero: {
            subtitle: 'Fliegen, bauen, abstürzen, wieder aufbauen. Wiederholen.'
          },
          feeling: {
            title: 'Das Gefühl',
            p1: 'FPV steht für First Person View. Man trägt eine Brille, die den Live-Kamerafeed der Drohne zeigt — man sieht, was die Drohne sieht. Es fühlt sich an, als würde man selbst fliegen.',
            p2: 'Ich fliege sowohl <span class="text-neon-cyan">Freestyle</span> als auch <span class="text-neon-purple">Cinematic</span>. Freestyle ist kreativer Ausdruck — Flips, Rolls, Power Loops, das Durchqueren von Lücken. Cinematic sind weiche, schwungvolle Bewegungen, die das Material wie aus einem Film wirken lassen.',
            p3: 'Es gibt ein Gefühl von Freiheit, das schwer zu beschreiben ist. Wenn man voll konzentriert ist und eine Linie fliegt, die man sich vorgestellt hat, verblasst alles andere. Nur du und der Himmel.'
          },
          building: {
            title: 'Der Bau macht den halben Spaß aus',
            p1: 'Jeder Quad, den ich fliege, begann als Haufen Teile auf meinem Tisch. Einen Rahmen auswählen, Motoren aussuchen, Flight Controller und ESC-Stack löten, VTX und Kamera verdrahten — es ist zutiefst befriedigend.',
            p2: 'Dann kommt die Software-Seite: Betaflight flashen, Rates konfigurieren, PID-Werte einstellen, bis der Quad genau so reagiert, wie man es will. Und ehrlich gesagt ist ein Build nie wirklich fertig. Man tauscht ständig Props, probiert andere Kameras aus, passt Filter an.',
            p3: 'Für Freestyle bevorzuge ich 5-Zoll True-X-Rahmen. Sie fliegen auf eine ganz besondere Art — reaktionsschnell, aggressiv, aber trotzdem sanft genug für Cinematic-Linien, wenn man es möchte.'
          },
          sim: {
            title: 'Sim-Zeit',
            p1: 'Bevor ein Quad in den Himmel geht, verbringe ich Stunden in Simulatoren. Sie sind die sicherste und günstigste Art, Muskelgedächtnis aufzubauen und neue Tricks zu üben, ohne Teile zu zerstören.',
            p2: '<span class="text-neon-cyan font-medium">Liftoff</span> ist mein Haupt-Sim für Freestyle-Training. Die Physik fühlt sich sehr nah am echten Leben an, und der Streckeneditor ist großartig für eigene Kurse. <span class="text-neon-green font-medium">Velocidrone</span> ist die erste Wahl für Racing — die Timing-Systeme und der kompetitive Multiplayer kommen einem echten Rennen ohne das Haus zu verlassen am nächsten.',
            p3: 'Ich schließe meinen echten Funksender an und fliege mit den gleichen Sticks und Rates. Wenn ich dann draußen fliege, ist der Übergang nahtlos.'
          },
          racing: {
            title: 'Racing',
            p1: 'Winzige Quads, die mit über 120 km/h durch Tore rasen. Drohnenrennen gehören zu den intensivsten Hobbys, die ich aufgenommen habe. Es geht weniger um Kreativität und mehr um Präzision, Konstanz und Sekundenbruchteil-Entscheidungen. Man fliegt einen Kurs wieder und wieder und rasiert Bruchteile einer Sekunde von seinen Rundenzeiten ab.',
            p2: 'Was es wirklich besonders macht, ist die Community. Lokale Renntage sind voller Menschen, die Tipps teilen, Teile verleihen und sich gegenseitig anfeuern. Jeder ist da, weil er dasselbe seltsame, wunderbare Hobby liebt. Ob man Erster oder Letzter wird — man geht mit dem Wunsch nach Hause, wiederzukommen.'
          },
          fleet: {
            title: 'Was ich fliege',
            p1: 'Meine <span class="text-neon-cyan font-medium">DJI Air 2S</span> ist die erste Wahl für Landschafts- und Reiseaufnahmen. Ein-Zoll-Sensor, wunderschöne Details und intelligente Modi, die Cinematic-Ergebnisse leicht machen, wenn ich neue Orte erkunde.',
            p2: 'Der <span class="text-neon-green font-medium">5-Zoll-Freestyle-Quad</span> ist maßgeschneidert, um durch den Himmel zu reißen. Vollmanuelles Fliegen, GoPro oben montiert. Es gibt nichts Vergleichbares.',
            p3: 'Und der <span class="text-neon-purple font-medium">Cinewhoop</span> — ummantelte Props machen ihn sicher für Indoor-Flüge. Ich nutze ihn gerne für sanfte, langsame Proximity-Flüge durch enge Räume. Perfekt für diese butterweichen Cinematic-Shots.'
          },
          footage: {
            title: 'Einige Aufnahmen'
          }
        },

        // 3D Printing page
        printing: {
          hero: {
            title1: '3D-Druck',
            title2: '& Making',
            subtitle: 'Ideen in reale, greifbare Dinge verwandeln. Eine Schicht nach der anderen.',
            visit: 'Zu 3dps.space'
          },
          why: {
            title: 'Warum ich drucke',
            p1: '3D-Druck vereint alles, was ich liebe: Problemlösung, Design, Technik und die Befriedigung, etwas Reales zu bauen. Der ganze Weg von einer groben Idee bis zum fertigen Druck ist endlos lohnend — ein Konzept skizzieren, in CAD modellieren, die Slicer-Einstellungen feinjustieren und zusehen, wie Schicht für Schicht zum Leben erwacht.',
            p2: 'Was als Neugier begann, verwandelte sich schnell in eine ausgewachsene Werkstatt. Ob funktionale Teile für den Haushalt, individuelle Gehäuse für Elektronik-Projekte oder rein kreative Drucke, nur weil sie cool aussehen — es ist immer etwas auf dem Druckbett.',
            p3: 'Ich betreibe auch <a href="https://3dps.space/" target="_blank" rel="noopener noreferrer" class="text-neon-green hover:underline font-medium">3dps.space</a> als Nebenprojekt, wo ich mehr über Druck und die Maker-Community teile.'
          },
          cad: {
            title: 'Modellieren in 3D',
            p1: 'Jeder gute Druck beginnt mit einem guten Modell. Ich nutze <span class="text-neon-purple font-medium">Blender</span> für alles Organische, Skulpturelle oder künstlerisch Getriebene — Sculpting, Subdivision-Modellierung und schnelle Konzeptarbeit. Wenn eine Form eher lebendig als vermessen wirken soll, ist Blender der Ort dafür.',
            p2: 'Für alles Mechanische oder dimensional Präzise greife ich zu <span class="text-neon-cyan font-medium">Plasticity</span>. Es ist ein modernes CAD-Tool, das schnell und intuitiv ist und dabei die exakte, wasserdichte Geometrie liefert, die der 3D-Druck verlangt. Gehäuse, Halterungen, Befestigungen — alles, was genau passen muss.',
            p3: 'Die beiden ergänzen sich perfekt. Manchmal beginnt ein Projekt in Plasticity für die präzise Hülle und wandert dann zu Blender für dekorative Details. Manchmal ist es von Anfang bis Ende reines Blender.'
          },
          workshop: {
            title: 'Die Werkstatt',
            p1: 'Mein Hauptarbeitstier ist der <span class="text-neon-green font-medium">Bambulab X1C</span> — eine CoreXY-Speed-Maschine mit Multi-Material-Fähigkeiten durch das AMS-System. Er ist schnell, präzise und verarbeitet alles von PLA bis ABS ohne Schwierigkeiten. Das eingebaute Lidar und die Kameraüberwachung bedeuten, dass ich einen Druck starten und weggehen kann, in dem Wissen, dass alles gut geht.',
            p2: 'Daneben steht der <span class="text-neon-green font-medium">Bambulab P1S</span>, der geschlossene Alltagsdrucker. Zuverlässig, leise und perfekt für Materialien, die eine stabile Temperatur brauchen. Zwischen den beiden Bambulab-Maschinen findet der Großteil meines Druckens hier statt.',
            p3: 'Der <span class="text-neon-cyan font-medium">Snapmaker U1</span> ist das Schweizer Taschenmesser — austauschbare Werkzeugköpfe erlauben 3D-Druck, Lasergravur und CNC-Fräsen. Eine Maschine, endlose Möglichkeiten. Ideal für Projekte, die verschiedene Disziplinen vereinen.',
            p4: 'Und wenn die Druckplatte groß sein muss, kommt der <span class="text-neon-purple font-medium">Anycubic Kobra Max 3</span> zum Einsatz. Großformatdruck für übergroße Projekte und Teile, die einfach nirgendwo sonst hineinpassen.'
          },
          multicolor: {
            title: 'Mehrfarbdruck',
            p1: 'Einer der spannendsten Teile meines Setups ist das Bambulab AMS (Automatic Material System). Es wechselt während eines einzigen Drucks zwischen bis zu vier Filamentspulen — voller Mehrfarbdruck ohne manuellen Filamentwechsel.',
            p2: 'Das eröffnet eine ganz neue Dimension: farbgenaue Logos, Drucke mit kontrastierenden Akzenten, Modelle mit integriertem Text oder funktionale Teile, die verschiedene Materialien kombinieren — etwa ein starrer Körper mit flexiblem TPU-Griff. Mehrere AMS-Einheiten kombiniert, werden sogar 8- oder 16-Farbdrucke möglich.',
            p3: 'Es ist die Art von Fähigkeit, die früher Industriemaschinen erforderte — und jetzt auf einem Schreibtisch in meinem Büro steht.'
          },
          prints: {
            title: 'Einige Drucke'
          },
          ctaBlock: {
            title: 'Neugierig auf 3D-Druck?',
            subtitle: 'Schauen Sie sich mein Nebenprojekt für mehr Builds, Guides und Maker-Content an.'
          }
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
          previous: 'Zurück',
          back: 'Zurück',
          viewProject: 'Projekt ansehen'
        }
      }
    }
  })

  vueApp.use(i18n)
})