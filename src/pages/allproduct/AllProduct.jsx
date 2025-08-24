import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";

const AllProduct = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-center mb-8 text-2xl font-semibold uppercase">All Products</h1>

        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {getAllProduct.map((item, index) => {
                const { id, title, price, previewImage } = item; // ✅ correct field
                const inCart = cartItems.some((p) => p.id === id);

                return (
                  <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <div className="overflow-hidden cursor-pointer flex flex-col   transition">
                      <div
                        className="relative w-full h-80 md:h-96"
                        onClick={() => navigate(`/productinfo/${id}`)}
                      >
                        <img
                          className="w-full h-full object-cover object-top "
                          src={previewImage} // ✅ correct field
                          alt={title}
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between ">
                        <div>
                          <h2 className="tracking-widest text-xs font-medium text-gray-500 mb-1">
                            Denver
                          </h2>
                          <h1 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                            {title}
                          </h1>
                          <p className="text-lg font-semibold text-gray-900 mb-3">
                            ₹{price}
                          </p>
                        </div>

                        <div className="flex justify-center mt-auto">
                          {inCart ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-black text-white w-full py-2 uppercase font-light hover:bg-gray-800 transition"
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-black text-white w-full py-2 uppercase font-light hover:bg-gray-800 transition"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
