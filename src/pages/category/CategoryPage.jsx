import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;

  const navigate = useNavigate();
  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

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
      <div className="mt-20">
        <h1 className="text-left ml-6 uppercase mb-8 text-3xl font-bold bg-black text-white w-[60%] pl-2 p-1 first-letter:uppercase">
          {categoryname}
        </h1>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  filterProduct.map((item, index) => {
                    const { id, title, price, previewImage } = item; // ✅ fixed field
                    return (
                      <div
                        key={index}
                        className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                      >
                        <div className="overflow-hidden cursor-pointer flex flex-col ">
                          <div className="relative w-full h-80 md:h-96">
                            <img
                              onClick={() => navigate(`/productinfo/${id}`)}
                              className="w-full h-full object-cover object-top "
                              src={previewImage} // ✅ fixed field
                              alt={title}
                            />
                          </div>

                          <div className="p-2 flex flex-col flex-1 justify-between ">
                            <div>
                              <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                Denver
                              </h2>
                              <h1 className="title-font text-lg font-semibold uppercase text-gray-900 mb-2">
                                {title.substring(0, 25)}
                              </h1>
                              <p className="text-lg font-semibold text-gray-900 mb-3">
                                ₹{price}
                              </p>
                            </div>

                            <div className="flex justify-centero">
                              {cartItems.some((p) => p.id === item.id) ? (
                                <button
                                  onClick={() => deleteCart(item)}
                                  className="bg-black text-white uppercase w-full py-2 font-light hover:bg-gray-800 transition"
                                >
                                  Delete From Cart
                                </button>
                              ) : (
                                <button
                                  onClick={() => addCart(item)}
                                  className="bg-black text-white uppercase w-full py-2  font-light hover:bg-gray-800 transition"
                                >
                                  Add To Cart
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center">
                    <img
                      className="mb-2"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt="no product"
                    />
                    <h1 className="text-black text-xl">
                      No {categoryname} product found
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
