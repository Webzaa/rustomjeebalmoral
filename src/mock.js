// Mock data for Rustomjee Balmoral Golf Links landing page
// NOTE: Images sourced from the reference LP / official project references. Pricing/floor areas are not displayed on the LP;

const IMG = "https://static.prod-images.emergentagent.com/jobs/b78058b9-8b55-48ff-9bd7-f2cf8aa55117/images";
import chembureaddress from './assets/images/chembur_the_address.webp';
export const IMAGES = {
  heroDawn: "https://www.rustomjeegroup.com/images/rustomjee-balmoral-golflinks/gallery/gallery-1.webp",
  golfHorizon: `${IMG}/6a3cbeb74f32ad990fef81e1557423f95e78ad4d400150ddcf47ace651647e2e.jpeg`,
  chembur: `${IMG}/96c3368fe2747bc7f005540ea3d75a6843d0eb1ce7f3ac4d08ab998cac78c21d.jpeg`,
  craftLiving: `${IMG}/edb749b9329b01b9dec2a95e8c028d6575dff73ccdab67d13dcd7f9fe51ec4c2.jpeg`,
  calmBedroom: `${IMG}/15248bb2b04e8a9cf3b365d7521edbacad156f26a1372bfbeb501c6cb150be97.jpeg`,
  balcony: `${IMG}/b7b587952406ca7b8c6fc9d05c1c61d06a3dbb38407f47aca424874ff448ead2.jpeg`,
  pool: `${IMG}/10554cc46d772ed34ccda05a8bc645dae85a68946d371e96deda6207e055a6a0.jpeg`,
  chembureaddress: chembureaddress,
};

export const NAV_LINKS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Walkthrough", href: "#walkthrough" },
  { label: "Amenities", href: "#amenities" },
  { label: "Residences", href: "#residences" },
];

export const HERO = {
  eyebrow: "A Rustomjee Address · Overlooking the BPGC Golf Course",
  titleTop: "Not just Rare. ",
  titleBottom: "Singular.",
  subtitle:
    "Rustomjee Balmoral Golf Links is a 4.2-acre gated estate in Chembur, offering some of the city’s rarest views — of Mumbai’s largest golf course.",
  cta: "Discover Tranquility",
};

export const PHILOSOPHY = {
  eyebrow: "The Philosophy",
  intro: "Four ideas that shape a quieter, more considered life at Balmoral.",
  items: [
    {
      no: "01",
      kicker: "The Backyard",
      title: "An 18-hole horizon, held in reserve",
      body:
        "The fairways of the Bombay Presidency Golf Club unfold beneath your windows — a rare, protected expanse of green in the heart of Mumbai. Wake to mist over the greens, and let the day begin in a stillness the city rarely affords.",
      image: IMAGES.golfHorizon,
      imagedisclaimer: "AI Generated | Representational Image",
    },
    {
      no: "02",
      kicker: "The Address",
      title: "Chembur, quietly reimagined",
      body:
        "Set within one of Mumbai's most connected yet composed neighbourhoods, Balmoral is minutes from the Eastern Freeway, the Monorail and the coming metro — and worlds away from the noise. Arrival feels like exhale.",
      image: IMAGES.chembureaddress,
      imagedisclaimer: "Artistic Impression",
    },
    {
      no: "03",
      kicker: "The Craft",
      title: "Detail, pursued to its conclusion",
      body:
        "Floor-to-ceiling glass frames the greens. Imported stone, tactile joinery, and light studied at every hour. Conceived by Hafeez Contractor with interiors by Patty Mak — every residence engineered around a single idea.",
      image: IMAGES.craftLiving,
      imagedisclaimer: "AI Generated | Representational Image",
    },
    {
      no: "04",
      kicker: "The Calm",
      title: "A higher order of everyday",
      body:
        "Tranquility is not the absence of the city — it is mastery over it. Balmoral is designed to slow the pulse: filtered light, soft acoustics, and views that ask nothing of you but presence.",
      image: IMAGES.calmBedroom,
      imagedisclaimer: "AI Generated | Representational Image",
    },
  ],
};

export const AMENITIES = {
  eyebrow: "The Amenities",

  title: "Sanctuaries, arranged around the greens",

  intro:
    "Almost an acre of open landscape by COEN Design International, Singapore — five themed zones, a clubhouse and wellness suites woven into the calm.",

  items: [
    {
      no: "01",
      title: "Golf-View Leisure Pool",
      body:
        "A mirror-still edge that dissolves into the greens, with a kids' pool and sunbed terrace.",
      image: IMAGES.pool,
      aiGenerated: true,
    },

    {
      no: "02",
      title: "The Fairway Clubhouse",
      body:
        "A residents' lounge, AV room, viewing bar and alfresco dining framing the course.",
    },

    {
      no: "03",
      title: "Spa & Wellness Sanctuary",
      body:
        "Fitness studio, yoga & pilates space and a quiet wellness lounge.",
      image: IMAGES.calmBedroom,
      aiGenerated: true,
    },

    {
      no: "04",
      title: "Five Themed Green Zones",
      body:
        "Forest, Grove, Garden, Meadow and Park — Zen walks, groves and quiet canopies.",
    },

    {
      no: "05",
      title: "Work-from-Garden Pods",
      body:
        "Open-air desks, secret groves and social lawns that blend productivity with peace.",
      image: IMAGES.craftLiving,
      aiGenerated: true,
    },

    {
      no: "06",
      title: "Family & Pet Sanctuaries",
      body:
        "Chef's garden, BBQ pavilion, adventure playground and a Bark & Bound pet park.",
    },
  ],
};

export const WALKTHROUGH = {
  eyebrow: "The Walkthrough",
  title: "Step inside the film",
  intro: "A guided tour through the residences, the clubhouse and the fairways beyond.",
  videos: [
    { id: "52gH8pF9DAo", title: "Balmoral Golf Links Walkthrough — A Rare Golfside Address", poster: IMAGES.craftLiving },
    { id: "P19ms-Wcpc8", title: "Launching Chembur's Finest Gated Estate", poster: IMAGES.chembureaddress },
  ],
};

export const RESIDENCES = {
  eyebrow: "The Residences",
  title: "Two homes per floor. One unbroken view.",
  note: "Only two homes per floor · Possession 2030",
  configs: [
    {
      key: "4 BHK",
      name: "The Fairway Residences",
      desc: "Four bedrooms arranged around an open golf-facing living hall, with an elegant sundeck, staff quarters and utility suite.",
      aspect: "Starting at ₹9.60 Cr. (ALL INCL.)",
      possession: "2030",
      image: IMAGES.craftLiving,
    },
    {
      key: "5 BHK",
      name: "The Signature Residences",
      desc: "Five bedrooms with a wrap-around sundeck framing the fairway, private lounge and dedicated staff quarters.",
      // carpet: "2,780 – 2,860 sq.ft.",
      // price: "₹12.90 Cr*",
      aspect: "On Request",
      possession: "2030",
      image: IMAGES.calmBedroom,
    },
  ],
};

export const CONFIG_OPTIONS = ["4 BHK","5 BHK"];

export const CONTACT = {
  eyebrow: "Register Your Interest",
  title: "Arrange a private viewing",
  intro:
    "A limited collection of golf-facing residences. Share your details and we will curate a visit at your convenience.",
};

export const FOOTER = {
  developer: "Rustomjee",
  project: "Balmoral Golf Links",
  location: "Chembur, Mumbai · Overlooking the BPGC",
  disclaimer:
    "This is an indicative, non-official representation created for demonstration. Visuals are for representation only. Please verify all details with the developer before booking.",
};
