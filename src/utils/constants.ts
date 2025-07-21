import banner1 from "../images/slideshow-banners/banner1.jpg"
import banner2 from "../images/slideshow-banners/banner2.jpg"
import banner3 from "../images/slideshow-banners/banner3.jpg"
import banner4 from "../images/slideshow-banners/banner4.jpg"

import logo from "../images/logo/logo.png"
import pomegranates from "../images/categories/pomegranates.jpg"
import mugs from "../images/categories/mugs.jpg"
import hangings from "../images/categories/hangings.jpg"
import necklaces from "../images/categories/necklaces.jpg"
import earrings from "../images/categories/earrings.jpg"
import bracelets from "../images/categories/bracelets.jpg"
import rings from "../images/categories/rings.jpg"
import magnets from "../images/categories/magnets.jpg"
import vases from "../images/categories/vases.jpg"
import plates from "../images/categories/plates.jpg"
import tiles from "../images/categories/tiles.jpg"
import jewelry from "../images/categories/jewelry.jpg"
import religious from "../images/categories/religious.jpg"
import keychains from "../images/categories/keychains.jpg"
import ceramics from "../images/categories/ceramics.jpg"
import souvenirs from "../images/categories/souvenirs.jpg"
import { NavItemT } from "./types.ts"



export const collections = [
  { title: "Tiles", route: "tiles", image: tiles },
  { title: "Plates", route: "plates", image: plates },
  { title: "Vases", route: "vases", image: vases },
  { title: "Pomegranates", route: "pomegranates", image: pomegranates },
  { title: "Mugs", route: "mugs", image: mugs },
  { title: "Hangings", route: "hangings", image: hangings },
  { title: "Souvenirs", route: "souvenirs", image: souvenirs },
  { title: "Ceramics", route: "ceramics", image:ceramics },
  { title: "Jewelry", route: "jewelry", image: jewelry},
  { title: "Religious", route: "religious", image: religious },
  { title: "Rings", route: "rings", image: rings },
  { title: "Necklaces", route: "necklaces", image: necklaces },
  { title: "Earrings", route: "earrings", image: earrings },
  { title: "Bracelets", route: "bracelets", image: bracelets },
  { title: "Keychains", route: "keychains", image: keychains },
  { title: "Magnets", route: "magnets", image: magnets },
];

export const banner1Img = banner1
export const banner2Img = banner2
export const banner3Img = banner3
export const banner4Img = banner4
export const logoImg = logo
export const navItems: NavItemT[] = [
  { title: "Home", route: "home" },
  // { title: 'Shop',             route: 'shop' },
  // { title: 'Sells',               route: 'sells' },
  // { title: 'Admin',               route: 'admin' },
  // { title: 'Products',               route: 'products' },
  // { title: 'Cart',               route: 'cart' },
  // { title: 'Checkout',               route: 'checkout' },

  // { title: 'WishList',               route: 'wishlist' },
  // { title: 'Account',               route: 'account' },
  { title: "Shop", route: "shop" },
  { title: "Collections", route: "collections" },
  { title: "About", route: "about" },
  { title: "Contact", route: "contact" },
]

