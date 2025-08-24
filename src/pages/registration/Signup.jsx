/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FireBase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();

    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        try {
            const users = await createUserWithEmailAndPassword(
                auth,
                userSignup.email,
                userSignup.password
            );

            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }),
            };

            const userRefrence = collection(fireDB, "user");
            await addDoc(userRefrence, user);

            setUserSignup({ name: "", email: "", password: "" });

            toast.success("Signup Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Left: Video Section */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-black">
                <video
                    src="https://ik.imagekit.io/brprnjytw/videoplayback%20(2).mp4?updatedAt=1755965670771"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right: Signup Form */}
            <div className="w-full bg-red-400 relative overflow-hidden lg:w-1/2 h-full flex justify-center items-center bg-white text-black px-8">
                     <a className=" text-black bg-black text-white absolute top-[10%] flex items-center justify-end  uppercase w-[50%] right-1 mr-1 h-[3vh] pr-2 " href="/">home</a>
                <div className="w-full max-w-md ">
                    <div className="mb-8 text-center">
                       
                        <h2 className="text-3xl font-bold">Signup</h2>
                    </div>

                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={userSignup.name}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, name: e.target.value })
                            }
                            className="w-full border-b border-gray-300 focus:border-black transition duration-300 bg-transparent py-2 outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={userSignup.email}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, email: e.target.value })
                            }
                            className="w-full border-b border-gray-300 focus:border-black transition duration-300 bg-transparent py-2 outline-none"
                        />
                    </div>

                    <div className="mb-8">
                        <input
                            type="password"
                            placeholder="Password"
                            value={userSignup.password}
                            onChange={(e) =>
                                setUserSignup({ ...userSignup, password: e.target.value })
                            }
                            className="w-full border-b border-gray-300 focus:border-black transition duration-300 bg-transparent py-2 outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={userSignupFunction}
                            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                        >
                            Signup
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Have an account?{" "}
                            <Link className="text-blue-500 font-medium" to={"/login"}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
