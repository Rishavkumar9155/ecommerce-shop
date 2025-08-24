/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FireBase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Login = () => {
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginFunction = async () => {
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required");
            return;
        }

        try {
            const users = await signInWithEmailAndPassword(
                auth,
                userLogin.email,
                userLogin.password
            );

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where("uid", "==", users?.user?.uid)
                );

                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => (user = doc.data()));

                    localStorage.setItem("users", JSON.stringify(user));

                    setUserLogin({ email: "", password: "" });

                    toast.success("Login Successfully");

                    if (user.role === "user") {
                        navigate("/userdashboard");
                    } else {
                        navigate("/admin");
                    }
                });

                return () => data;
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong while fetching user data");
            }
        } catch (error) {
            console.log(error);
            toast.error("Login Failed");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen relative">
            {/* Left: Login Form */}
                                 <a className=" text-black bg-black text-white absolute top-[10%] flex items-center justify-start  uppercase w-[30%] left-1  h-[3vh] pl-2 " href="/">home</a>
           <div className="w-full lg:w-1/2 h-full flex justify-center items-center bg-white text-black px-8">

                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold">Login</h2>
                    </div>

                    <div className="mb-6">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={userLogin.email}
                            onChange={(e) =>
                                setUserLogin({ ...userLogin, email: e.target.value })
                            }
                            className="w-full border-b border-gray-300 focus:border-black transition duration-300 bg-transparent py-2 outline-none"
                        />
                    </div>

                    <div className="mb-8">
                        <input
                            type="password"
                            placeholder="Password"
                            value={userLogin.password}
                            onChange={(e) =>
                                setUserLogin({ ...userLogin, password: e.target.value })
                            }
                            className="w-full border-b border-gray-300 focus:border-black transition duration-300 bg-transparent py-2 outline-none"
                        />
                    </div>

                    <div className="mb-5">
                        <button
                            type="button"
                            onClick={userLoginFunction}
                            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <p>
                            Don't have an account?{" "}
                            <Link className="text-blue-500 font-medium" to={"/signup"}>
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right: Video Section */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-black">
                <video
                    src="https://ik.imagekit.io/brprnjytw/videoplayback%20(1)%20(online-video-cutter.com).mp4?tr=orig&updatedAt=1755965160469"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;
