import React, { useContext, useEffect, useState } from "react"
import SideBar from "./SideBar.tsx"
import PruductList from "./PruductList.tsx"
import { useParams } from "react-router-dom"

const Shop = () => {


  return (
    <div id="page-content">
      <div className="collection-header">
        <div className="collection-hero">
          <div className="collection-hero__image">
            <img
              className="blur-up lazyload h-100 w-100"
              data-src="src/images/cat-women.jpg"
              src="src/images/cat-women.jpg"
              alt="Women"
              title="Women"
            />
          </div>
          <div className="collection-hero__title-wrapper">
            <h1 className="collection-hero__title page-width">
              Shop Left Sidebar
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <SideBar />

          <div className=" col-sm-12 col-md-9 col-lg-9 main-col">
            <div className="category-description">
              <h3>Category Description</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing.
              </p>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classNameical Latin literature
                from 45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classNameical literature, discovered the undoubtable source.
              </p>
            </div>
            <hr />
            <PruductList />
            <div className="infinitpaginOuter">
              <div className="infinitpagin">
                <a href="#" className="btn loadMore">
                  Load More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Shop
