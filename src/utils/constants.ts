// ====== Imports ======
import banner1 from "../images/slideshow-banners/banner1.jpg";
import banner2 from "../images/slideshow-banners/banner2.jpg";
import banner3 from "../images/slideshow-banners/banner3.jpg";
import banner4 from "../images/slideshow-banners/banner4.jpg";

import logo from "../images/logo/logo.png";

import christian_gifts from "../images/categories/christian-gifts.jpg";
import holy_land_gifts from "../images/categories/holy-land-gifts.jpg";
import earrings from "../images/categories/earrings.jpg";
import dead_sea_cosmetics from "../images/categories/dead-sea-cosmetics.jpg";
import jerusalem_jewelry from "../images/categories/jerusalem-jewelry.jpg";
import keychains from "../images/categories/keychains.jpg";
import magnets from "../images/categories/magnets.jpg";
import clothing from "../images/categories/clothing.jpg";
import necklaces from "../images/categories/necklaces.jpg";
import pomegranates from "../images/categories/pomegranates.jpg";
import armenian_ceramics from "../images/categories/armenian-ceramics.jpg";
import judaica_and_messianic_gifts from "../images/categories/judaica-and-messianic-gifts.jpg";
import olive_wood_gifts from "../images/categories/olive-wood-gifts.jpg";
import holidays from "../images/categories/holidays.jpg";
import anointing_oil_and_biblical_perfumes from "../images/categories/anointing-oil-and-biblical-perfumes.jpg";

import vases from "../images/categories/vases.jpg";
import bghero from "../images/bgHero.jpg";

import payment from "../images/payment-img.jpg";
import { AddressT, NavItemT } from "./types.ts"

// ====== Assets ======
export const bgHero = bghero;
export const banner1Img = banner1;
export const banner2Img = banner2;
export const banner3Img = banner3;
export const banner4Img = banner4;
export const logoImg = logo;
export const paymentImg = payment;

// ====== Navigation ======
export const navItems: NavItemT[] = [
  { title: "Home", route: "home" },
  { title: "Shop", route: "shop" },
  { title: "Collections", route: "collections" },
  { title: "About", route: "about" },
  { title: "Contact", route: "contact" },
];

