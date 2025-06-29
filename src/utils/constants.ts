import {NavItemT} from "./types.ts";
import stationary from '../images/categories/stationary.jpg';
import toysGames  from '../images/categories/toys&Games.jpg';
import artCraft  from '../images/categories/art&Craft.jpg';
import jewelry  from '../images/categories/jewelry.jpg';
import logo from  '../images/logo/logo.jpg'
import banner1 from  '../images/slideshow-banners/banner1.jpg'
import banner2 from  '../images/slideshow-banners/banner2.jpg'
import banner3 from  '../images/slideshow-banners/banner3.jpg'
import banner4 from  '../images/slideshow-banners/banner4.jpg'

export const banner1Img = banner1;
export const banner2Img = banner2;
export const banner3Img = banner3;
export const banner4Img = banner4;
export const logoImg = logo;

export const navItems: NavItemT[] = [
    { title: 'Home',            route: 'home' },
    { title: 'Shop',             route: 'shop' },
    { title: 'Sells',               route: 'sells' },
    { title: 'Admin',               route: 'admin' },
    { title: 'Product',               route: 'product' },
    { title: 'Products',               route: 'products' },
    { title: 'Cart',               route: 'cart' },
    { title: 'Checkout',               route: 'checkout' },
    { title: 'About',               route: 'about' },
    { title: 'Contact',               route: 'contact' },
    { title: 'WishList',               route: 'wishlist' },
    { title: 'Account',               route: 'account' },
];

export const categories = [
    {title: 'Stationery', imageUrl: stationary},
    {title: 'Toys & Games', imageUrl: toysGames },
    {title: 'Art & Culture', imageUrl: artCraft},
    {title: 'Jewelry', imageUrl: jewelry}
];
export const baseUrl = "http://localhost:8080/users";
export const baseUrlBlog = "http://localhost:8080";
// export const baseUrl = "http://ecom-back-bafx.onrender.com/users";
// export const baseUrlBlog = "http://ecom-back-bafx.onrender.com";
export const createToken = (login: string, password: string) => `Basic ${window.btoa(login + ':' + password)}`

export const defaultPic =''


export const periodMinute = 10000 * 60*10;



