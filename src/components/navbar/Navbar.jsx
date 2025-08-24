import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Dropdown for categories (desktop)
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef(null);

  // Dropdown toggle for mobile categories
  const [mobileCatOpen, setMobileCatOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("users");
    navigate("/login");
  };

  // Animate mobile menu open/close
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (menuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: "-100%",
          duration: 0.4,
          ease: "power3.in",
        });
      }
    }
  }, [menuOpen]);

  // Animate categories dropdown (desktop)
  useEffect(() => {
    if (catRef.current) {
      if (catOpen) {
        gsap.to(catRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          display: "block",
          ease: "power3.out",
        });
      } else {
        gsap.to(catRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          display: "none",
          ease: "power3.in",
        });
      }
    }
  }, [catOpen]);

  return (
    <nav className="bg-white shadow-md fixed w-full border-b border-gray-400 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-black uppercase">Denver</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-black hover:text-gray-600 font-medium transition">
              Home
            </Link>
            <Link to="/allproduct" className="text-black hover:text-gray-600 font-medium transition">
              All Products
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <button className="text-black hover:text-gray-600 font-medium transition">
                Categories
              </button>
              <div
                ref={catRef}
                className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 hidden"
              >
                <Link to="/category/jacket" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Jacket
                </Link>
                <Link to="/category/shoe" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Shoe
                </Link>
                <Link to="/category/bags" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Bags
                </Link>
                <Link to="/category/shirt" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Shirt
                </Link>
                <Link to="/category/suit" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Suit
                </Link>
                <Link to="/category/tshirt" className="block px-4 py-2 text-black hover:bg-gray-100">
                  T-Shirt
                </Link>
                <Link to="/category/blazer" className="block px-4 py-2 text-black hover:bg-gray-100">
                  Blazer
                </Link>
              </div>
            </div>

            {!user && (
              <>
                <Link to="/signup" className="text-black hover:text-gray-600 font-medium transition">
                  Signup
                </Link>
                <Link to="/login" className="text-black hover:text-gray-600 font-medium transition">
                  Login
                </Link>
              </>
            )}
            {user?.role === "user" && (
              <Link to="/userdashboard" className="text-black hover:text-gray-600 font-medium transition">
                User
              </Link>
            )}
            {user?.role === "admin" && (
              <Link to="/admin" className="text-black hover:text-gray-600 font-medium transition">
                Admin
              </Link>
            )}
            {user && (
              <button onClick={logout} className="text-black hover:text-gray-600 font-medium transition">
                Logout
              </button>
            )}
            <Link to="/cart" className="text-black hover:text-gray-600 font-medium transition">
              Cart({cartItems.length})
            </Link>

            {/* Search Bar */}
            <div className="ml-4 w-64">
              <SearchBar />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(true)} className="text-black focus:outline-none mr-5">
              <svg className="w-6 h-6 text-black " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          ref={mobileMenuRef}
          className="fixed top-0 left-0 w-full h-full bg-zinc-900 text-white z-50 shadow-lg px-6 py-8 flex flex-col space-y-2 md:hidden"
          style={{ transform: "translateX(-100%)" }}
        >
          <div className="flex justify-between items-center pb-4 border-b border-gray-700">
            <h1 className="text-6xl uppercase font-bold">Denver</h1>
            <button onClick={() => setMenuOpen(false)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col mt-6">
            <Link
              to="/"
              className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/allproduct"
              className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              All Products
            </Link>

            {/* Categories Toggle */}
            <button
              onClick={() => setMobileCatOpen(!mobileCatOpen)}
              className="flex justify-between items-center font-medium text-lg py-3 border-b border-gray-700"
            >
              <span>Categories</span>
              <span>{mobileCatOpen ? "▲" : "▼"}</span>
            </button>

            {mobileCatOpen && (
              <div className="flex flex-col pl-4">
                <Link to="/category/jacket" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Jacket</Link>
                <Link to="/category/shoe" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Shoe</Link>
                <Link to="/category/bags" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Bags</Link>
                <Link to="/category/shirt" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Shirt</Link>
                <Link to="/category/suit" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Suit</Link>
                <Link to="/category/tshirt" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>T-Shirt</Link>
                <Link to="/category/blazer" className="hover:text-gray-400 py-2 border-b border-gray-700" onClick={() => setMenuOpen(false)}>Blazer</Link>
              </div>
            )}

            {!user && (
              <>
                <Link
                  to="/signup"
                  className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
            {user?.role === "user" && (
              <Link
                to="/userdashboard"
                className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                User
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700 text-left"
              >
                Logout
              </button>
            )}
            <Link
              to="/cart"
              className="hover:text-gray-400 font-medium text-lg py-3 border-b border-gray-700"
              onClick={() => setMenuOpen(false)}
            >
              Cart({cartItems.length})
            </Link>

            {/* Mobile Search */}
            <div className="mt-4 w-full">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