export const countries = [
  "Albania",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Aruba (Isle)",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Azores (Isles)",
  "Bahamas (Isles)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Benin",
  "Bermuda (Isles)",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cote d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "French Guiana",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Great Britain and Northern Ireland",
  "Greenland (see Denmark)",
  "Guadeloupe",
  "Guam (Isle)",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Ireland",
  "Italy",
  "Jamaica",
  "Netherlands",
  "Netherlands Antilles (see Curaçao)",
  "South Africa",
  "Tajikistan",
  "Tibet (see China PR)",
  "Togo",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "Uruguay",
  "USA",
  "Uzbekistan",
  "Vanuatu (Isles)",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Zambia",
  "Zimbabwe"
];
// ====== Collections ======
// export const collections = [
//   { title: "Tiles", route: "tiles", image: tiles },
//   { title: "Plates", route: "plates", image: plates },
//   { title: "Vases", route: "vases", image: vases },
//   { title: "Pomegranates", route: "pomegranates", image: pomegranates },
//   { title: "Mugs", route: "mugs", image: mugs },
//   { title: "Hangings", route: "hangings", image: hangings },
//   { title: "Souvenirs", route: "souvenirs", image: souvenirs },
//   { title: "Ceramics", route: "ceramics", image: ceramics },
//   { title: "Jewelry", route: "jewelry", image: jewelry },
//   { title: "Religious", route: "religious", image: religious },
//   { title: "Rings", route: "rings", image: rings },
//   { title: "Necklaces", route: "necklaces", image: necklaces },
//   { title: "Earrings", route: "earrings", image: earrings },
//   { title: "Bracelets", route: "bracelets", image: bracelets },
//   { title: "Keychains", route: "keychains", image: keychains },
//   { title: "Magnets", route: "magnets", image: magnets },
// ];
export const collections = [
  {
    title: "Anointing Oil and Biblical Perfumes",
    route: "anointing-oil-and-biblical-perfumes",
    image: anointing_oil_and_biblical_perfumes,
    subCategory: [
      { title: "Anointing Oil", route: "anointing-oil" },
      { title: "Biblical Perfumes", route: "biblical-perfumes" },
    ],
  },
  {
    title: "Armenian Ceramics",
    route: "armenian-ceramics",
    image: armenian_ceramics,
    subCategory: [
      { title: "Ash Tray", route: "ash-tray" },
      { title: "Olive Dish", route: "olive-dish" },
      { title: "Tableware Sets", route: "tableware-sets" },
      { title: "Candle Holders", route: "candle-holders" },
      { title: "Oval Dish", route: "oval-dish" },
      { title: "Tea and Coffee Pots", route: "tea-and-coffee-pots" },
      { title: "Fish Shaped Dish", route: "fish-shaped-dish" },
      { title: "Pomegranates", route: "pomegranates" },
      { title: "Tiles", route: "tiles" },
      { title: "Flat Plate", route: "flat-plate" },
      { title: "Rectangular Dish", route: "rectangular-dish" },
      { title: "Trays", route: "trays" },
      { title: "Fork and Spoon Rest", route: "fork-and-spoon-rest" },
      { title: "Round Bowls", route: "round-bowls" },
      { title: "Triangular Dish", route: "triangular-dish" },
      { title: "Vases", route: "vases" },
      { title: "Goblets", route: "goblets" },
      { title: "Salt and Pepper Dish", route: "salt-and-pepper-dish" },
      { title: "Hamsa Hand Dish", route: "hamsa-hand-dish" },
      { title: "Serving Rectangular Dish", route: "serving-rectangular-dish" },
      { title: "Hanging Ornaments", route: "hanging-ornaments" },
      { title: "Serving Round Dish", route: "serving-round-dish" },
      { title: "Heart Shaped Dish", route: "heart-shaped-dish" },
      { title: "Serving Oval Dish", route: "serving-oval-dish" },
      { title: "Hot Plates and Coasters", route: "hot-plates-and-coasters" },
      { title: "Shallow Plate", route: "shallow-plate" },
      { title: "Judaica", route: "judaica" },
      { title: "Soap Dish", route: "soap-dish" },
      { title: "Jugs", route: "jugs" },
      { title: "Square Bowls", route: "square-bowls" },
      { title: "Magnets", route: "magnets" },
      { title: "Square Dish", route: "square-dish" },
      { title: "Mirrors", route: "mirrors" },
      { title: "Sugar and Coffee Bowls", route: "sugar-and-coffee-bowls" },
      { title: "Mugs", route: "mugs" },
      { title: "Tables", route: "tables" },
    ],
  },
  {
    title: "Christian Gifts",
    route: "christian-gifts",
    image: christian_gifts,
    subCategory: [
      { title: "Children Gifts", route: "children-gifts" },
      { title: "Crosses", route: "crosses" },
      { title: "Holy Water, Oil, Candles, Earth Sets", route: "holy-water-oil-candles-earth-sets" },
      { title: "Incense and Incense Holder", route: "incense-and-incense-holder" },
      { title: "Keychains", route: "keychains" },
      { title: "Magnets", route: "magnets" },
      { title: "Necklaces – Metal, Stainless Steel, Gold Plated", route: "necklaces-metal-stainless-steel-gold-plated" },
      { title: "Olive Wood and Poly Resin Wall Plaques", route: "olive-wood-poly-resin-wall-plaques" },
      { title: "Prints – Jerusalem Artists' Prints", route: "prints-jerusalem-artists" },
      { title: "Rosary", route: "rosary" },
      { title: "Scarves", route: "scarves" },
      { title: "Silver Icons", route: "silver-icons" },
      { title: "Wooden Icon with Blessing", route: "wooden-icon-blessing" },
      { title: "Wooden Icons", route: "wooden-icons" },
    ],
  },
  {
    title: "Clothing",
    route: "clothing",
    image: clothing,
    subCategory: [
      { title: "Hats", route: "hats" },
      { title: "Israel Jerusalem Bags, Purses, and Wallets", route: "israel-jerusalem-bags-purses-wallets" },
      { title: "Kippa", route: "kippa" },
      { title: "Neck Ties", route: "neck-ties" },
      { title: "Prayer Shawl (Tallit)", route: "prayer-shawl-tallit" },
      { title: "Scarves", route: "scarves" },
      { title: "T-shirt", route: "t-shirt" },
    ],
  },
  {
    title: "Dead Sea Cosmetics",
    route: "dead-sea-cosmetics",
    image: dead_sea_cosmetics,
    subCategory: [
      { title: "Dead Sea Creams and Moisturizers", route: "dead-sea-creams-moisturizers" },
      { title: "Dead Sea Mineral Mud and Bath Salt", route: "dead-sea-mineral-mud-bath-salt" },
      { title: "Dead Sea Mineral Sets", route: "dead-sea-mineral-sets" },
      { title: "Dead Sea Mineral Soap", route: "dead-sea-mineral-soap" },
    ],
  },
  {
    title: "Holidays",
    route: "holidays",
    image: holidays,
    subCategory: [
      { title: "Christmas", route: "christmas" },
      { title: "Easter", route: "easter" },
      { title: "Hanukkah", route: "hanukkah" },
      { title: "Passover", route: "passover" },
      { title: "Purim", route: "purim" },
      { title: "Rosh Hashanah", route: "rosh-hashanah" },
      { title: "Shabbat", route: "shabbat" },
      { title: "Sukkot", route: "sukkot" },
    ],
  },
  {
    title: "Holy Land Gifts",
    route: "holy-land-gifts",
    image: holy_land_gifts,
    subCategory: [
      { title: "Bags, Purses, and Wallets", route: "bags-purses-wallets" },
      { title: "Magnets", route: "magnets" },
      { title: "Bookmarks, Notebooks, and Pens", route: "bookmarks-notebooks-pens" },
      { title: "Menorah Candle Holder", route: "menorah-candle-holder" },
      { title: "Books, Maps, and Israel Books", route: "books-maps-israel-books" },
      { title: "Bracelets", route: "bracelets" },
      { title: "Mugs – Jerusalem Mugs", route: "mugs-jerusalem-mugs" },
      { title: "Candle Holders", route: "candle-holders" },
      { title: "Necklaces – Metal, Stainless Steel, Gold Plated", route: "necklaces-metal-stainless-steel-gold-plated" },
      { title: "Caps", route: "caps" },
      { title: "Patches", route: "patches" },
      { title: "Pins and Thimbles", route: "pins-thimbles" },
      { title: "Children Gifts", route: "children-gifts" },
      { title: "Enamel Holy Land Metal Hand Painted Art", route: "enamel-holyland-metal-art" },
      { title: "Plates – Jerusalem Plates", route: "plates-jerusalem-plates" },
      { title: "Flags", route: "flags" },
      { title: "Playing Cards", route: "playing-cards" },
      { title: "Hanukkah Candle Holder", route: "hanukkah-candle-holder" },
      { title: "Pomegranate – Metal Art", route: "pomegranate-metal-art" },
      { title: "Judaica Silver Plated Arts", route: "judaica-silver-plated-arts" },
      { title: "Prints – Jerusalem Artists' Prints", route: "prints-jerusalem-artists" },
      { title: "Keychains", route: "keychains" },
      { title: "Scarves", route: "scarves" },
      { title: "Kiddush Cups – Communion Cups", route: "kiddush-cups-communion" },
      { title: "Shot Glasses", route: "shot-glasses" },
      { title: "Kippot", route: "kippot" },
      { title: "Snow Globes", route: "snow-globes" },
      { title: "Klezmer Figurines", route: "klezmer-figurines" },
      { title: "Spoons and Bells", route: "spoons-and-bells" },
      { title: "Stuffed Animals", route: "stuffed-animals" },
    ],
  },
  {
    title: "Jerusalem Jewelry",
    route: "jerusalem-jewelry",
    image: jerusalem_jewelry,
    subCategory: [
      { title: "Bracelets", route: "bracelets" },
      { title: "Charm Pendants", route: "charm-pendants" },
      { title: "Christian Jewelry", route: "christian-jewelry" },
      { title: "Israel Eilat Stone", route: "israel-eilat-stone" },
      { title: "Jewish Jewelry", route: "jewish-jewelry" },
      { title: "Opal Stone", route: "opal-stone" },
      { title: "Plain Silver", route: "plain-silver" },
      { title: "Rings", route: "rings" },
      { title: "Silver Chain", route: "silver-chain" },
      { title: "Silver Combined with Gold", route: "silver-combined-with-gold" },
    ],
  },
  {
    title: "Judaica and Messianic Gifts",
    route: "judaica-and-messianic-gifts",
    image: judaica_and_messianic_gifts,
    subCategory: [
      { title: "Mark of the Covenant", route: "mark-of-the-covenant" },
      { title: "Bracelets", route: "bracelets" },
      { title: "Menorah Candle Holder", route: "menorah-candle-holder" },
      { title: "Candle Holders – Shabbat", route: "candle-holders-shabbat" },
      { title: "Mezuzah", route: "mezuzah" },
      { title: "Children Gifts", route: "children-gifts" },
      { title: "Necklaces – Metal, Stainless Steel, Gold Plated", route: "necklaces-metal-stainless-steel-gold-plated" },
      { title: "Crystal – Judaica Works", route: "crystal-judaica-works" },
      { title: "Pins and Thimbles", route: "pins-thimbles" },
      { title: "Dreidels", route: "dreidels" },
      { title: "Pomegranate – Metal Art", route: "pomegranate-metal-art" },
      { title: "Enamel Wall Hanging Blessing Scriptures and Figurines", route: "enamel-wall-hanging-blessing" },
      { title: "Prayer Shawl (Tallit)", route: "prayer-shawl-tallit" },
      { title: "Flags", route: "flags" },
      { title: "Prints – Jerusalem Artists' Prints", route: "prints-jerusalem-artists" },
      { title: "Hanukkah Candle Holder", route: "hanukkah-candle-holder" },
      { title: "Scarves", route: "scarves" },
      { title: "Judaica Silver Plated Arts", route: "judaica-silver-plated-arts" },
      { title: "Shabbat Bread Cover and Tablecloth", route: "shabbat-bread-cover-tablecloth" },
      { title: "Keychains", route: "keychains" },
      { title: "Shofar and Shofar Stands", route: "shofar-shofar-stands" },
      { title: "Shofar Bag – Tallit – Tefillin Bags", route: "shofar-bag-tallit-tefillin" },
      { title: "Kippa", route: "kippa" },
      { title: "Torah", route: "torah" },
      { title: "Klezmer Figurines", route: "klezmer-figurines" },
      { title: "Wall Hanging Velvet Scriptures and Symbols", route: "wall-hanging-velvet-scriptures" },
      { title: "Magnets", route: "magnets" },
      { title: "Washing Hands (Netilat Yadayim)", route: "washing-hands-netilat-yadayim" },
      { title: "Wine Kiddush Sets (Communion Sets)", route: "wine-kiddush-sets" },
    ],
  },
  {
    title: "Olive Wood Gifts",
    route: "olive-wood-gifts",
    image: olive_wood_gifts,
    subCategory: [
      { title: "Olive Wood and Poly Resin Wall Plaques", route: "olive-wood-poly-resin-wall-plaques" },
      { title: "Olive Wood Bibles", route: "olive-wood-bibles" },
      { title: "Olive Wood Boxes", route: "olive-wood-boxes" },
      { title: "Olive Wood Christmas Ornaments", route: "olive-wood-christmas-ornaments" },
      { title: "Olive Wood Crosses", route: "olive-wood-crosses" },
      { title: "Olive Wood Figurines", route: "olive-wood-figurines" },
      { title: "Olive Wood Nativity Sets", route: "olive-wood-nativity-sets" },
      { title: "Olive Wood Rosary", route: "olive-wood-rosary" },
      { title: "Olive Wood Tableware", route: "olive-wood-tableware" },
    ],
  },
];

