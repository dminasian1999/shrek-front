import React from "react";

// Define a type for product variants for better type safety
type ProductVariant = {
  size: string;
  price: number;
  sku: string;
  stock: number;
};

// Define the props the component will accept
interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedSku: string | null;
  onVariantSelect: (variant: ProductVariant) => void;
}

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
                                                                         variants,
                                                                         selectedSku,
                                                                         onVariantSelect,
                                                                       }) => {
  return (
    <div className="mb-4">
      <strong className="d-block mb-2">Size:</strong>
      <div className="d-flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedSku === variant.sku;
          const isOutOfStock = variant.stock === 0;

          return (
            <button
              key={variant.sku}
              type="button"
              onClick={() => onVariantSelect(variant)}
              disabled={isOutOfStock}
              className={`btn flex-fill text-center rounded-3 border transition ${
                isSelected
                  ? "btn-primary text-white border-primary"
                  // Use Bootstrap's disabled styles for out-of-stock items
                  : isOutOfStock
                    ? "btn-outline-secondary disabled"
                    : "btn-outline-primary"
              }`}
              style={{ minWidth: "70px" }}
              title={isOutOfStock ? "Out of Stock" : `Select size ${variant.size}`}
            >
              {variant.size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantSelector;
