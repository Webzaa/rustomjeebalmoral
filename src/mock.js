// Mock data for Rustomjee Balmoral Golf Links landing page
// NOTE: Images sourced from the reference LP. Pricing/floor areas are indicative mocks;
// MahaRERA numbers, architects, connectivity are real (from rustomjee.com).

const IMG = "https://static.prod-images.emergentagent.com/jobs/b78058b9-8b55-48ff-9bd7-f2cf8aa55117/images";
import walkthroughImg from './images/balmoral-golf-links-walkthrough.webp';
import walkthrough1Img from './images/launching-chemburs.webp';

import qrcode1 from './images/qrcodewing-A.webp';
import qrcode2 from './images/qrwingc.webp';
import qrcode3 from './images/qrcodewing-F.webp';

import whybalmoral1 from './images/whybalmoral/01.webp';
import whybalmoral2 from './images/whybalmoral/02.webp';
import whybalmoral3 from './images/whybalmoral/03.webp';
import whybalmoral4 from './images/whybalmoral/04.webp';

import configuration from './images/configuration.webp';

import gallery1 from './images/gallery/01.webp';
import gallery2 from './images/gallery/02.webp';
import gallery3 from './images/gallery/03.webp';

import locIcon1 from './images/loc-icon/2.png';
import locIcon2 from './images/loc-icon/1.png';
import locIcon3 from './images/loc-icon/4.png';
import locIcon4 from './images/loc-icon/5.png';
import locIcon5 from './images/loc-icon/2.png';
import locationmap from './images/location-map.webp';

import leisure_pool_jacuzzi from './images/amenities/leisure_pool_jacuzzi.webp';
import family_pet_sanctuaries from './images/amenities/family_pet_sanctuaries.webp';
import wellness_fitness_studio from './images/amenities/wellness_fitness_studio.webp';
import landscaped_gardens_zen_walks_secret_groves from './images/amenities/landscaped_gardens_zen_walks_secret_groves.webp';
import the_clubhouse_residents_lounge from './images/amenities/the_clubhouse_residents_lounge.webp';
import work_from_garden_pods from './images/amenities/work_from_garden_pods.webp';

export const IMAGES = {
  heroDawn: `${IMG}/f128966086c1773fe5319d744d31a27ecf627b25ae1d833a396b9378a57a3789.jpeg`,
  golfHorizon: `${IMG}/6a3cbeb74f32ad990fef81e1557423f95e78ad4d400150ddcf47ace651647e2e.jpeg`,
  chembur: `${IMG}/96c3368fe2747bc7f005540ea3d75a6843d0eb1ce7f3ac4d08ab998cac78c21d.jpeg`,
  craftLiving: `${IMG}/edb749b9329b01b9dec2a95e8c028d6575dff73ccdab67d13dcd7f9fe51ec4c2.jpeg`,
  calmBedroom: `${IMG}/15248bb2b04e8a9cf3b365d7521edbacad156f26a1372bfbeb501c6cb150be97.jpeg`,
  balcony: `${IMG}/b7b587952406ca7b8c6fc9d05c1c61d06a3dbb38407f47aca424874ff448ead2.jpeg`,
  pool: `${IMG}/10554cc46d772ed34ccda05a8bc645dae85a68946d371e96deda6207e055a6a0.jpeg`,

  walkthrough: walkthroughImg,
  walkthrough1: walkthrough1Img,
  qrcode1: qrcode1,
  qrcode2: qrcode2,
  qrcode3: qrcode3,

  gallery1: gallery1,
  gallery2: gallery2,
  gallery3: gallery3,

  whybalmoral1: whybalmoral1,
  whybalmoral2: whybalmoral2,
  whybalmoral3: whybalmoral3,
  whybalmoral4: whybalmoral4,

  configuration: configuration,

  locIcon1: locIcon1,
  locIcon2: locIcon2,
  locIcon3: locIcon3,
  locIcon4: locIcon4,
  locIcon5: locIcon5,
  locationmap:locationmap,

  leisure_pool_jacuzzi:leisure_pool_jacuzzi,
family_pet_sanctuaries :family_pet_sanctuaries,
wellness_fitness_studio :wellness_fitness_studio,
landscaped_gardens_zen_walks_secret_groves:landscaped_gardens_zen_walks_secret_groves, 
the_clubhouse_residents_lounge:the_clubhouse_residents_lounge, 
work_from_garden_pods :work_from_garden_pods,
};