// export const baseUrl = "http://localhost:8080";
export const baseUrl = "https://shrek-back.onrender.com";
export const baseUrlUsers = baseUrl+"/users";

export const createToken = (login: string, password: string) =>
  `Basic ${window.btoa(`${login}:${password}`)}`;
// Example of how constants.ts should look (you don't need to apply this block,
// just ensure your constants.ts file has similar exports)

export interface ProductVariantT {
  size: string;
  price: number;
  sku: string;
  stock: number;
}


// ... other exports like 'categories'
// utils/constants.ts
export const ringSizes = [
  { size: "5", price: 168.64, sku: "armring-50", stock: 12 },
  { size: "5.5", price: 168.64, sku: "armring-55", stock: 8 },
  { size: "6", price: 168.64, sku: "armring-60", stock: 0 },
  { size: "6.5", price: 168.64, sku: "armring-65", stock: 15 },
  { size: "7", price: 168.64, sku: "armring-70", stock: 20 },
  { size: "7.5", price: 168.64, sku: "armring-75", stock: 18 },
  { size: "8", price: 168.64, sku: "armring-80", stock: 25 },
  { size: "8.5", price: 168.64, sku: "armring-85", stock: 10 },
  { size: "9", price: 168.64, sku: "armring-90", stock: 14 },
  { size: "9.5", price: 168.64, sku: "armring-95", stock: 7 },
  { size: "10", price: 168.64, sku: "armring-100", stock: 22 },
  { size: "10.5", price: 168.64, sku: "armring-105", stock: 16 },
  { size: "11", price: 168.64, sku: "armring-110", stock: 11 },
  { size: "11.5", price: 168.64, sku: "armring-115", stock: 13 },
  { size: "12", price: 168.64, sku: "armring-120", stock: 19 },
  { size: "12.5", price: 168.64, sku: "armring-125", stock: 6 },
  { size: "13", price: 168.64, sku: "armring-130", stock: 18 },
  { size: "13.5", price: 168.64, sku: "armring-135", stock: 10 },
  { size: "14", price: 168.64, sku: "armring-140", stock: 5 },
];
export  const clothesSizes = [
  { value: "S", name: "Small (S)" },
  { value: "M", name: "Medium (M)" },
  { value: "L", name: "Large (L)" },
  { value: "XL", name: "Extra Large (XL)" },
  { value: "XXL", name: "Extra Extra Large (XXL)" },
]
// ====== Admin Info ======
export const adminInfo = {
  username: "admin",
  firstName: "Jewelry",
  lastName: "Admin",
  phone: "+972-54-71-62-237",
  address: "Old City, Jerusalem, Israel",
  city: "Israel",
  email: "gejekoushiangifts@gmail.com",
};
export const links = [
  { name: "facebook", route: "https://www.facebook.com/people/Jerusalem-Gejekoushian-Gift-shop-and-Ceramics/100056815105799/?mibextid=wwXIfr&rdid=E2dtaYJ3F0etnwOZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17ASdv2ipL%2F%3Fmibextid%3DwwXIfr" },
  { name: "instagram", route: "https://www.instagram.com/gejekoushiangifts/?igsh=MTJ6MHExbHBiYmc5dw%3D%3D#" },
  { name: "youtube", route: "https://www.youtube.com/@gejekoushiangifts" },
];

