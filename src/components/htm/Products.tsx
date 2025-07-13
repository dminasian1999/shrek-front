import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks.ts";
import { ProductT } from "../../utils/types.ts";
import { baseUrlBlog } from "../../utils/constants.ts";
import { deletePost } from "../../features/api/postActions.tsx";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const token = useAppSelector(state => state.token);
  const nav = useNavigate();

  const [products, setProducts] = useState<ProductT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrlBlog}/posts`);
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const data: ProductT[] = await res.json();
        setProducts(data);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError("Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (prodId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deletePost(prodId, token);
      setProducts(prev => prev.filter(p => p.id !== prodId));
    } catch (e: unknown) {
      alert("Error deleting product: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

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
            Products
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
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Color</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {products.map(prod => (
                <tr key={prod.id}>
                  <td>
                    <img
                      height={80}
                      className="w-75 object-fit-cover rounded border"
                      src={Array.isArray(prod.imageUrls) ? prod.imageUrls[0] : prod.imageUrls}
                      alt={prod.name}
                    />
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.category}</td>
                  <td>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: prod.color,
                          color:
                            prod.color === "black" || prod.color === "#36454F"
                              ? "white"
                              : "black",
                        }}
                      >
                        {prod.color}
                      </span>
                  </td>
                  <td>{prod.materials?.[0]}</td>
                  <td>{prod.quantity}</td>
                  <td>֏ {prod.price.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => nav(`/product/edit/${prod.id}`)}
                    >
                      <i className="fa fa-edit" />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => prod.id && handleDelete(prod.id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
