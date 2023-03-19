import { UserContext } from "../context/UserContext";
import React, { useState, useEffect, useContext } from "react";
import Chat from "./Home";
import logo1 from "../images/logo1.png";
import aolemoji from "../images/aolemoji.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import LikeButton from "./LikeButton";
import ViewAwayMesssageModal from "./ViewAwayMessageModal";
import UpdateAwayMessageModal from "./UpdateAwayMessageModal";
import CreateAwayMessage from "./CreateAwayMessage";
import useSound from "use-sound";
import WindowsXpShutDown from "../sounds/WindowsXpShutDown.mp3";

import Boop from "./Boop";
const AwayMessagesList = (props) => {
    const id = useParams();
    const [awayMessage, setAwayMessage] = useState("");
    const [play] = useSound(WindowsXpShutDown);
    const [awayMessageLabel, setAwayMessageLabel] = useState("");
    const [awayMessageCreator, setAwayMessageCreator] = useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [awayMessagesList, setAwayMessagesList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const { user, setUser, socket } = useContext(UserContext);
    const currentUserId = user["id"];
    const navigate = useNavigate();
    useEffect(() => {
        if (user.id === 0) {
            props.setAuthorized("You have to be logged in to view this page");
            alert("You need to be logged in to view this page");
            console.log("testing unauth");
            navigate("/");
        }
    }, []);
    const creator =
        awayMessagesList.length > 0 &&
        awayMessagesList.map(
            (awayMessage, index) => awayMessage.awayMessageCreator
        );
    const userScreenName = user["screenName"];
    const handleLogOutClick = () => {
        axios
            .get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
            })
            .then((res) => {
                console.log("Logged out!");
                localStorage.clear();
                socket.disconnect();
                setUser(null);
                alert(`Logging ${user.screenName} out. Bye!`);
                navigate("/");
                window.location.reload();
            });
        play(WindowsXpShutDown);
    };
    const deleteAwayMessage = (awayMessageId) => {
        axios
            .delete("http://localhost:8000/api/awayMessages/" + awayMessageId, {
                withCredentials: true,
            })
            .then(() => {
                console.log("Successfully deleted away message from backend");
                alert(`Away message has been deleted`);
                removeFromDom(awayMessageId);
                navigate("/home/:id");
            })
            .catch((err) =>
                console.log(
                    "Something went wrong trying to delete the away message",
                    err
                )
            );
    };

    const removeFromDom = (awayMessageId) => {
        setAwayMessagesList(
            awayMessagesList.filter((a) => a._id !== awayMessageId)
        );
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/all", {
                withCredentials: true,
            })
            .then((response) =>
                setAwayMessagesList(
                    response.data,
                    response.data.awayMessageCreator,
                    console.log("All Away Messages:", response.data)
                )
            )
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/", { withCredentials: true })
            .then((response) =>
                setUsersList(
                    response.data,
                    response.data.screenName,
                    console.log("All users:", response.data)
                )
            )
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/awayMessages/all", {
                withCredentials: true,
            })
            .then((response) =>
                setAwayMessagesList(
                    response.data,
                    response.data.awayMessageCreator,
                    console.log("All Away Messages:", response.data)
                )
            )
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .post(
                "http://localhost:8000/api/awayMessages/",
                { withCredentials: true },
                {
                    awayMessageLabel,
                    awayMessageCreator: userScreenName,
                    awayMessage,
                }
            )
            .then((res) => {
                setAwayMessage(res.data);
                console.log("Creation successful on backend", res.data);
                alert("An Away Message has been successfully created.");
            })

            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="AwayMessages">
                <div className="">
                    <nav className="flex flex-col justify-center items-center m-2 shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg fill-indigo-400 border-2 bg-blue-400">
                        <div className=" flex flex-row">
                            <Boop rotation={"5"} timing={"100"}>
                                <img
                                    src={aolemoji}
                                    className=" h-20 w-25"
                                    alt="aolemoji"
                                />
                            </Boop>
                            <div className="flex flex-row justify-center">
                                <h1 className="flex text-4xl items-center font-extrabold text-white dark:text-white">
                                    <Boop rotation={"3"} timing={"100"}>
                                        SAIM - MESSENGER 👋
                                    </Boop>
                                </h1>
                            </div>
                            <mark className="flex flex-row justify-center m-4 p-6 bg-blue-800 rounded-xl shadow-lg h-20 w-54">
                                <div className="flex flex-row justify-center items-center w-54 p-4 pb-4">
                                    <h1
                                        style={{ fontSize: "1.5rem" }}
                                        className=" text-xl flex justify-center items-center font-extrabold text-white dark:text-white "
                                    >
                                        @ {user.screenName}
                                    </h1>
                                    <div>
                                        <Boop rotation={"15"} timing={"100"}>
                                            <img
                                                src={aolemoji}
                                                alt="aolemoji"
                                                style={{
                                                    height: "100px",
                                                    width: "100px",
                                                }}
                                                className=""
                                            />
                                        </Boop>
                                    </div>
                                </div>
                            </mark>
                        </div>
                        <div className="">
                            <p className=" text-gray-900 md:text-lg dark:text-gray-900">
                                A space where millennials can chat and share
                                their hilarious away messages
                            </p>
                        </div>
                    </nav>{" "}
                </div>
                <div className=" text-center justify-center content-center m-auto inline">
                    <svg
                        aria-hidden="true"
                        className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                            fill="currentColor"
                        />
                    </svg>

                    <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
                        <span>🤔</span>
                        Remember
                        <mark className="px-2 text-black bg-blue-600 rounded dark:bg-yellow-400 m-6">
                            Away 💨
                        </mark>
                        Messages?"
                    </h1>
                </div>
                <div className="p-4">
                    <div
                        className="flex flex-col rounded-lg shadow-2xl justify-center items-center"
                        style={{ width: "auto" }}
                    >
                        <div className="flex flex-col border-1 border-black bg-gray-300 m-2 rounded-lg">
                            <div
                                className="text-xl h-12 p-4 rounded-lg font-extrabold dark:text-white bg-blue-500 border-black border-2"
                                style={{ width: "auto" }}
                            ></div>
                            <div className="">
                                <div
                                    className="border-2 whitespace-normal border-black overflow-auto p-2 m-4 bg-white"
                                    id="messages"
                                    style={{ maxHeight: "900px" }}
                                >
                                    <div className="rt-body flex whitespace-normal m-2 card overflow-y-auto border-1 border-black">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table className="m-4 text-xl text-center bg-white text-black">
                                                <thead className="text-3xl text-center bg-white text-black">
                                                    <tr className="">
                                                        <th scope="col">
                                                            Away Message
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="w-48"
                                                        >
                                                            Creator
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="w-44 whitespace-nowrap"
                                                        >
                                                            Likes
                                                        </th>
                                                        <th
                                                            scope="col0"
                                                            className=" w-54 items-center"
                                                        >
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {awayMessagesList.length >
                                                        0 &&
                                                        awayMessagesList.map(
                                                            (
                                                                awayMessage,
                                                                index
                                                            ) => (
                                                                <tr
                                                                    key={
                                                                        awayMessage.id
                                                                    }
                                                                    className="bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-blue-300"
                                                                >
                                                                    <ViewAwayMesssageModal
                                                                        label={
                                                                            awayMessage.awayMessageLabel
                                                                        }
                                                                        creator={
                                                                            awayMessage.awayMessageCreator
                                                                        }
                                                                        message={
                                                                            awayMessage.awayMessage
                                                                        }
                                                                        id={
                                                                            awayMessage._id
                                                                        }
                                                                    />
                                                                    <td className="">
                                                                        {
                                                                            awayMessage.awayMessageCreator
                                                                        }
                                                                    </td>
                                                                    <td
                                                                        className=""
                                                                        style={{}}
                                                                    >
                                                                        <LikeButton />
                                                                    </td>
                                                                    <td className="flex flex-row m-4 items-center justify-center">
                                                                        {(() => {
                                                                            return awayMessage.awayMessageCreator ==
                                                                                userScreenName ? (
                                                                                <>
                                                                                    <UpdateAwayMessageModal
                                                                                        label={
                                                                                            awayMessage.awayMessageLabel
                                                                                        }
                                                                                        creator={
                                                                                            awayMessage.awayMessageCreator
                                                                                        }
                                                                                        message={
                                                                                            awayMessage.awayMessage
                                                                                        }
                                                                                        id={
                                                                                            awayMessage._id
                                                                                        }
                                                                                        setAwayMessagesList={
                                                                                            setAwayMessagesList
                                                                                        }
                                                                                        awayMessageList={
                                                                                            awayMessagesList
                                                                                        }
                                                                                    />

                                                                                    <Boop
                                                                                        rotation={
                                                                                            5
                                                                                        }
                                                                                        timing={
                                                                                            200
                                                                                        }
                                                                                    >
                                                                                        <button
                                                                                            onClick={() =>
                                                                                                deleteAwayMessage(
                                                                                                    awayMessage._id
                                                                                                )
                                                                                            }
                                                                                            className="bg-red-400 hover:bg-red-900 hover:animate-pulse shadow-lg text-white font-bold py-2 px-2 border border-blue-700 rounded"
                                                                                        >
                                                                                            Delete
                                                                                        </button>
                                                                                    </Boop>
                                                                                </>
                                                                            ) : null;
                                                                        })()}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}{" "}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <CreateAwayMessage />
                            <div className="m-auto">
                                <Boop rotation={"5"} timing={"200"}>
                                    <button className="p-2 bg-yellow-700 rounded-2xl hover:bg-yellow-900 text-black text-5xl font-extrabold">
                                        <Link to={`/home/${currentUserId}`}>
                                            Go Back
                                        </Link>
                                    </button>
                                </Boop>
                            </div>
                            <div className="m-auto p-4">
                                <a
                                    href
                                    onClick={handleLogOutClick}
                                    className=" cursor-pointer relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
                                >
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-center text-2xl font-extrabold text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                        Log Out
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AwayMessagesList;