export const shopCategories = (language: string) => [
  {
    title:
      language === "Armenian"
        ? "Սալիկներ, անուններով սալիկներ և բաժակներ"
        : language === "Russian"
          ? "Плитки, именные плитки и подставки"
          : "Tiles, name-tiles & coasters",
    route: "tiles",
    // imageUrl: tilesImage,
    icon: "fa fa-th-large",
  },
  {
    title:
      language === "Armenian"
        ? "Աստվածաշնչյան սալիկներ"
        : language === "Russian"
          ? "Библейские плитки"
          : "Biblical tiles",
    route: "biblical-tiles",
    // imageUrl: biblicalTilesImage,
    icon: "fa fa-book",
  },
  {
    title:
      language === "Armenian"
        ? "Սեղաններ, պատեր և եզրագծեր"
        : language === "Russian"
          ? "Столы, мозаики и бордюры"
          : "Tables, murals & borders",
    route: "tables-murals-borders",
    // imageUrl: tablesMuralsImage,
    icon: "fa fa-border-style",
  },
  {
    title:
      language === "Armenian"
        ? "Հայկական"
        : language === "Russian"
          ? "Армянское"
          : "Armenian",
    route: "armenian",
    // imageUrl: armenianImage,
    icon: "fa fa-flag",
  },
  {
    title:
      language === "Armenian"
        ? "Հուդայական"
        : language === "Russian"
          ? "Иудаика"
          : "Judaica",
    route: "judaica",
    // imageUrl: judaicaImage,
    icon: "fa fa-star-of-david",
  },
  {
    title:
      language === "Armenian"
        ? "Թասեր"
        : language === "Russian"
          ? "Миски"
          : "Bowls",
    route: "bowls",
    // imageUrl: bowlsImage,
    icon: "fa fa-bowl-rice",
  },
  // {
  //   title: language === "Armenian"
  //     ? "Ափսեներ"
  //     : language === "Russian"
  //       ? "Тарелки"
  //       : "Plates",
  //   route: "plates",
  //   // imageUrl: platesImage,
  //   icon: "fa fa-solid fa-plate",
  // },
  {
    title:
      language === "Armenian"
        ? "Նռներ"
        : language === "Russian"
          ? "Гранаты"
          : "Pomegranates",
    route: "pomegranates",
    // imageUrl: pomegranatesImage,
    icon: "fa fa-apple-alt",
  },
  {
    title:
      language === "Armenian"
        ? "Ծաղկամաններ"
        : language === "Russian"
          ? "Вазы"
          : "Vases",
    route: "vases",
    // imageUrl: vasesImage,
    icon: "fa fa-wine-bottle",
  },
  {
    title:
      language === "Armenian"
        ? "Տարբեր կերամիկա"
        : language === "Russian"
          ? "Разная керамика"
          : "Assorted Pottery",
    route: "assorted-pottery",
    // imageUrl: assortedImage,
    icon: "fa fa-shapes",
  },
  {
    title:
      language === "Armenian"
        ? "Բաժակներ"
        : language === "Russian"
          ? "Кружки"
          : "Mugs",
    route: "mugs",
    // imageUrl: mugsImage,
    icon: "fa fa-mug-hot",
  },
  {
    title:
      language === "Armenian"
        ? "Պատից կախվողներ"
        : language === "Russian"
          ? "Настенные изделия"
          : "Hangings",
    route: "hangings",
    // imageUrl: hangingsImage,
    icon: "fa fa-image",
  },
  {
    title:
      language === "Armenian"
        ? "Գդալների հենարաններ"
        : language === "Russian"
          ? "Подставки для ложек"
          : "Spoon rests",
    route: "spoon-rests",
    // imageUrl: spoonRestsImage,
    icon: "fa fa-spoon",
  },
]

export const shop1categories = [
  {
    title: "Souvenirs",
    imageUrl:
      "https://cdn.sanity.io/images/hqzqrzyr/production-icelolly/5c799fe6328b06f295de4ecfe5daf032d2c3083e-4000x2667.jpg?rect=0,482,4000,1704&w=1080&h=460&q=70&fit=crop&auto=format&dpr=2",
    route: "souvenirs",
  },
  {
    title: "Ceramics",
    imageUrl:
      "https://c7.alamy.com/comp/CXD46G/romanian-traditional-pottery-on-display-for-sale-CXD46G.jpg",
    route: "ceramics",
  },
  {
    title: "Jewelry",
    imageUrl: "https://e-com-front-nine.vercel.app/assets/jewelry-BLreq-ud.jpg",
    route: "jewelry",
  },
  {
    title: "Religious",
    imageUrl:
      "https://thumbs.dreamstime.com/b/interesting-collection-bronze-items-silvering-gilding-green-patina-weapons-doorknobs-bells-dishes-production-different-235851117.jpg",
    route: "religious",
  },
]

