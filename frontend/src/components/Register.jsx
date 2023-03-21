import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import man from "../images/aolemoji.png";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import Boop from "./Boop";
import aolemoji from "../images/aolemoji.png";
import CreatorModal from "./CreatorModal";
const Register = (props) => {
    const { setUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);

    const [state, setState] = useState({
        register: {
            screenName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const { register } = state;
    const handleRegInputs = (e) => {
        props.setAuthorized("");
        setState({
            ...state,
            register: { ...state.register, [e.target.name]: e.target.value },
        });
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log("register form");
        axios
            .post("http://localhost:8000/api/users/register", register, {
                withCredentials: true,
            })
            .then((res) => {
                setUser(res.data.user);

                setUser({
                    id: res.data.user.id,
                    screenName: res.data.user.screenName,
                    email: res.data.user.email,
                    room: "",
                });
                alert(
                    `Thanks for registering ${res.data.user.screenName}.  Please sign in to get started.`
                );
                console.log(
                    `Thanks for registering, ${res.data.user.screenName}.  Please log in to get started.`
                );
                navigate("/");
            })
            .catch((res) => {
                setErrors(res.response.data.errors);
                console.log(
                    "Printing list of errors",
                    res.response.data.errors
                );
            })
            .catch((res) => setErrors(res.response.data.errors));
    };

    return (
        <>
            <div className="Register">
                <div className="flex justify-center  text-center">
                    <Boop rotation={"2"} timing={"100"} className="flex">
                        <nav className="flex flex-col m-2 shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg fill-indigo-400 border-2 bg-blue-400">
                            <div className=" flex flex-row">
                                <Boop rotation={"5"} timing={"100"}>
                                    <img
                                        src={man}
                                        className=" h-20 w-25"
                                        alt="man"
                                    />
                                </Boop>
                                <div className="flex justify-center">
                                    <h1 className="flex text-4xl text-center content-center items-center font-extrabold text-white dark:text-white">
                                        <Boop rotation={"3"} timing={"100"}>
                                            SAIM - MESSENGER 👋
                                        </Boop>
                                    </h1>
                                </div>
                            </div>
                            <div className="">
                                <p className=" text-center text-gray-900 md:text-lg dark:text-gray-900">
                                    A space where millennials can chat and share
                                    their hilarious away messages
                                </p>
                            </div>
                        </nav>
                    </Boop>
                </div>
                <div className="grid grid-cols-1 content-center">
                    <Boop rotation={"3"} timing={"100"}>
                        <div className="items-center flexm-2">
                            <span className=" grid grid-cols-1  block max-w-lg items-center max-h-sm p-2 scale-90 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 mt-2 m-auto">
                                <div className="border-2  border-black rounded-lg bg-blue-700 h-auto max-w-76">
                                    <p className="p-2 text-center tracking-tighter font-extrabold text-white text-3xl">
                                        Do you remember AIM?
                                    </p>
                                    <div className="flex justify-center flex-row">
                                        <p className="font-extrabold text-6xl">
                                            "
                                        </p>
                                        <div>
                                            <Boop
                                                rotation={"20"}
                                                duration={"2000"}
                                                className=""
                                            >
                                                <img
                                                    src={aolemoji}
                                                    alt="aolemoji"
                                                    className="-mt-10 mb-10"
                                                    // style={{height: "200px"}}
                                                />
                                            </Boop>
                                        </div>
                                        <p className="font-extrabold text-6xl">
                                            "
                                        </p>
                                    </div>
                                    <p className="p-2 text-center font-extrabold tracking-tighter text-white text-3xl -mt-10">
                                        It's 'still' the SAIM-MESSENGER
                                    </p>
                                </div>
                                <hr />
                                <form
                                    className="text-black"
                                    onSubmit={handleRegistration}
                                >
                                    {/* {errors}
                                {errors.length > 0 &&
                                    errors.map((error, i) => (
                                        <>
                                            <p
                                                className=" text-red-600"
                                                key={i}
                                            >
                                                {error}
                                            </p>
                                        </>
                                    ))} */}
                                    <div className="text-red-900">
                                        {errors.screenName && (
                                            <p className="accent">
                                                {errors.screenName.message}
                                            </p>
                                        )}
                                        {errors.email && (
                                            <p className="accent">
                                                {errors.email.message}
                                            </p>
                                        )}
                                        {errors.password && (
                                            <p className="accent">
                                                {errors.password.message}
                                            </p>
                                        )}
                                        {errors.confirmPassword && (
                                            <p className="accent">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-6 mt-0">
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-black">
                                                eMail!
                                            </span>
                                            <input
                                                onChange={handleRegInputs}
                                                type="text"
                                                name="email"
                                                className="mt-1 text-black px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                placeholder="you@example.com"
                                            />
                                        </label>
                                    </div>
                                    <div className="mb-6 mt-0">
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 flex text-sm font-medium text-black">
                                                ScreenName!
                                            </span>
                                            <input
                                                onChange={handleRegInputs}
                                                type="text"
                                                name="screenName"
                                                className="mt-1 px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                placeholder="Choose Your ScreenName!"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-black">
                                                PaSsWoRd:
                                            </span>
                                            <input
                                                onChange={handleRegInputs}
                                                type="password"
                                                name="password"
                                                className="mt-1 px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                placeholder="Create Password"
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-black mt-2">
                                                CoNFiRmPassW0rd:
                                            </span>
                                            <input
                                                onChange={handleRegInputs}
                                                type="password"
                                                name="confirmPassword"
                                                className="mt-1 px-3 py-2 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                                placeholder="Confirm Password"
                                            />
                                        </label>
                                    </div>
                                    <div className="inline-flex m-auto grid grid-cols-2 content-center">
                                        <button
                                            type="submit"
                                            className="m-8 flex"
                                        >
                                            <a
                                                href="#_"
                                                className="relative px-6 py-3 font-bold text-black group"
                                                type="submit"
                                            >
                                                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-blue-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                                <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
                                                <span className="relative">
                                                    Sign Up
                                                </span>
                                            </a>
                                        </button>
                                        <Boop rotation={"3"} timing={"100"}>
                                            <button className=" whitespace-normaltext-m tracking-tighter m-auto text-blue-700  cursor-pointer text-center">
                                                <Link
                                                    className="hover:underline cursor-pointer"
                                                    to="/"
                                                >
                                                    Already have an account?
                                                    Login here!
                                                </Link>
                                            </button>
                                        </Boop>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col items-center justify-center">
                                        <button
                                            className="px-4 py-2 text-blue-900 100rounded-md hover:underline"
                                            type="button"
                                            onClick={() => {
                                                setShowModal(true);
                                            }}
                                        >
                                            Creator of SAIM - Messenger
                                        </button>
                                        {showModal && (
                                            <CreatorModal
                                                setOpenModal={setShowModal}
                                            />
                                        )}
                                    </div>
                                </form>
                            </span>
                        </div>
                    </Boop>
                </div>
            </div>
        </>
    );
};

export default Register;
