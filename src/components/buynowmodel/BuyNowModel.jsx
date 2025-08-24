/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    if (open && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { x: "-100%", opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else if (!open && modalRef.current) {
      gsap.to(modalRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [open]);

  const inputClass =
    "bg-gray-100 border border-gray-300 px-3 py-3 w-full outline-none text-gray-800 placeholder-gray-400 rounded-md";

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center bg-black text-white hover:bg-gray-800 transition"
      >
        Buy Now
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Modal sliding from left */}
          <div
            ref={modalRef}
            className="h-full md:h-auto w-full sm:w-3/4 md:w-1/2 max-w-lg bg-white shadow-2xl rounded-lg p-8 overflow-y-auto"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center uppercase">
              Enter Shipping Address
            </h2>

            <div className="space-y-5">
              <input
                type="text"
                name="name"
                value={addressInfo.name}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, name: e.target.value })
                }
                placeholder="Full Name"
                className={inputClass}
              />
              <input
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, address: e.target.value })
                }
                placeholder="Address"
                className={inputClass}
              />
              <input
                type="number"
                name="pincode"
                value={addressInfo.pincode}
                onChange={(e) =>
                  setAddressInfo({ ...addressInfo, pincode: e.target.value })
                }
                placeholder="Pincode"
                className={inputClass}
              />
              <input
                type="text"
                name="mobileNumber"
                value={addressInfo.mobileNumber}
                onChange={(e) =>
                  setAddressInfo({
                    ...addressInfo,
                    mobileNumber: e.target.value,
                  })
                }
                placeholder="Mobile Number"
                className={inputClass}
              />
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                onClick={handleOpen}
                className="px-6 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  buyNowFunction();
                  handleOpen();
                }}
                className="px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition"
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;