// ====== Defaults & Timers ======
export const defaultPic = "";
export const periodMinute = 10000 * 60  *30; // 10 hours

// ====== Materials ======
export const allMaterials = [
  "Wood", "Metal", "Plastic", "Glass", "Stone", "Ceramic", "Textile", "Leather", "Paper",
  "Gold", "Silver", "Bronze", "Copper", "Iron", "Steel", "Marble", "Concrete", "Clay",
  "Wool", "Cotton", "Silk", "Bamboo", "Porcelain",
];

// ====== Categories with Types ======
export const categories = [
  {
    title: "Ceramics",
    imageUrl: armenian_ceramics,
    route: "armenian-ceramics",
    types: [
      { title: "Tiles, name-tiles & coasters", route: "tiles", icon: "fa fa-th-large" },
      { title: "Biblical tiles", route: "biblical-tiles", icon: "fa fa-book" },
      { title: "Tables, murals & borders", route: "tables-murals-borders", icon: "fa fa-border-style" },
      { title: "Armenian", route: "armenian", icon: "fa fa-flag" },
      { title: "Judaica", route: "judaica", icon: "fa fa-star-of-david" },
      { title: "Bowls", route: "bowls", icon: "fa fa-bowl-rice" },
      { title: "Pomegranates", route: "pomegranates", icon: "fa fa-apple-alt" },
      { title: "Vases", route: "vases", icon: "fa fa-wine-bottle" },
      { title: "Assorted Pottery", route: "assorted-pottery", icon: "fa fa-shapes" },
      { title: "Mugs", route: "mugs", icon: "fa fa-mug-hot" },
      { title: "Hangings", route: "hangings", icon: "fa fa-image" },
      { title: "Spoon rests", route: "spoon-rests", icon: "fa fa-spoon" },
    ],
  },
  {
    title: "Jewelry",
    imageUrl: jerusalem_jewelry,
    route: "jerusalem-jewelry",
    icon: "fa fa-gem",
    types: [
      { title: "Rings", route: "jewelry/rings", icon: "fa fa-ring" },
      { title: "Necklaces", route: "jewelry/necklaces", icon: "fa fa-link" },
      { title: "Earrings", route: "jewelry/earrings", icon: "fa fa-circle" },
      { title: "Bracelets", route: "jewelry/bracelets", icon: "fa fa-bars" },
    ],
  },
  {
    title: "Clothing",
    imageUrl: clothing,
    route: "clothing",
    types: [
      { title: "Crosses", route: "religious/crosses", icon: "fa fa-cross" },
      { title: "Icons", route: "religious/icons", icon: "fa fa-image" },
      { title: "Prayer Books & Bibles", route: "religious/books", icon: "fa fa-book" },
      { title: "Incense, Oils & Prayer Items", route: "religious/incense-oils", icon: "fa fa-fire" },
      { title: "Church Crafts", route: "religious/church-crafts", icon: "fa fa-church" },
      { title: "Brochures & Prayers", route: "religious/brochures", icon: "fa fa-scroll" },
      { title: "Candles", route: "religious/candles", icon: "fa fa-candle-holder" },
      { title: "Pilgrimage Souvenirs", route: "religious/pilgrimage-souvenirs", icon: "fa fa-walking" },
      { title: "Saint Figurines", route: "religious/saint-figurines", icon: "fa fa-user-nurse" },
      { title: "Religious Jewelry", route: "religious/jewelry", icon: "fa fa-gem" },
    ],
  },
  {
    title: "Holidays",
    imageUrl: holidays,

    route: "holidays",
    types: [
      { title: "Keychains", route: "souvenirs/keychains", icon: "fa fa-key" },
      { title: "Postcards & Magnets", route: "souvenirs/postcards-magnets", icon: "fa fa-paperclip" },
      { title: "Mini Statues", route: "souvenirs/mini-statues", icon: "fa fa-chess-knight" },
      { title: "Tiles", route: "souvenirs/tiles", icon: "fa fa-border-all" },
      { title: "Gift Packaging", route: "souvenirs/gift-packaging", icon: "fa fa-box" },
      { title: "Personal Accessories", route: "souvenirs/personal-accessories", icon: "fa fa-user" },
      { title: "Holy Water, Oils & Scents", route: "souvenirs/holy-scents", icon: "fa fa-leaf" },
      { title: "Games & Gift Sets", route: "souvenirs/gift-sets", icon: "fa fa-gift" },
      { title: "Booklets & Guides", route: "souvenirs/guides", icon: "fa fa-map" },
      { title: "Home Décor", route: "souvenirs/home-decor", icon: "fa fa-home" },
    ],
  },
];
export const sizeOptions = [
  { name: "XS", value: "XS" },
  { name: "S", value: "S" },
  { name: "M", value: "M" },
  { name: "L", value: "L" },
  { name: "XL", value: "XL" },
  { name: "Custom…", value: "custom" },
];
export  const LABELS: Record<keyof AddressT, string> = {
  fullName: "Full Name",
  street: "Street Address",
  city: "City",
  state: "State / Region",
  zipCode: "Postal Code",
  country: "Country",
  phone: "Phone Number",
};

export const allColors = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Yellow", value: "yellow" },
  { name: "Orange", value: "orange" },
  { name: "Purple", value: "purple" },
  { name: "Brown", value: "brown" },
  { name: "Gray", value: "gray" },
  { name: "Beige", value: "beige" },
  { name: "Pink", value: "pink" },
  { name: "Gold", value: "gold" },
  { name: "Silver", value: "silver" },
  { name: "Ivory", value: "ivory" },
  { name: "Cyan", value: "cyan" },
  { name: "Teal", value: "teal" },
  { name: "Olive", value: "olive" },
  { name: "Maroon", value: "maroon" },
  { name: "Navy", value: "navy" },
  { name: "Turquoise", value: "turquoise" },
  { name: "Coral", value: "coral" },
  { name: "Lavender", value: "lavender" },
  { name: "Mint", value: "mintcream" },
  { name: "Charcoal", value: "#36454F" },
  { name: "Sand", value: "#C2B280" },
  { name: "Other", value: "other" },
];



