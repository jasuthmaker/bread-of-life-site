/* Editable site content. Routine updates (weather closure, news, volunteer needs, links)
   happen here and nowhere else. Every entry has an English and a Spanish version.
   Spanish text is a working draft; have a native speaker review it before launch. */
window.SITE = {
  phone: "(502) 228-0650",
  phoneTel: "+15022280650",
  email: "kyfoodpantry@gmail.com",
  timezone: "America/Kentucky/Louisville",

  // TODO(client): confirm both links before launch.
  links: {
    appointment: "https://app.pantrysoft.com/login/breadoflife",
    donate: "https://tithe.ly/give_new/www/#/tithely/give-one-time/531196",
    directions: "https://www.google.com/maps/dir//11952+W+Hwy+42,+Goshen,+KY+40026",
    facebook: "https://www.facebook.com/breadoflifegoshenky/"
  },

  // dow: 0 = Sunday ... 6 = Saturday. Times are 24h, pantry local time.
  hours: [
    { dow: 2, open: "12:30", close: "16:00" },
    { dow: 3, open: "10:00", close: "14:00" }
  ],

  // Weather closure banner. Staff: set active to true and edit the text, then set it back to false.
  weather: {
    active: false,
    title:  { en: "Closed today for weather", es: "Cerrado hoy por el clima" },
    detail: {
      en: "Oldham County Schools are closed or on NTI/online, so we are closed. If you have an appointment, please check your text messages.",
      es: "Las escuelas del condado de Oldham están cerradas o en NTI/en línea, por lo que estamos cerrados. Si tiene una cita, revise sus mensajes de texto."
    },
    makeup: {
      en: "Tuesday appointments move to Thursday. Wednesday appointments move to Friday.",
      es: "Las citas del martes pasan al jueves. Las citas del miércoles pasan al viernes."
    },
    // Policy text shown on the Get Help page. Edit freely; each block is an optional heading plus paragraphs.
    policy: [
      {
        heading: null,
        paragraphs: [
          {
            en: "We follow Oldham County Schools closure plan for inclement weather. If Oldham County Schools are closed or on NTI/online because of bad weather, we are CLOSED.",
            es: "Seguimos el plan de cierres por mal tiempo de las Escuelas del condado de Oldham. Si las escuelas están cerradas o en NTI/en línea por mal tiempo, estamos CERRADOS."
          },
          {
            en: "In addition, if there is snow or ice on the ground we may be closed because of the condition of our driveway. If you have an appointment on a day of bad weather, please check your text messages. We also try to post on our Facebook page or on the home page of our website in a timely manner.",
            es: "Además, si hay nieve o hielo en el suelo, podemos cerrar por el estado de nuestro camino de entrada. Si tiene una cita en un día de mal tiempo, revise sus mensajes de texto. También tratamos de publicar a tiempo en nuestra página de Facebook o en la página principal de nuestro sitio web."
          }
        ]
      },
      {
        heading: { en: "Make up days for pantry…", es: "Días de reposición…" },
        paragraphs: [
          { en: "If your appointment was originally on Tuesday, your new appointment will be automatically moved to Thursday.", es: "Si su cita era originalmente el martes, su nueva cita se moverá automáticamente al jueves." },
          { en: "If your appointment was originally on Wednesday, your new appointment will be automatically moved to Friday.", es: "Si su cita era originalmente el miércoles, su nueva cita se moverá automáticamente al viernes." }
        ]
      },
      {
        heading: { en: "Closure alerts", es: "Avisos de cierre" },
        paragraphs: [
          { en: "We try our best to get the word out about weather-related closures via texts and our Facebook page.", es: "Hacemos lo posible por avisar de los cierres por clima mediante mensajes de texto y nuestra página de Facebook." }
        ]
      }
    ]
  },

  // Volunteer needs (Give Help page). Staff: add, remove or reword lines.
  // TODO(client): supply the real current needs. These lines are placeholders.
  volunteerNeeds: [
    { en: "[Placeholder] Stockers", es: "[Marcador] Abastecedores" },
    { en: "[Placeholder] Shoppers", es: "[Marcador] Acompañantes de compras" },
    { en: "[Placeholder] Pick-up drivers", es: "[Marcador] Conductores de recolección" }
  ],

  // Impact numbers stay hidden until the client verifies them. Set verified to true to show the section.
  // Old site (2024): 7,151 individuals served, 82,000 lb. Client outline (2025): 70,000+ lb, 7,000+ clients ("must be verified").
  impact: {
    verified: false,
    title: { en: "Our food pantry in numbers in 2024", es: "Nuestra despensa en cifras en 2024" },
    items: [
      { value: "7,151", label: { en: "Individuals served", es: "Personas atendidas" } },
      { value: "82,000", label: { en: "pounds of food received", es: "libras de alimentos recibidas" } }
    ]
  },

  // Latest news, newest first. Used on Home and About. Wording is from the old site posts.
  // TODO(client): add current news; the old site's last posts were Oct 2025.
  news: [
    {
      date: "2025-10-18", img: "assets/img/barn.jpg",
      alt: { en: "A black barn on a gravel drive under a blue sky", es: "Un granero negro en un camino de grava bajo un cielo azul" },
      title: { en: "Inclement Weather", es: "Mal tiempo" },
      text: {
        en: "If Oldham County schools are closed OR are on NTI/online because of bad weather, we are CLOSED. In addition, if there is snow or ice on the ground we may be closed because of the condition of our driveway. If you have an appointment on a day of bad weather, please check your text messages.",
        es: "Si las escuelas del condado de Oldham están cerradas O en NTI/en línea por mal tiempo, estamos CERRADOS. Además, si hay nieve o hielo, podemos cerrar por el estado de nuestro camino de entrada. Si tiene una cita en un día de mal tiempo, revise sus mensajes de texto."
      }
    },
    {
      date: "2025-10-10", img: "assets/img/beets.jpg",
      alt: { en: "Golden and striped beets", es: "Remolachas doradas y rayadas" },
      title: { en: "Peanut Stew Recipe", es: "Receta de estofado de maní" },
      text: {
        en: "Currently, our pantry is well-stocked with peanut butter. Here is a creative and delicious use for peanut butter and sweet potatoes this fall.",
        es: "Por ahora, nuestra despensa tiene bastante mantequilla de maní. Aquí hay un uso creativo y delicioso para la mantequilla de maní y los camotes este otoño."
      }
    },
    {
      date: "2025-10-10", img: "assets/img/squash.jpg",
      alt: { en: "Yellow squash and zucchini in a crate", es: "Calabacín amarillo y verde en una caja" },
      title: { en: "Mobile Food Pantry", es: "Despensa móvil" },
      text: {
        en: "Our mobile food pantry is on hold. We had a long-term dream to put our food pantry on wheels! In 2019, that dream became reality, thanks to the generous donation of a used bread truck that we converted to a mobile pantry. Bread of Life Mobile Food Pantry was dedicated in October 2019.",
        es: "Nuestra despensa móvil está en pausa. ¡Teníamos el sueño de largo plazo de poner nuestra despensa sobre ruedas! En 2019 ese sueño se hizo realidad gracias a la generosa donación de un camión de pan usado que convertimos en despensa móvil. La despensa móvil de Bread of Life fue inaugurada en octubre de 2019."
      }
    }
  ],

  // Testimonials from the old site home page. TODO(client): approve use, and supply photos if wanted.
  voices: [
    {
      name: "Zeke", tag: { en: "Warmth & Compassion", es: "Calidez y compasión" },
      text: {
        en: "Bread of Life Food Pantry is a true blessing to our community. I volunteer there every so often, and I am always impressed by the warmth, compassion, and dedication of the team. Each time, I am able to take food from the pantry to a church that feeds their community, and I see firsthand the impact this ministry has on people’s lives. The volunteers treat everyone with dignity and kindness, and their service goes far beyond simply handing out food as they offer hope and encouragement to those who need it most. Our community is stronger and better because Bread of Life is here, faithfully serving those in need.",
        es: "La despensa Bread of Life es una verdadera bendición para nuestra comunidad. Soy voluntario allí de vez en cuando y siempre me impresiona la calidez, la compasión y la dedicación del equipo. Cada vez puedo llevar alimentos de la despensa a una iglesia que alimenta a su comunidad, y veo de primera mano el impacto de este ministerio en la vida de las personas. Los voluntarios tratan a todos con dignidad y amabilidad, y su servicio va mucho más allá de repartir comida, pues ofrecen esperanza y ánimo a quienes más lo necesitan. Nuestra comunidad es más fuerte y mejor porque Bread of Life está aquí, sirviendo fielmente a los necesitados."
      }
    },
    {
      name: "Marty", tag: { en: "Kindness", es: "Amabilidad" },
      text: {
        en: "The volunteers are amazing and make you feel so good. They love everyone and the kindness you receive gives hope that better days will come to us.",
        es: "Los voluntarios son increíbles y te hacen sentir muy bien. Quieren a todos, y la amabilidad que recibes da esperanza de que vendrán días mejores."
      }
    },
    {
      name: "Deborah", tag: { en: "No Questions Asked", es: "Sin preguntas" },
      text: {
        en: "The most amazing group of people! Helping those of us in need! No questions asked!",
        es: "¡El grupo de personas más increíble! ¡Ayudan a quienes lo necesitamos! ¡Sin hacer preguntas!"
      }
    }
  ]
};
