import React, { useContext, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"
import { ProductsContext } from "../../utils/context.ts"
import { ProductT } from "../../utils/types.ts"
import { baseUrlBlog } from "../../utils/constants.ts"
import { deletePost } from "../../features/api/postActions.tsx"
import { useNavigate } from "react-router-dom"

const Products = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.token)
  const { language } = useContext(ProductsContext)
  const nav = useNavigate()
  const [products, setProducts] = useState<ProductT[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<ProductT>>({})

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/posts`)
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`)
        const data: ProductT[] = await res.json()
        setProducts(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleEditClick = (prod: ProductT) => {
    setEditId(prod.id!)
    setFormData({ ...prod })
  }

  const handleCancel = () => {
    setEditId(null)
    setFormData({})
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === "quantity" || name === "buy" || name === "sell" ? Number(value) : value
    }))
  }

  // const handleSave = () => {
  //   if (editId && formData) {
  //     dispatch(updatePost(editId, formData, token))
  //     setProducts(prev =>
  //       prev.map(p => (p.id === editId ? { ...p, ...formData } as ProductT : p))
  //     )
  //     setEditId(null)
  //     setFormData({})
  //   }
  // }

  const handleDelete = async (prodId: string) => {
    if (!window.confirm(language === "Armenian" ? "Համոզվա՞ծ եք, որ ցանկանում եք հեռացնել ապրանքը։" : language === "Russian" ? "Вы уверены, что хотите удалить этот продукт?" : "Are you sure you want to delete this product?")) return
    try {
      await deletePost(prodId, token)
      setProducts(prev => prev.filter(p => p.id !== prodId))
    } catch (e) {
      alert((language === "Armenian" ? "Հեռացման սխալ։" : language === "Russian" ? "Ошибка удаления." : "Error deleting: ") + (e as Error).message)
    }
  }

  if (loading) return <div>{language === "Armenian" ? "Բեռնվում է ապրանքները..." : language === "Russian" ? "Загрузка продуктов..." : "Loading products..."}</div>
  if (error) return <div>{language === "Armenian" ? `Սխալ՝ ${error}` : language === "Russian" ? `Ошибка: ${error}` : `Error: ${error}`}</div>

  return (
    <div className="accordion" id="accordionProducts">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingProducts">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseProducts"
            aria-expanded="true"
            aria-controls="collapseProducts"
          >
            {language === "Armenian" ? "Ապրանքներ" : language === "Russian" ? "Продукты" : "Products"}
          </button>
        </h2>
        <div
          id="collapseProducts"
          className="accordion-collapse collapse show"
          aria-labelledby="headingProducts"
        >
          <div className="accordion-body">
            <table className="table">
              <thead>
              <tr>
                <th>{language === "Armenian" ? "Պատկեր" : language === "Russian" ? "Картина" : "Image"}</th>
                <th>{language === "Armenian" ? "Անուն" : language === "Russian" ? "Название" : "Name"}</th>
                <th>{language === "Armenian" ? "Կատեգորիա" : language === "Russian" ? "Категория" : "Category"}</th>
                <th>{language === "Armenian" ? "Քանակ" : language === "Russian" ? "Кол-во" : "Qty"}</th>
                <th>{language === "Armenian" ? "Գնվել" : language === "Russian" ? "Покупка" : "Buy"}</th>
                <th>{language === "Armenian" ? "Վաճառք" : language === "Russian" ? "Продажа" : "Sell"}</th>
                <th>{language === "Armenian" ? "Եռուստիկ" : language === "Russian" ? "Прибыль" : "Profit"}</th>
                <th>{language === "Armenian" ? "Գործողություններ" : language === "Russian" ? "Действия" : "Actions"}</th>
              </tr>
              </thead>
              <tbody>
              {products.map(prod => (
                  <tr key={prod.id}>
                    <td><img height={80} className={"w-75 object-fit-cover"} src={prod.imageUrl} alt={prod.name} /></td>
                    <td>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>{prod.quantity}</td>
                    <td>֏ {prod.buy.toFixed(2)}</td>
                    <td>֏ {prod.sell.toFixed(2)}</td>
                    <td className="text-danger">֏ {(prod.sell - prod.buy).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => nav(`/product/edit/${prod.id}`)}
                      >
                        <span className="fa fa-edit"></span>

                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => prod.id && handleDelete(prod.id)}
                      >
                        <span className="fa fa-trash"></span>
                      </button>
                    </td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
