import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../utils/context.ts";
import ProductItem from "./ProductItem.tsx";
import { useParams } from "react-router-dom";
import { ProductT } from "../../utils/types.ts";

const ProductListGrid = () => {
  const { products } = useContext(ProductsContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;
  if (!products || products.length === 0)
    return <p>No products found in this category.</p>;

  return (
    <div className="grid-products grid--view-items">
      <div className="row">
        {products.map((p: ProductT) => (
          <ProductItem key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductListGrid;
