import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct } = context;

    return (
        <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">#</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Order Id</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Image</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Qty</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Total</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Pincode</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {getAllOrder.map((order) =>
                            order.cartItems.map((item, index) => {
                                const { id, previewImage, title, category, price, quantity } = item;
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{id}</td>
                                        <td className="px-4 py-2">
                                            <img
                                                src={previewImage}
                                                alt={title}
                                                className="w-16 h-16 object-cover rounded-md border"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{title}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{category}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">₹{price}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{quantity}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">₹{price * quantity}</td>
                                        <td className={`px-4 py-2 text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-500'}`}>
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.addressInfo.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.addressInfo.address}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.addressInfo.pincode}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.addressInfo.mobileNumber}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.email}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{order.date}</td>
                                        <td
                                            onClick={() => deleteProduct(order.id)}
                                            className="px-4 py-2 text-sm text-red-500 cursor-pointer hover:underline font-semibold"
                                        >
                                            Delete
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
