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

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <div className="mt-2">Loading products...</div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center my-4" role="alert">
        Error: {error}
      </div>
    );

  return (
    <div className="accordion " id="accordionProducts">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingProducts">
          <button
            className="accordion-button fw-bold"
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
          <div className="accordion-body p-0 m-0">
            <div className="d-flex justify-content-center p-1 ">
              <button
                className="btn btn-success"
                onClick={() => nav("/new")}
              >
                <i className="fa fa-plus me-2" />
                Create New Post
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
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
                        height={70}
                        width={70}
                        className="object-fit-cover rounded border"
                        src={Array.isArray(prod.imageUrls) ? prod.imageUrls[0] : prod.imageUrls}
                        alt={prod.name}
                        onError={(e: any) => {
                          e.target.src = "https://via.placeholder.com/70";
                        }}
                      />
                    </td>
                    <td>{prod.name}</td>
                    <td>
                      <span className="badge bg-secondary">{prod.category}</span>
                    </td>
                    <td>{prod.quantity}</td>
                    <td>₪ {prod.price.toFixed(2)}</td>
                    <td>
                        <button
                          className="fa fa-edit fa-lg me-2 p-0 border-0 text-primary"
                          onClick={() => nav(`/product/edit/${prod.id}`)}
                        />
                        <button
                          className="fa fa-trash fa-lg me-2 p-0 border-0 text-danger"
                          onClick={() => prod.id && handleDelete(prod.id)}
                        />
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="text-muted">No products found.</div>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