export const NAV_LINKS = [
  { label: "Why Balmoral", href: "#philosophy" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#Portfolio" },
  { label: "Residences", href: "#residences" },
  { label: "Walkthrough", href: "#walkthrough" },
  { label: "Location", href: "#location" },
];

export const HERO = {
  eyebrow: "A Rustomjee Address · Overlooking the BPGC Golf Course",
  titleTop: "Wake to the",
  titleBottom: "green horizon.",
  subtitle:
    "A limited collection of golf-facing residences in Chembur, engineered around tranquility and a rare, uninterrupted expanse of green.",
  cta: "Discover Balmoral",
};

export const PHILOSOPHY = {
  eyebrow: "Why Balmoral",
  intro: "A Rare Convergence of Nature & Refinement",
  items: [
    {
      no: "01",
      kicker: "The Fairway",
      title: "Panoramic Golf Views",
      body:
        "Direct, uninterrupted vistas of the Bombay Presidency Golf Club — Mumbai's largest and most historic golf course — framing your every morning.",
      image: IMAGES.whybalmoral1,
    },
    {
      no: "02",
      kicker: "The Address",
      title: "Chembur's Prime Location",
      body:
        "15 minutes to BKC. 20 minutes to the airport. Connected to every district that matters, yet removed from the city's relentless pace.",
      image: IMAGES.whybalmoral2,
    },
    {
      no: "03",
      kicker: "The Craft",
      title: "Architectural Excellence",
      body:
        "Crafted by Hafeez Contractor and Patty Mak. Every detail — from lobby to landscape — shaped by nature's rhythm and the city's finest craftsmanship.",
      image: IMAGES.whybalmoral3,
    },
    {
      no: "04",
      kicker: "The Exclusivity",
      title: "Ultra-Low Density Living",
      body:
        "Only two homes per floor, served by three dedicated elevators. Complete privacy, undiluted calm. Exclusivity rare even within Mumbai's finest addresses.",
      image: IMAGES.whybalmoral4,
    },
  ],
};

export const MARQUEE = [
  "Tranquility",
  "The BPGC Greens",
  "Detailed Living",
  "Chembur",
  "Golf-Facing",
  "Rustomjee Balmoral",
];

export const AMENITIES = {
  eyebrow: "The Amenities",
  title: "Where Time Stands Still",
  intro:
    "Every space within Balmoral designed not merely for function, but for feeling — for the quiet pleasure of an unhurried life.",
  items: [
    { no: "01", title: "Leisure Pool & Jacuzzi", 
      //body: "Every space within Balmoral designed not merely for function, but for feeling — for the quiet pleasure of an unhurried life.", 
      image: IMAGES.leisure_pool_jacuzzi 
    },
    { no: "02", title: "The Clubhouse & Residents' Lounge", 
      //body: "Viewing bar, alfresco dining, multipurpose hall, and BBQ pavilion — designed for gatherings that feel effortless and celebrations that linger.", 
      image: IMAGES.the_clubhouse_residents_lounge 
    },
    { no: "03", title: "Wellness & Fitness Studio", 
      //body: "Fully equipped fitness studio, yoga and pilates space, and a wellness lounge. A place to arrive at your best — every morning, every evening.", 
      image: IMAGES.wellness_fitness_studio },
    { no: "04", title: "Landscaped Gardens Zen Walks & Secret Groves", 
      //body: "Almost an acre of green open space across five themed zones — Forest, Grove, Garden, Meadow, and Park. Designed by COEN Design International, Singapore.", 
      image: IMAGES.landscaped_gardens_zen_walks_secret_groves },
    { no: "05", title: "Work-from-Garden Pods", 
      //body: "Open-air desks, secret groves and social lawns that blend productivity with peace." , 
      image: IMAGES.work_from_garden_pods},
    { no: "06", title: "Family & Pet Sanctuaries", 
      //body: "Chef's garden, BBQ pavilion, adventure playground and a Bark & Bound pet park.", 
      image: IMAGES.family_pet_sanctuaries },
  ],
};

export const PORTFOLIO = {
  eyebrow: "Gallery",
  title: "Let stillness move you.",
  intro: "Treat yourself to the gentle rustle of trees and the cool breeze of open spaces.",
  images: [
    { src: IMAGES.gallery2, alt: "Golf-facing living room", span: "tall" },
    { src: IMAGES.gallery1, alt: "Master bedroom with golf view", span: "wide" },
    { src: IMAGES.gallery3, alt: "Dining Area", span: "wide" },
    // { src: IMAGES.balcony, alt: "Balcony overlooking the golf course", span: "" },
    // { src: IMAGES.pool, alt: "Golf-view infinity pool", span: "" },
    // { src: IMAGES.pool, alt: "Golf-view infinity pool", span: "" },
  ],
};

export const WALKTHROUGH = {
  eyebrow: "The Walkthrough",
  title: "Step inside the film",
  intro: "A guided tour through the residences, the clubhouse and the fairways beyond.",
  videos: [
    { id: "52gH8pF9DAo", title: "Balmoral Golf Links Walkthrough — A Rare Golfside Address", poster: IMAGES.walkthrough },
    { id: "P19ms-Wcpc8", title: "Launching Chembur's Finest Gated Estate", poster: IMAGES.walkthrough1 },
  ],
};

export const RESIDENCES = {
  eyebrow: "The Residences",
  title: "Two homes per floor. One unbroken view.",
  note: "*Indicative pricing, all-inclusive · Only two homes per floor · Three elevators per core · Possession 2030",
  configs: [
    {
      key: "4 BHK",
      name: "Living well means having the best within your reach.",
      //desc: "Four bedrooms arranged around an open golf-facing living hall, with an elegant sundeck, staff quarters and utility suite.",
      carpet: "2,090 – 2,140 Sq.Ft.",
      price: "Request For Price",
      // aspect: "Golf Course & Skyline",
      // possession: "2030",
      image: IMAGES.configuration,
    },
    {
      key: "5 BHK",
      name: "Living well means having the best within your reach.",
      //desc: "Five bedrooms with a wrap-around sundeck framing the fairway, private lounge and dedicated staff quarters.",
      carpet: "2,780 – 2,860 Sq.Ft.",
      price: "Request For Price",
      // aspect: "Panoramic Golf & City",
      // possession: "2030",
      image: IMAGES.configuration,
    },
  ],
};

export const LOCATION = {
  eyebrow: "The Location",
  title: "Well-connected to business, leisure and everything in between.",
  intro: "A neighbourhood that promises less transit and more life instead.",
  points: [
    { icon: IMAGES.locIcon1, label: "Close to arterial roads like the Eastern Express Highway, BKC Connector and Santacruz-Chembur Link Road." },
    { icon: IMAGES.locIcon2, label: "Enjoys connectivity to the city’s premier business districts like BKC, Lower Parel, Nariman Point, Andheri, Powai and Vikhroli." },
    { icon: IMAGES.locIcon3, label: "Proximity to industrial hubs, transportation nodes and ports." },
    { icon: IMAGES.locIcon4, label: "Improved connectivity to other parts of Mumbai and Navi Mumbai thanks to the upcoming Mumbai Metro Lines and MTHL." },
    { icon: IMAGES.locIcon5, label: "Seamless connectivity to South Mumbai thanks to the Eastern Freeway, making the once distant downtown Mumbai just a swift drive away." }
    // { label: "CSMI International Airport", time: "25 min" },
  ],
  image: IMAGES.locationmap,
};

export const RERA = {
  eyebrow: "MahaRERA",
  title: "Registered. Verified. Singular.",
  intro: "Rustomjee Balmoral Golf Links is registered with MahaRERA across three wings. Details are available on the MahaRERA portal under registered projects.",
  portal: "https://maharera.maharashtra.gov.in/",
  wings: [
    { image: IMAGES.qrcode1, wing: "Wing A", number: "P51800080624" },
    { image: IMAGES.qrcode2, wing: "Wing C", number: "PR1180002502115" },
    { image: IMAGES.qrcode3, wing: "Wing F", number: "P51800080027" },
  ],
};

export const CONFIG_OPTIONS = ["4 BHK", "5 BHK"];

export const CONTACT = {
  eyebrow: "Register Your Interest",
  title: "GET IN TOUCH",
  intro:
    "A limited collection of golf-facing residences. Share your details and we will curate a visit at your convenience.",
};

export const FOOTER = {
  developer: "Rustomjee",
  project: "Balmoral Golf Links",
  location: "Chembur, Mumbai · Overlooking the BPGC",
  disclaimer:
    "Disclaimer - T&C Apply. The brochure is not a legal document and does not constitute an offer or contract whatsoever between the Promoter/Developer and the recipient, unless otherwise mentioned. All 3D renders, stock images, and plans are the artist’s conceptions only, provided for illustration and reference purposes. The location map and distances are approximate and not to scale; they are shown only for better understanding. All colours, furniture, and fixtures shown are for aesthetic representation purposes only and are not part of the flat offered for sale. The details mentioned in this brochure are tentative and subject to approval. The Promoter/Developer reserves the right to modify or vary the details mentioned herein at its sole discretion. Plans, amenities, and facilities are subject to the approval of the concerned authorities. The Promoter/Developer does not warrant or assume any legal liability for the accuracy, completeness, or usefulness of the information. Please contact our sales team for updated project information before making a purchase.",
};
