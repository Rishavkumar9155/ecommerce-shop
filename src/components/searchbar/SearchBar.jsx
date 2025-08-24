import { useContext, useState, useEffect, useRef } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { gsap } from "gsap";
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const dropdownRef = useRef(null);

  // Animate dropdown open/close
  useEffect(() => {
    if (dropdownRef.current) {
      if (search) {
        gsap.to(dropdownRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(dropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [search]);

  // Filter search data
  useEffect(() => {
    const filtered = getAllProduct
      .filter((obj) =>
        obj.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 8);
    setFilteredData(filtered);
  }, [search, getAllProduct]);

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-gray-600 focus:ring focus:ring-gray-200 outline-none text-black placeholder-gray-400 transition shadow-sm hover:shadow-md"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <BiSearch />
        </span>
      </div>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className="absolute left-0 right-0 mt-1 bg-white shadow-xl rounded-lg overflow-hidden z-50 opacity-0 h-0 border border-gray-200"
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                navigate(`/productinfo/${item.id}`);
                setSearch("");
              }}
            >
              <img
                src={item.previewImage} // ✅ use preview image
                alt={item.title}
                className="w-10 h-10 object-cover object-top"
              />
              <span className="text-black font-medium truncate">{item.title}</span>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center py-4">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
              alt="No results"
            className="w-12 h-12 object-cover object-top object-fit "
            />
            <span className="text-gray-400 font-medium">No results found</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
