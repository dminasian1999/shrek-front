import { useState } from "react"

const SearchForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <>
    //   <div className="site-header__search md:hidden">
    //     <button type="button" className="search-trigger" onClick={() => setIsOpen(true)}>
    //       <i className="text-xl"><span className="fa fa-search"></span></i>
    //     </button>
    //   </div>
    //   {isOpen && (
    //     <div className="search fixed top-0 left-0 right-0 bottom-0 bg-white z-50">
    //       <div className="search__form p-4">
    //         <form className="search-bar__form flex items-center">
    //           <button className="go-btn search__button mr-2" type="submit">
    //             <i className="text-xl">🔍</i>
    //           </button>
    //           <input
    //             className="search__input flex-1 p-2 border"
    //             type="search"
    //             name="q"
    //             placeholder="Search entire store..."
    //             aria-label="Search"
    //             autoComplete="off"
    //           />
    //         </form>
    //         <button type="button" className="search-trigger close-btn absolute top-4 right-4" onClick={() => setIsOpen(false)}>
    //           <i className="text-xl">×</i>
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </>
    <div className="search">
      <div className="search__form">
        <form className="search-bar__form" action="#">
          <button className="go-btn search__button" type="submit"><i className="icon anm anm-search-l"></i></button>
          <input className="search__input" type="search" name="q" value="" placeholder="Search entire store..."
                 aria-label="Search" autoComplete="off" />
        </form>
        <button type="button" className="search-trigger close-btn"><i className="anm anm-times-l"></i></button>
      </div>
    </div>
  );
};

export default SearchForm;
