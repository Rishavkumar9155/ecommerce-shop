import { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FireBase";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const AddProduct = () => {
  const { loading, setLoading } = useContext(myContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Preview image (main image for admin/home/category)
  const [previewImage, setPreviewImage] = useState("");

  // Other 4 images (for Product Info page)
  const [galleryImages, setGalleryImages] = useState(["", "", "", ""]);

  // Handle gallery image change
  const handleGalleryChange = (index, value) => {
    const newImages = [...galleryImages];
    newImages[index] = value;
    setGalleryImages(newImages);
  };

  // Save product
  const addProduct = async () => {
    if (!title || !price || !description || !category || !previewImage) {
      toast.error("Please fill all fields and add a preview image.");
      return;
    }

    setLoading(true);
    try {
      const product = {
        title,
        price: Number(price),
        description,
        category,
        previewImage, // ✅ only used outside ProductInfo
        productImages: galleryImages.filter((img) => img.trim() !== ""), // ✅ only for ProductInfo
        time: new Date(),
      };

      await addDoc(collection(fireDB, "products"), product);

      toast.success("Product added successfully!");

      // Reset form
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setPreviewImage("");
      setGalleryImages(["", "", "", ""]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-10 font-poppins">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>

          {loading && (
            <div className="flex justify-center mb-4">
              <Loader />
            </div>
          )}

          <div className="space-y-4">
            {/* Category Dropdown */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Category --</option>
              <option value="shoes">Shoes</option>
              <option value="jacket">Jacket</option>
              <option value="shirt">Shirt</option>
              <option value="tshirt">T-Shirt</option>
              <option value="suit">Suit</option>
              <option value="blazer">Blazer</option>
              <option value="bags">Bags</option>
            </select>

            {/* Title */}
            <input
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Description */}
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />

            {/* Preview Image */}
            <div className="space-y-2">
              <label className="font-semibold">Preview Image (Main)</label>
              <input
                type="text"
                placeholder="Preview Image URL"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-48 object-cover border rounded-lg"
                />
              )}
            </div>

            {/* Gallery Images (4 URLs) */}
            <div>
              <label className="font-semibold block mb-2">Other Images (for Product Info)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryImages.map((img, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      type="text"
                      placeholder={`Image URL ${index + 1}`}
                      value={img}
                      onChange={(e) => handleGalleryChange(index, e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {img && (
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover border rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={addProduct}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AddProduct;
