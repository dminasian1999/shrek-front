import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { ProductT } from "../../utils/types.ts";
import { getPostByIds } from "../../features/api/postActions.tsx";
import { addCartList, removeWishlist } from "../../features/api/accountActions.ts";
import { ProductsContext } from "../../utils/context.ts";

const WishList = () => {
  const { language } = useContext(ProductsContext); // if you still use it elsewhere
  const user = useAppSelector(state => state.user.profile);
  const token = useAppSelector(state => state.token);
  const [products, setProducts] = useState<ProductT[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.wishList?.length) {
      getPostByIds(user.wishList, token).then(setProducts);
    }
  }, [token, user?.wishList]);

  return (
    <div className="">
      <h2 className="text-center mb-4">My Wishlist</h2>
      <div className="table-responsive shadow rounded">
        <table className="table table-hover align-middle text-center mb-0">
          <thead className="table-light">
          <tr>
            <th>Remove</th>
            <th>Image</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Category</th>
            <th>Add to Cart</th>
          </tr>
          </thead>
          <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                <button
                  onClick={() => dispatch(removeWishlist(p.id!))}
                  className="btn btn-sm btn-outline-danger"
                >
                  <i className="fa fa-times"></i>
                </button>
              </td>
              <td>
                <img
                  src={p.imageUrls?.[0] || "https://via.placeholder.com/60"}
                  alt={p.name}
                  className="rounded border"
                  width={60}
                  height={60}
                  onError={(e: any) => {
                    e.target.src = "https://via.placeholder.com/60";
                  }}
                />
              </td>
              <td className="fw-semibold">
                <span>{p.name}</span>
              </td>
              <td className="text-success fw-bold">
                ${p.price.toFixed(2)}
              </td>
              <td className="text-muted">
                {p.category}
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch(
                      addCartList({
                        cartItemId: p.id!,
                        product: p,
                        quantity: 1,
                      })
                    )
                  }
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="fa fa-cart-plus me-1"></i> Add to Cart
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6}>
                <div className="py-4 text-muted">Your wishlist is empty.</div>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