export const categories = (language: string) => [
  {
    title:
      language === "Armenian"
        ? "Կերամիկա"
        : language === "Russian"
          ? "Керамика"
          : "Ceramics",
    imageUrl:
      "https://c7.alamy.com/comp/CXD46G/romanian-traditional-pottery-on-display-for-sale-CXD46G.jpg",
    route: "ceramics",
    types: [
      {
        title:
          language === "Armenian"
            ? "Սալիկներ, անուններով սալիկներ և բաժակներ"
            : language === "Russian"
              ? "Плитки, именные плитки и подставки"
              : "Tiles, name-tiles & coasters",
        route: "tiles",
        icon: "fa fa-th-large",
      },
      {
        title:
          language === "Armenian"
            ? "Աստվածաշնչյան սալիկներ"
            : language === "Russian"
              ? "Библейские плитки"
              : "Biblical tiles",
        route: "biblical-tiles",
        icon: "fa fa-book",
      },
      {
        title:
          language === "Armenian"
            ? "Սեղաններ, պատեր և եզրագծեր"
            : language === "Russian"
              ? "Столы, мозаики и бордюры"
              : "Tables, murals & borders",
        route: "tables-murals-borders",
        icon: "fa fa-border-style",
      },
      {
        title:
          language === "Armenian"
            ? "Հայկական"
            : language === "Russian"
              ? "Армянское"
              : "Armenian",
        route: "armenian",
        icon: "fa fa-flag",
      },
      {
        title:
          language === "Armenian"
            ? "Հուդայական"
            : language === "Russian"
              ? "Иудаика"
              : "Judaica",
        route: "judaica",
        icon: "fa fa-star-of-david",
      },
      {
        title:
          language === "Armenian"
            ? "Թասեր"
            : language === "Russian"
              ? "Миски"
              : "Bowls",
        route: "bowls",
        icon: "fa fa-bowl-rice",
      },
      {
        title:
          language === "Armenian"
            ? "Նռներ"
            : language === "Russian"
              ? "Гранаты"
              : "Pomegranates",
        route: "pomegranates",
        icon: "fa fa-apple-alt",
      },
      {
        title:
          language === "Armenian"
            ? "Ծաղկամաններ"
            : language === "Russian"
              ? "Вазы"
              : "Vases",
        route: "vases",
        icon: "fa fa-wine-bottle",
      },
      {
        title:
          language === "Armenian"
            ? "Տարբեր կերամիկա"
            : language === "Russian"
              ? "Разная керамика"
              : "Assorted Pottery",
        route: "assorted-pottery",
        icon: "fa fa-shapes",
      },
      {
        title:
          language === "Armenian"
            ? "Բաժակներ"
            : language === "Russian"
              ? "Кружки"
              : "Mugs",
        route: "mugs",
        icon: "fa fa-mug-hot",
      },
      {
        title:
          language === "Armenian"
            ? "Պատից կախվողներ"
            : language === "Russian"
              ? "Настенные изделия"
              : "Hangings",
        route: "hangings",
        icon: "fa fa-image",
      },
      {
        title:
          language === "Armenian"
            ? "Գդալների հենարաններ"
            : language === "Russian"
              ? "Подставки для ложек"
              : "Spoon rests",
        route: "spoon-rests",
        icon: "fa fa-spoon",
      },
    ],
  },
  {
    title:
      language === "Armenian"
        ? "Զարդեր"
        : language === "Russian"
          ? "Украшения"
          : "Jewelry",
    route: "jewelry",
    icon: "fa fa-gem",
    subcategories: [
      {
        title:
          language === "Armenian"
            ? "Մատանիներ"
            : language === "Russian"
              ? "Кольца"
              : "Rings",
        route: "jewelry/rings",
        icon: "fa fa-ring",
      },
      {
        title:
          language === "Armenian"
            ? "Վզնոցներ"
            : language === "Russian"
              ? "Ожерелья"
              : "Necklaces",
        route: "jewelry/necklaces",
        icon: "fa fa-necklace", // fallback: "fa fa-link"
      },
      {
        title:
          language === "Armenian"
            ? "Ականջօղեր"
            : language === "Russian"
              ? "Серьги"
              : "Earrings",
        route: "jewelry/earrings",
        icon: "fa fa-ear", // fallback: "fa fa-circle"
      },
      {
        title:
          language === "Armenian"
            ? "Թևնոցներ"
            : language === "Russian"
              ? "Браслеты"
              : "Bracelets",
        route: "jewelry/bracelets",
        icon: "fa fa-bracelet", // fallback: "fa fa-bars"
      },
    ],
  },
  {
    title:
      language === "Armenian"
        ? "Կրոնական"
        : language === "Russian"
          ? "Религиозные"
          : "Religious",
    imageUrl:
      "https://thumbs.dreamstime.com/b/interesting-collection-bronze-items-silvering-gilding-green-patina-weapons-doorknobs-bells-dishes-production-different-235851117.jpg",
    route: "religious",
    types: [
      {
        title:
          language === "Armenian"
            ? "Խաչեր"
            : language === "Russian"
              ? "Кресты"
              : "Crosses",
        route: "religious/crosses",
        icon: "fa fa-cross",
      },
      {
        title:
          language === "Armenian"
            ? "Սրբապատկերներ"
            : language === "Russian"
              ? "Иконы"
              : "Icons",
        route: "religious/icons",
        icon: "fa fa-image",
      },
      {
        title:
          language === "Armenian"
            ? "Աղոթագրքեր և Սուրբ Գրքեր"
            : language === "Russian"
              ? "Молитвенники и Библии"
              : "Prayer Books & Bibles",
        route: "religious/books",
        icon: "fa fa-book",
      },
      {
        title:
          language === "Armenian"
            ? "Խունկ, յուղեր և աղոթքի պարագաներ"
            : language === "Russian"
              ? "Ладан, масла и молитвенные принадлежности"
              : "Incense, Oils & Prayer Items",
        route: "religious/incense-oils",
        icon: "fa fa-fire",
      },
      {
        title:
          language === "Armenian"
            ? "Արհեստներ եկեղեցուց"
            : language === "Russian"
              ? "Предметы из церквей"
              : "Church Crafts",
        route: "religious/church-crafts",
        icon: "fa fa-church",
      },
      {
        title:
          language === "Armenian"
            ? "Բրոշյուրներ և աղոթքներ"
            : language === "Russian"
              ? "Брошюры и молитвы"
              : "Brochures & Prayers",
        route: "religious/brochures",
        icon: "fa fa-scroll",
      },
      {
        title:
          language === "Armenian"
            ? "Մոմեր"
            : language === "Russian"
              ? "Свечи"
              : "Candles",
        route: "religious/candles",
        icon: "fa fa-candle-holder",
      },
      {
        title:
          language === "Armenian"
            ? "Ուխտագնացության հուշանվերներ"
            : language === "Russian"
              ? "Паломнические сувениры"
              : "Pilgrimage Souvenirs",
        route: "religious/pilgrimage-souvenirs",
        icon: "fa fa-walking",
      },
      {
        title:
          language === "Armenian"
            ? "Արձանիկներ սրբերի պատկերներով"
            : language === "Russian"
              ? "Фигурки святых"
              : "Saint Figurines",
        route: "religious/saint-figurines",
        icon: "fa fa-user-nurse", // alt: fa-praying-hands
      },
      {
        title:
          language === "Armenian"
            ? "Կրոնական զարդեր"
            : language === "Russian"
              ? "Религиозные украшения"
              : "Religious Jewelry",
        route: "religious/jewelry",
        icon: "fa fa-gem",
      },
    ],
  },
  {
    title:
      language === "Armenian"
        ? "Հուշանվերներ"
        : language === "Russian"
          ? "Сувениры"
          : "Souvenirs",
    imageUrl:
      "https://cdn.sanity.io/images/hqzqrzyr/production-icelolly/5c799fe6328b06f295de4ecfe5daf032d2c3083e-4000x2667.jpg?rect=0,482,4000,1704&w=1080&h=460&q=70&fit=crop&auto=format&dpr=2",
    route: "souvenirs",
    types: [
      {
        title:
          language === "Armenian"
            ? "Բանալիների կախազարդեր"
            : language === "Russian"
              ? "Брелоки"
              : "Keychains",
        route: "souvenirs/keychains",
        icon: "fa fa-key",
      },
      {
        title:
          language === "Armenian"
            ? "Բացիկներ և մագնիսներ"
            : language === "Russian"
              ? "Открытки и магниты"
              : "Postcards & Magnets",
        route: "souvenirs/postcards-magnets",
        icon: "fa fa-paperclip",
      },
      {
        title:
          language === "Armenian"
            ? "Փոքր արձանիկներ"
            : language === "Russian"
              ? "Фигурки"
              : "Mini Statues",
        route: "souvenirs/mini-statues",
        icon: "fa fa-chess-knight",
      },
      {
        title:
          language === "Armenian"
            ? "Պատկերասալիկներ"
            : language === "Russian"
              ? "Плитки"
              : "Tiles",
        route: "souvenirs/tiles",
        icon: "fa fa-border-all",
      },
      {
        title:
          language === "Armenian"
            ? "Նվերների փաթեթավորում"
            : language === "Russian"
              ? "Упаковка для подарков"
              : "Gift Packaging",
        route: "souvenirs/gift-packaging",
        icon: "fa fa-box",
      },
      {
        title:
          language === "Armenian"
            ? "Անձնական աքսեսուարներ"
            : language === "Russian"
              ? "Персональные аксессуары"
              : "Personal Accessories",
        route: "souvenirs/personal-accessories",
        icon: "fa fa-user",
      },
      {
        title:
          language === "Armenian"
            ? "Աղբյուրի ջուր, յուղեր և բուրավետիչներ"
            : language === "Russian"
              ? "Святая вода, масла и ароматы"
              : "Holy Water, Oils & Scents",
        route: "souvenirs/holy-scents",
        icon: "fa fa-leaf",
      },
      {
        title:
          language === "Armenian"
            ? "Խաղեր և հուշանվերային հավաքածուներ"
            : language === "Russian"
              ? "Игры и наборы сувениров"
              : "Games & Gift Sets",
        route: "souvenirs/gift-sets",
        icon: "fa fa-gift",
      },
      {
        title:
          language === "Armenian"
            ? "Բրոշյուրներ և ուղեցույցներ"
            : language === "Russian"
              ? "Брошюры и путеводители"
              : "Booklets & Guides",
        route: "souvenirs/guides",
        icon: "fa fa-map",
      },
      {
        title:
          language === "Armenian"
            ? "Տնային դեկոր"
            : language === "Russian"
              ? "Домашний декор"
              : "Home Décor",
        route: "souvenirs/home-decor",
        icon: "fa fa-home",
      },
    ],
  },
]


