import React, { useState, useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import aolemoji from "../images/aolemoji.png";
import "../App.css";
import Boop from "./Boop";
import UserModal from "./UserModal";
import UsersList from "./UsersList";
import useSound from "use-sound";
import WindowsXpShutDown from "../sounds/WindowsXpShutDown.mp3";
import IM from "../sounds/IM.mp3";
import CreateRoom from "./CreateRoom";
import Lobby from "./Lobby";
import DoorClose from "../sounds/DoorClose.mp3";
import EmojiPicker from "emoji-picker-react";

const PrivateChat = (props) => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    // const { roomName } = useParams();
    const { user, setUser, socket } = useContext(UserContext);
    const [rooms, setRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [hostId, setHostId] = useState("");
    const [hostScreenName, setHostScreenName] = useState("");
    const [play] = useSound(DoorClose, { volume: 0.05 });
    const [play2] = useSound(IM, { volume: 0.1 });
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/rooms", { withCredentials: true })
            .then((res) => setRooms(res.data))
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/rooms/" + roomId, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("INFOBOMB", res);
                setRoomName(res.data.name);
                setHostId(res.data.hostId);
                setHostScreenName(res.data.hostScreenName);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users/" + user.id, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("user", res);
                setUser({ ...user, room: roomName });
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        socket.on("private_message_response", (data) => {
            console.log("Got your message");
            setMessages((prevState) => [...prevState, data]);
        });
        return () => setUser({ ...user, room: "" });
        // return () => setUser({ ...user, room: roomName });
    }, []);
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Sending private message");
        play2(IM);
        socket.emit("private_message", {
            user: user.screenName,
            room: roomName,
            message: currentMessage,
        });
        setCurrentMessage("");
    };
    const deleteChatRoom = (e) => {
        axios
            .delete(
                `http://localhost:8000/api/rooms/deleteChatRoom/${roomId}`,
                { withCredentials: true }
            )
            .then((res) => {
                alert(
                    "Chat room has been successfully deleted.  Sending you back to home."
                );
                console.log("Chat room has been deleted");
                removeFromDom(roomId);
                navigate(`/home/${user.id}`);
            })
            .catch((err) => console.log(err));
    };
    const removeFromDom = (roomId) => {
        setRooms(rooms.filter((r) => r._id !== roomId));
    };
    const doorClose = () => {
        play(DoorClose);
    };
    return (
        <>
            <div>
                <div className="h-auto ">
                    <nav className="flex justify-center items-center flex-col shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg fill-indigo-400 border-2 bg-blue-400">
                        <div className=" flex flex-row">
                            <Boop rotation={"5"} timing={"100"}>
                                <img
                                    src={aolemoji}
                                    className=" h-20 w-25"
                                    alt="aolemoji"
                                />
                            </Boop>
                            <div className="flex justify-center">
                                <h1 className="flex text-4xl content-center items-center font-extrabold text-white dark:text-white">
                                    <Boop rotation={"3"} timing={"100"}>
                                        SAIM - MESSENGER 👋
                                    </Boop>
                                </h1>
                            </div>
                            <mark className="flex flex-row justify-center items-center m-4 p-6 bg-blue-800 rounded-xl shadow-lg h-20 ">
                                <div className="flex justify-between w-auto p-4 pb-4">
                                    <h1
                                        style={{ fontSize: "1.5rem" }}
                                        className=" text-xl flex justify-center items-center font-extrabold text-white dark:text-white "
                                    >
                                        @ {user.screenName}
                                    </h1>
                                    <Boop rotation={"15"} timing={"100"}>
                                        <img
                                            src={aolemoji}
                                            alt="aolemoji"
                                            style={{
                                                height: "100px",
                                                width: "100px",
                                            }}
                                            className="flex justify-end"
                                        />
                                    </Boop>
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
                {/* The chat box itself */}
                <div
                    className="flex justify-center items-center m-auto mt-5 mb-5"
                    style={{ width: "900px" }}
                >
                    <div
                        className="flex flex-col border-1 rounded-xl border-black bg-gray-300"
                        style={{ height: "750px" }}
                    >
                        <h2 className=" rounded-t-lg text-3xl p-4 tracking-widest font-extrabold dark:text-white bg-blue-500 border-black border-2">
                            <div className="flex">
                                <div className="tracking-tighter text-blue-900">
                                    ROOM NAME: &nbsp; &nbsp;
                                </div>
                                <p>{roomName}</p>
                            </div>
                            <div className="flex">
                                <div className="tracking-tighter text-blue-900">
                                    HOST/CREATOR: &nbsp; &nbsp;
                                </div>
                                <p>{hostScreenName}</p>
                            </div>
                        </h2>

                        <div
                            className=""
                            style={{
                                minWidth:"1000px",
                                height: "300px",
                            }}
                        >
                            <div
                                className="border-2 whitespace-normal border-black overflow-auto p-2 m-4 bg-white"
                                id="messages"
                                //   ref={messagesRef}
                                style={{ maxHeight: "900px" }}
                            >
                                <div
                                    className="rt-body whitespace-normal m-2 card overflow-y-auto border-1 border-black"
                                    style={{
                                        height: "300px",
                                        overflow: "visible",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <div
                                        className="overflow-y-auto border-1 text-3xl whitespace-normal border-black m-4 overflow-x-hidden"
                                        style={{
                                            height: "300px",
                                            whiteSpace: "wrap",
                                        }}
                                    >
                                        {messages.map((m, i) => (
                                            <div
                                                className={`text-black rt-tr-group ${
                                                    i % 2 === 0
                                                        ? "bg-gray-200"
                                                        : "bg-white"
                                                }`}
                                                style={{
                                                    fontSize: "24px",
                                                    display: "flex",
                                                }}
                                                key={i}
                                            >
                                                <div
                                                    style={{
                                                        color: "red",
                                                        wordWrap: "break-word", // set word-wrap to break-word
                                                    }}
                                                    className="whitespace-normal font-extrabold text-black mr-4 text-xl "
                                                >
                                                    {m.user}:
                                                </div>
                                                <p
                                                    className=""
                                                    style={{
                                                        wordBreak: "break-all", // set word-break to break-all
                                                    }}
                                                >
                                                    {m.message}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6 m-2">
                                    <form id="chatEntry" onSubmit={sendMessage}>
                                        <input
                                            type="text"
                                            id="message"
                                            value={currentMessage}
                                            onChange={(e) =>
                                                setCurrentMessage(
                                                    e.target.value
                                                )
                                            }
                                            className=" form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        <div className="">
                                            <button className="m-2 relative text-lg group grid grid-col-1 content-center">
                                                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                                    <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                    <span className="relative m-2">
                                                        Send
                                                    </span>
                                                </span>
                                                <span
                                                    className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                                                    data-rounded="rounded-lg"
                                                ></span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Boop rotation={5} timing={200}>
                        <button
                            onClick={doorClose}
                            className="bg-green-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded-xl"
                        >
                            <Link
                                className="text-3xl mb-5"
                                to={`/home/${user.id}`}
                            >
                                Go Back Home
                            </Link>
                        </button>
                    </Boop>
                    <div className="">
                        {(() => {
                            return hostId == user.id ? (
                                <>
                                    <Boop rotation={5} timing={200}>
                                        <button
                                            onClick={() =>
                                                deleteChatRoom(roomId)
                                            }
                                            className="text-3xl m-2 hover:animate-pulse rounded-xl bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-2 border border-blue-700 rounded"
                                        >
                                            Delete
                                        </button>
                                    </Boop>
                                </>
                            ) : null;
                        })()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateChat;
