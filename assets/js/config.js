/* Editable site content. Routine updates (weather closure, news, links) happen here and nowhere else.
   Every entry has an English and a Spanish version. Spanish text is a working draft; have a native
   speaker review it before launch.
   Hours format rule (client note): no zeros (10 a.m., not 10:00 a.m.) and always a.m./p.m. */
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
  // Client-confirmed 2026-10-23: Tuesdays 12:30 to 4:30 p.m., Wednesdays 10 a.m. to 2 p.m.
  // (Only used by the open/closed pill, which is currently not shown on any page.)
  hours: [
    { dow: 2, open: "12:30", close: "16:30" },
    { dow: 3, open: "10:00", close: "14:00" }
  ],

  // Weather closure banner. OFF by default and not shown anywhere unless active is true.
  // Staff: set active to true and edit the text, then set it back to false.
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

  // Impact numbers stay hidden until the client verifies them. Set verified to true to show the section.
  // Old site (2024): 7,151 individuals served, 82,000 lb. Client web copy (2025): 70,000+ lb, 7,000+ clients ("must be verified").
  impact: {
    verified: false,
    title: { en: "Our food pantry in numbers in 2024", es: "Nuestra despensa en cifras en 2024" },
    items: [
      { value: "7,151", label: { en: "Individuals served", es: "Personas atendidas" } },
      { value: "82,000", label: { en: "pounds of food received", es: "libras de alimentos recibidas" } }
    ]
  },

  // News, newest first. Shown on the About page only (client asked for nothing below the mission on Home).
  // TODO(client): these are the old site's Oct 2025 posts (recipe post removed per client note); replace with current news.
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
      date: "2025-10-10", img: "assets/img/squash.jpg",
      alt: { en: "Yellow squash and zucchini in a crate", es: "Calabacín amarillo y verde en una caja" },
      title: { en: "Mobile Food Pantry", es: "Despensa móvil" },
      text: {
        en: "Our mobile food pantry is on hold. We had a long-term dream to put our food pantry on wheels! In 2019, that dream became reality, thanks to the generous donation of a used bread truck that we converted to a mobile pantry. Bread of Life Mobile Food Pantry was dedicated in October 2019.",
        es: "Nuestra despensa móvil está en pausa. ¡Teníamos el sueño de largo plazo de poner nuestra despensa sobre ruedas! En 2019 ese sueño se hizo realidad gracias a la generosa donación de un camión de pan usado que convertimos en despensa móvil. La despensa móvil de Bread of Life fue inaugurada en octubre de 2019."
      }
    }
  ]
};
