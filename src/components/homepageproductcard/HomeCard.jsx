import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { ShoppingBag } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HomePageProductCard = () => {
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
    <div className="mt-[1vh] mb-[1vh] relative">
      <Swiper
        className="mySwiper"
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          type: "fraction", // ✅ fraction instead of too many dots
        }}
        breakpoints={{
          1024: { slidesPerView: 4, spaceBetween: 30 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          0: { slidesPerView: 1, spaceBetween: 10 },
        }}
      >
        {getAllProduct.map((item, index) => {
          const { id, title, price, previewImage } = item;
          const inCart = cartItems.some((p) => p.id === item.id);

          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col">
                {/* Image Section */}
                <div
                  className="w-full aspect-[3/4] bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/productinfo/${id}`)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={previewImage}
                    alt={title}
                  />
                </div>

                {/* Info Section */}
                <div className="flex items-start justify-between p-[5vh] mt-2">
                  <div>
                    <h1 className="text-sm text-gray-800">{title}</h1>
                    <h1 className="text-base font-semibold text-gray-900">
                      ₹{price}
                    </h1>
                  </div>

                  {/* Cart Toggle */}
                  <button
                    onClick={() => (inCart ? deleteCart(item) : addCart(item))}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <ShoppingBag
                      size={22}
                      className={`${
                        inCart ? "fill-gray-500" : "text-gray-500"
                      } hover:scale-110 transition-transform`}
                    />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom arrows */}
        <div className="swiper-button-prev !text-black !left-2"></div>
        <div className="swiper-button-next !text-black !right-2"></div>
      </Swiper>

      {/* Extra styling for arrows */}
      <style>{`
        .swiper-button-prev,
        .swiper-button-next {
          color: black !important;
          font-weight: bold;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
};

export default HomePageProductCard;
