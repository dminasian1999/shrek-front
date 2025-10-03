import React, { useContext } from "react"
import { categories } from "../../utils/constants.ts"
import { ProductsContext } from "../../utils/context.ts"

const Types = () => {
  const {language} = useContext(ProductsContext)
const cat =categories

  return (
    <div className="p-5 d-flex flex-wrap justify-content-center align-items-center gap-5">
      {cat
        .flatMap(category => (category.types))
        .map((item) => (
              <a
                href={`/category/${cat.find(category => category.types!.includes(item!))!.route}/${item!.route}`}
                className="grid-view-item__link d-flex flex-column align-items-center">
                <div className={`fs-1  text-success ${item!.icon}`}/>
                <h3 className="mt-2 fs-6">{item!.title}</h3>
              </a>
        ))}
    </div>
  )
}

export default Types
