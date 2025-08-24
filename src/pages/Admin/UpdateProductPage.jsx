import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const categoryList = [
  "shoes",
  "jacket",
  "shirt",
  "tshirt",
  "suit",
  "blazer",
  "bags",
];

const UpdateProductPage = () => {
  const { loading, setLoading } = useContext(myContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Individual state variables
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [galleryImages, setGalleryImages] = useState(["", "", "", ""]);

  // Handle gallery image changes
  const handleGalleryChange = (index, value) => {
    const newImages = [...galleryImages];
    newImages[index] = value;
    setGalleryImages(newImages);
  };

  // Fetch product details
  const getProduct = async () => {
    setLoading(true);
    try {
      const docRef = doc(fireDB, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const product = docSnap.data();
        setTitle(product.title || "");
        setPrice(product.price || "");
        setDescription(product.description || "");
        setCategory(product.category || "");
        setPreviewImage(product.previewImage || "");
        setGalleryImages(product.productImages || ["", "", "", ""]);
      } else {
        toast.error("Product not found!");
        navigate("/admin");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async () => {
    if (!title || !price || !description || !category || !previewImage) {
      toast.error("Please fill all fields and add a preview image.");
      return;
    }

    setLoading(true);
    try {
      const productData = {
        title,
        price: Number(price),
        description,
        category,
        previewImage,
        productImages: galleryImages.filter((img) => img.trim() !== ""),
        time: new Date(),
      };

      await setDoc(doc(fireDB, "products", id), productData);
      toast.success("Product updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Layout>
      <section className="py-10 font-poppins">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Product</h2>

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
              {categoryList.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
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

            {/* Gallery Images */}
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
              onClick={updateProduct}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpdateProductPage;
