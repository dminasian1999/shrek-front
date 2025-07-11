import stationary from "../images/categories/stationary.jpg"
import toysGames from "../images/categories/toys&Games.jpg"
import artCraft from "../images/categories/art&Craft.jpg"

import jewelry from "../images/categories/jewelry.jpg"

import logo from "../images/logo/logo.jpg"
import banner1 from "../images/slideshow-banners/banner1.jpg"
import banner2 from "../images/slideshow-banners/banner2.jpg"
import banner3 from "../images/slideshow-banners/banner3.jpg"
import banner4 from "../images/slideshow-banners/banner4.jpg"

export const banner1Img = banner1
export const banner2Img = banner2
export const banner3Img = banner3
export const banner4Img = banner4
export const logoImg = logo


export const categories = (language: string) => [
  {
    title:   language === "Armenian"
      ? "Գրենական պիտույքներ"
      : language === "Russian"
        ? "Канцелярские товары"
        : "Stationery",
    imageUrl: stationary,
    route: "stationery",
    types: [
      {
        title: language === "Armenian"
        ? "Դպրոցական պարագաներ"
        : language === "Russian"
          ? "Школьные принадлежности"
          : "School Supplies",
        route: "school-supplies",
        icon: "fa fa-school",
      },
      {
        title: language === "Armenian"
          ? "Գրելու պարագաներ"
          : language === "Russian"
            ? "Письменные принадлежности"
            : "Writing & Drawing Tool",
        route: "writing-drawing-tools",
        icon: "fa fa-pen",
      },
      {
        title: language === "Armenian"
          ? "Թղթյա պարագաներ"
          : language === "Russian"
            ? "Бумажные принадлежности"
            : "Paper supplies",
        route: "notebooks-paper",
        icon: "fa fa-book",
      },
      {

        title: language === "Armenian"
          ? "Պայուսակ, գրչատուփ"
          : language === "Russian"
            ? "Сумка, пенал"
            : "Bag, pencil cases",
        route: "bags-pencil-cases",
        icon: "fa fa-briefcase",
      },
      {
        title: language === "Armenian"
          ? "Գրասենյակային պարագաներ"
          : language === "Russian"
            ? "Офисные принадлежности"
            : "Office tools",
        route: "office-essentials",
        icon: "fa fa-archive",
      },
      {
        title: language === "Armenian"
          ? "Գրասեղանի պարագաներ"
          : language === "Russian"
            ? "Настольные принадлежности"
            : "Desk accessories",
        route: "binding-laminating",
        icon: "fa fa-paperclip",
      },
      {

        title: language === "Armenian"
          ? "Նկարելու պարագաներ"
          : language === "Russian"
            ? "Аксессуары для рисования"
            : "Accessories for drawing",
        route: "art-craft-supplies",
        icon: "fa fa-paintbrush",
      },
    ],
  },
  {
    title: language === "Armenian"
      ? "Մանկական"
      : language === "Russian"
        ? "Для детей"
        : "For Children",
    imageUrl: toysGames,
    route: "children",
    types: [
      {
        title: language === "Armenian"
          ? "Խաղալիքներ"
          : language === "Russian"
            ? "Игрушки"
            : "Toys & Games"
        , route: "toys-games", icon: "fa fa-gamepad" },
      {
        title: language === "Armenian"
          ? "Ստեղծագործական և կրթական պարագաներ"
          : language === "Russian"
            ? "Творческие и обучающие принадлежности"
            : "Creative & Educational Supplies",
        route: "creative-educational-supplies",
        icon: "fa fa-puzzle-piece"
      },
      {
        title: language === "Armenian"
          ? "Սննդի և կերակրման պարագաներ"
          : language === "Russian"
            ? "Аксессуары для кормления и еды"
            : "Feeding & Food Accessories",
        route: "feeding-accessories",
        icon: "fa fa-bottle-water"
      },
      {
        title: language === "Armenian"
          ? "Լողի և բացօթյա պարագաներ"
          : language === "Russian"
            ? "Аксессуары для плавания и отдыха"
            : "Swimming & Outdoor Accessories",
        route: "swimming-outdoor-accessories",
        icon: "fa fa-life-ring"
      },
      {
        title: language === "Armenian"
          ? "Ընդհանուր մանկական պարագաներ"
          : language === "Russian"
            ? "Общие детские аксессуары"
            : "General Children’s Accessories",
        route: "children-accessories",
        icon: "fa fa-smile"
      }
    ],
  },
  {
    title: language === "Armenian"
      ? "Սպասք"
      : language === "Russian"
        ? "Посуда и кухонные принадлежности"
        : "Dishes and Kitchen",
    imageUrl: artCraft,
    route: "dish-kitchen",
    types: [
      {
        title: language === "Armenian"
          ? "Ապակյա արտադրանք"
          : language === "Russian"
            ? "Изделия из стекла"
            : "Products from Glass",
        route: "glass-products",
        icon: "fa fa-wine-glass"
      },
      {
        title: language === "Armenian"
          ? "Սուրճի և թեյի պարագաներ"
          : language === "Russian"
            ? "Посуда для кофе и чая"
            : "Coffee, Tea Utensils",
        route: "coffee-tea-utensils",
        icon: "fa fa-mug-hot"
      }
    ]
  },
  {
    title: language === "Armenian"
      ? "Առիթներ"
      : language === "Russian"
        ? "Праздничные аксессуары"
        : "Festive Accessories",
    imageUrl: jewelry,
    route: "festive",
    types: [
      {
        title: language === "Armenian"
          ? "Շնորհավորական բացիկներ"
          : language === "Russian"
            ? "Поздравительные открытки"
            : "Greeting & Postcards",
        route: "greeting-postcards",
        icon: "fa fa-envelope"
      },
      {
        title: language === "Armenian"
          ? "Նվերի փաթեթավորում"
          : language === "Russian"
            ? "Упаковка для подарков"
            : "Gift Packaging",
        route: "gift-packaging",
        icon: "fa fa-box"
      },
      {
        title: language === "Armenian"
          ? "Նվերներ և հուշանվերներ"
          : language === "Russian"
            ? "Подарки и сувениры"
            : "Gifts & Souvenirs",
        route: "gifts-souvenirs",
        icon: "fa fa-gift"
      },
      {
        title: language === "Armenian"
          ? "Զարդեր"
          : language === "Russian"
            ? "Украшения"
            : "Jewelry",
        route: "festive-jewelry",
        icon: "fa fa-gem"
      }
    ]
  }
]


// export const baseUrl = "http://localhost:8080/users"
// export const baseUrlBlog = "http://localhost:8080"
export const baseUrl = "https://ecom-back-bafx.onrender.com/users";
export const baseUrlBlog = "https://ecom-back-bafx.onrender.com";
export const createToken = (login: string, password: string) =>
  `Basic ${window.btoa(login + ":" + password)}`

export const defaultPic = ""

export const periodMinute = 10000 * 60 * 10
export const adminInfo = (language: string) => ({
  username: "admin",
  firstName: language === "Armenian"
    ? "Զարդեր"
    : language === "Russian"
      ? "Украшения"
      : "Jewelry",
  lastName: "Admin",
  phone: " +37494923322",
  address: language === "Armenian"
  ? "Ավշար 0605, Հայաստան"
: language === "Russian"
    ? "Абшар 0605, Армениа"
    : "Avshar 0605, Armenia",
  city: language === "Armenian"
    ? "Հայաստան"
    : language === "Russian"
      ? "Армениа"
      : "Armenia",
  email: "tamar@gmail.com",
});
