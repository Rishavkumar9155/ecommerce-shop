import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FireBase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import toast from "react-hot-toast";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("XS");

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getProductData = async () => {
    setLoading(true);
    try {
      const docRef = doc(fireDB, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ ...docSnap.data(), id: docSnap.id });
      } else {
        toast.error("Product not found");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  useEffect(() => {
    if (product) localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, product]);

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  if (loading || !product) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      </Layout>
    );
  }

  // Size options
  const availableSizes = [
    { size: "XS", available: true },
    { size: "S", available: true },
    { size: "M", available: true },
    { size: "L", available: false },
    { size: "XL", available: false },
  ];

  return (
    <Layout>
      <section>
        <div className="flex flex-col  lg:flex-row gap-4 min-h-screen mx-auto p-4 md:p-6 lg:p-8">

          {/* Left: Image grid for large screens */} 
          <div className="w-full lg:w-[60%] h-full overflow-y-auto pr-0 lg:pr-2">
            {/* Show Swiper on small screens */}
            <div className="lg:hidden relative">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                modules={[Navigation]}
              >
                {product.productImages &&
                  product.productImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="w-full aspect-square overflow-hidden">
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </SwiperSlide>
                  ))}

                {/* Custom Navigation Buttons */}
                <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full z-10">
                  &#10094;
                </button>
                <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full z-10">
                  &#10095;
                </button>
              </Swiper>
            </div>

            {/* Grid for large screens */}
            <div className="hidden lg:grid grid-cols-2 gap-1">
              {product.productImages &&
                product.productImages.map((img, index) => (
                  <div
                    key={index}
                    className="w-full aspect-square overflow-hidden transition-all duration-300"
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Right: Sticky product info */}
          <div className="w-full lg:w-[40%] h-auto lg:h-[90vh] flex flex-col justify-between bg-white p-4 md:p-6 lg:p-6 sticky top-20">
            {/* Top content */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-gray-900">
                {product.title}
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-black font-semibold">
                ₹ {product.price}
              </p>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                {availableSizes.map((sizeOption) => (
                  <div
                    key={sizeOption.size}
                    onClick={() =>
                      sizeOption.available && setSelectedSize(sizeOption.size)
                    }
                    className={`border p-2 sm:p-3 text-center cursor-pointer transition-colors duration-200 text-sm sm:text-base ${
                      sizeOption.available
                        ? selectedSize === sizeOption.size
                          ? "border-gray-900 bg-gray-100"
                          : "border-gray-300 hover:bg-gray-100"
                        : "border-gray-200 text-gray-400 line-through cursor-not-allowed"
                    }`}
                  >
                    {sizeOption.size}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom button */}
            <div className="mt-4">
              {cartItems.some((p) => p.id === product.id) ? (
                <button
                  onClick={() => deleteCart(product)}
                  className="w-full py-3 bg-gray-500 text-white hover:bg-gray-600 shadow-md transition-all duration-300 text-sm sm:text-base"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => addCart(product)}
                  className="w-full py-3 bg-black text-white font-bold hover:bg-white hover:text-black shadow-md transition-all duration-300 text-sm sm:text-base"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductInfo;
