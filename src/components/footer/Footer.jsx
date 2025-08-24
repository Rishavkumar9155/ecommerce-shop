import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Github,
} from "lucide-react";
import { SiGmail } from "react-icons/si"; // Gmail icon

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 text-sm uppercase ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand Info */}
        <div>
          <h2 className="text-black bg-white pl-2 text-3xl font-extrabold tracking-widest mb-4">
            DENVER
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            A modern Genuine brand for fashion & lifestyle.<br />
            Crafted for style, durability, and everyday comfort.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="/allproduct" className="hover:underline">All Products</a></li>
        
            <li><a href="mailto:rishu9905213580@gmail.com" className="hover:underline"> Contact</a></li>
            
          </ul>
        </div>

        {/* Categories with Route Path */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/category/shirt" className="hover:underline">Shirts</a></li>
            <li><a href="/category/jacket" className="hover:underline">Jackets</a></li>
            <li><a href="/category/shoes" className="hover:underline">Shoes</a></li>
            <li><a href="/category/bags" className="hover:underline">Bags</a></li>
            <li><a href="/category/blazer" className="hover:underline">Blazers</a></li>
            <li><a href="/category/suit" className="hover:underline">Suits</a></li>
          </ul>
        </div>

        {/* Web3 Contact Form - Prada Style + Modern Black */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wide">Get in Touch</h3>
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="space-y-6 bg-black"
          >
            <input type="hidden" name="access_key" value="1cf7b8b4-fdc9-40b1-83b4-da55c167f9f5" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-black text-white placeholder-gray-500 border-b border-gray-600 py-2 focus:outline-none focus:border-white transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full bg-black text-white placeholder-gray-500 border-b border-gray-600 py-2 focus:outline-none focus:border-white transition"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              required
              className="w-full bg-black text-white placeholder-gray-500 border-b border-gray-600 py-2 resize-none focus:outline-none focus:border-white transition"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2  hover:bg-gray-200 transition"
            >
              Send Message
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-5 text-white ">
            <a href="https://www.instagram.com/l_rishavkumar_l?igsh=MW9wMXUxZWF6enB0cQ==" className="hover:text-gray-400 transition"><Instagram size={20} /></a>
            <a href="https://www.facebook.com/share/19bnFpejfF/" className="hover:text-gray-400 transition"><Facebook size={20} /></a>
            <a href="mailto:rishu9905213580@gmail.com" className="hover:text-gray-400 transition"><SiGmail size={20} /></a>
            <a href="https://github.com/Rishavkumar9155" className="hover:text-gray-400 transition"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/rishav-kumar-1616b21a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-gray-400 transition"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

     

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-6 text-xs text-gray-500 uppercase">
        © {new Date().getFullYear()} DENVER — Crafted with rishav | All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
