import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getPostById, uploadImage } from "../../features/api/postActions.ts";
import { baseUrlBlog, categories } from "../../utils/constants.ts";
import { ProductT } from "../../utils/types.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"

const EditProduct = () => {
  const { id = "" } = useParams()
  const [product, setProduct] = useState({} as ProductT);
  const [loading, setLoading] = useState(true);
  const token = useAppSelector((state) => state.token);
  const pro = useAppSelector((state) => state.posts.products.find((p) => p.id === id));
  const navigate = useNavigate();
  const dis = useAppDispatch()
  const handleChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
     await fetch(`${baseUrlBlog}/post/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(product),
    }).then(() => {navigate(-1)});

  };

  useEffect(() => {
    setProduct(pro!)
    // dis(getPostById(id))
  }, [id])


  // if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Product</h2>
      <div className="row">
        <div className="col-md-6">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="mb-3 rounded"
              style={{ width: "100%", objectFit: "cover", maxHeight: 300 }}
            />
          )}
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadImage(file, token).then((url) =>
                  handleChange("imageUrl", url)
                );
              }
            }}
          />
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              className="form-control"
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={product.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.title} value={cat.route}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              value={product.quantity}
              onChange={(e) =>
                handleChange("quantity", Number(e.target.value))
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Buy Price</label>
            <input
              type="number"
              className="form-control"
              value={product.buy}
              onChange={(e) => handleChange("buy", Number(e.target.value))}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sell Price</label>
            <input
              type="number"
              className="form-control"
              value={product.sell}
              onChange={(e) => handleChange("sell", Number(e.target.value))}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
