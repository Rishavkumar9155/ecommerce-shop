import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6 lg:py-10 text-black">
                {/* User Info */}
                <div className="bg-white shadow-lg rounded-2xl p-8 mb-10 border border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                            alt="user"
                            className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm"
                        />
                        <div className="text-center space-y-2">
                            <h1 className="text-lg font-medium">
                                <span className="font-bold">Name:</span> {user?.name}
                            </h1>
                            <h1 className="text-lg font-medium">
                                <span className="font-bold">Email:</span> {user?.email}
                            </h1>
                            <h1 className="text-lg font-medium">
                                <span className="font-bold">Date:</span> {user?.date}
                            </h1>
                            <h1 className="text-lg font-medium capitalize">
                                <span className="font-bold">Role:</span> {user?.role}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold uppercase mb-6 tracking-wide">
                        Order Details
                    </h2>

                    {loading && (
                        <div className="flex justify-center my-10">
                            <Loader />
                        </div>
                    )}

                    {getAllOrder
                        .filter((obj) => obj.userid === user?.uid)
                        .map((order, index) => (
                            <div key={index}>
                                {order.cartItems.map((item, idx) => {
                                    const { id, date, quantity, price, title, previewImage, category } = item;
                                    const { status } = order;

                                    return (
                                        <div
                                            key={idx}
                                            className="bg-white border border-gray-200 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row overflow-hidden transition hover:shadow-lg"
                                        >
                                            {/* Left Order Summary */}
                                            <div className="bg-gray-50 w-full md:max-w-xs p-6 border-b md:border-b-0 md:border-r border-gray-200">
                                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-4 text-sm">
                                                    <div>
                                                        <p className="font-semibold text-gray-600">Order ID</p>
                                                        <p className="font-medium">#{id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-600">Date</p>
                                                        <p className="font-medium">{date}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-600">Amount</p>
                                                        <p className="font-medium">₹ {price * quantity}</p>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-600">Status</p>
                                                        <p className="font-medium text-green-700 capitalize">
                                                            {status}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Product Details */}
                                            <div className="flex-1 p-6">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <img
                                                        src={previewImage}
                                                        alt={title}
                                                        className="w-32 h-32 rounded-lg border border-gray-200 object-contain bg-gray-50"
                                                    />
                                                    <div className="flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{title}</h3>
                                                            <p className="text-gray-500 text-sm">{category}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-600">Quantity: x{quantity}</p>
                                                    </div>
                                                    <div className="ml-auto text-right">
                                                        <p className="font-semibold text-lg">₹ {price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