// export const baseUrl = "http://localhost:8080/users"
// export const baseUrlBlog = "http://localhost:8080"

export const baseUrl = "https://44.204.16.181:9000/users"
export const baseUrlBlog = "https://44.204.16.181:9000"

// export const baseUrl = "https://shrek-back.onrender.com/users";
// export const baseUrlBlog = "https://shrek-back.onrender.com";
export const createToken = (login: string, password: string) =>
  `Basic ${window.btoa(login + ":" + password)}`

export const defaultPic = ""

export const periodMinute = 10000 * 60 * 10
export const adminInfo = (language: string) => ({
  username: "admin",
  firstName:
    language === "Armenian"
      ? "Զարդեր"
      : language === "Russian"
        ? "Украшения"
        : "Jewelry",
  lastName: "Admin",
  phone: " +9725858585",
  address:
    language === "Armenian"
      ? "Old City, Jerusalem, Israel"
      : language === "Russian"
        ? "Old City"
        : "Old City, Jerusalem, Israel",
  city:
    language === "Armenian"
      ? "Հայաստան"
      : language === "Russian"
        ? "Israel"
        : "Israel",
  email: "sevan@gmail.com",
})
export const allMaterials = [
  "Wood",
  "Metal",
  "Plastic",
  "Glass",
  "Stone",
  "Ceramic",
  "Textile",
  "Leather",
  "Paper",
  "Gold",
  "Silver",
  "Bronze",
  "Copper",
  "Iron",
  "Steel",
  "Marble",
  "Concrete",
  "Clay",
  "Wool",
  "Cotton",
  "Silk",
  "Bamboo",
  "Porcelain",
];
