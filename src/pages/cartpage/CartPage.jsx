import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/CartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FireBase";
import BuyNowModal from "../../components/buynowmodel/BuyNowModel";
import { Navigate } from "react-router";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  const handleIncrement = (id) => dispatch(incrementQuantity(id));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));

  const cartItemTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
  });

  const buyNowFunction = async () => {
    if (!addressInfo.name || !addressInfo.address || !addressInfo.pincode || !addressInfo.mobileNumber) {
      return toast.error("All fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({ name: "", address: "", pincode: "", mobileNumber: "" });
      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 max-w-7xl lg:px-0">
        <div className="mx-auto max-w-2xl  lg:max-w-7xl">

          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">

            {/* Cart Items */}
            <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
              <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? cartItems.map((item, index) => {
                  const { id, title, price, previewImage, quantity, category } = item;
                  return (
                    <div key={index}>
                      <li className="flex py-6 sm:py-6">
                        <div className="flex-shrink-0">
                          <img
                            src={previewImage}
                            alt={title}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm font-semibold text-black">{title}</h3>
                              </div>
                              <div className="mt-1 flex text-sm text-gray-500">{category}</div>
                              <div className="mt-1 flex items-end text-sm font-medium text-gray-900">
                                ₹{price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      {/* Quantity & Remove */}
                      <div className="mb-2 flex items-center">
                        <div className="min-w-24 flex border rounded-md overflow-hidden">
                          <button onClick={() => handleDecrement(id)} type="button" className="px-3 bg-gray-200 hover:bg-gray-300 transition">-</button>
                          <input type="text" className="w-12 text-center border-l border-r" value={quantity} readOnly />
                          <button onClick={() => handleIncrement(id)} type="button" className="px-3 bg-gray-200 hover:bg-gray-300 transition">+</button>
                        </div>
                        <button
                          onClick={() => deleteCart(item)}
                          className="ml-4 flex items-center space-x-1 text-red-600 hover:text-red-800 transition"
                        >
                          <Trash size={14} />
                          <span className="text-xs font-medium">Remove</span>
                        </button>
                      </div>
                    </div>
                  );
                }) : <h1 className="text-center text-gray-500">Cart is empty</h1>}
              </ul>
            </section>

            {/* Order Summary */}
            <section aria-labelledby="summary-heading" className="mt-16 sticky top-20 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
                <h1 className="text-[4vh] font-semibold uppercase">Shopping cart</h1>
              <h2 id="summary-heading" className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4">
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                    <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-sm text-gray-800">Delivery Charges</dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4">
                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                    <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                  </div>
                </dl>

                <div className="px-2 pb-4">
                  {user ? (
                    <BuyNowModal
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      buyNowFunction={buyNowFunction}
                      buttonClass="bg-black text-white hover:bg-gray-800 transition" // ✅ professional black button
                    />
                  ) : (
                    <Navigate to={'/login'} />
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
