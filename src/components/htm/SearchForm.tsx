import React from "react";
import SideBar from "./SideBar.tsx";
import ProductList from "./ProductList.tsx";
import { useParams } from "react-router-dom";

const Shop = () => {
  return (
    <div id="page-content" className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full max-h-[400px] overflow-hidden mb-8">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src="/images/cat-women.jpg"
          alt="Shop banner"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/50 to-transparent">
          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Shop
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <SideBar />
          <main className="flex-1">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Explore Our Collections
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl leading-relaxed">
                Discover a wide variety of categories with handpicked items that
                meet your taste and needs. Whether you're into fashion, art, or
                essentials — we have something for you.
              </p>
            </section>

            <ProductList />

            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white py-2.5 px-8 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium">
                Load More
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
