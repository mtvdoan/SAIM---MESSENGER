import React, { useState, useContext, useEffect } from "react";
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
import peanutButterJellyTime from "../images/peanutButterJellyTime.gif";
// import ConfettiExplosion from 'react-confetti-explosion';
import Confetti from "./Confetti";

const Celebrate = (props) => {
    const [isExploding, setIsExploding] = useState(false);
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
            <div className="Celebrate">
                <div className="h-auto flex justify-center">
                    <nav className="flex flex-col m-2 shadow-lg border-gray-200 px-2 sm:px-4 py-2.5 rounded-lg fill-indigo-400 border-2 bg-blue-400">
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
                        <div className="text-center">
                            <p className=" text-gray-900 md:text-lg dark:text-gray-900">
                                A space where millennials can chat and share
                                their hilarious away messages
                            </p>
                        </div>
                    </nav>{" "}
                </div>
                {/* The chat box itself */}
                <div
                    className="rounded-xl mt-0 m-auto shadow-2xl text-xlp-2 flex justify-center"
                    style={{ width: "auto" }}
                >
                    <div
                        className="flex flex-col border-1 rounded-xl border-black bg-gray-300"
                        style={{ width: "auto", height: "675px" }}
                    >
                        <h2
                            className=" rounded-t-lg text-3xl p-4 tracking-widest font-extrabold dark:text-white bg-blue-500 border-black border-2"
                            style={{ width: "auto" }}
                        >
                            <div className="text-center">
                                <div className="tracking-tighter text-center text-blue-900">
                                    W00T! You created a chat room! LET'S DANCE!
                                </div>
                            </div>
                        </h2>
                        <div
                            className=""
                            style={{
                                width: "auto",
                                height: "300px",
                            }}
                        >
                            <div
                                className="border-2 whitespace-normal border-black overflow-auto p-2 m-4 bg-white"
                                id="messages"
                                style={{ maxHeight: "900px" }}
                            >
                                <div
                                    className="rt-body whitespace-normal m-2 card flex justify-center items-center overflow-y-auto border-1 border-black"
                                    style={{
                                        width: "auto",
                                        height: "500px",
                                        overflow: "visible",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    <Boop rotation={"15"} duration={"200"}>
                                        <img
                                            src={peanutButterJellyTime}
                                            alt="peanutButterJellyTime"
                                            className="m-4 p-4"
                                        />
                                    </Boop>
                                    <Confetti />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-evenly m-2">
                    <Boop rotation={5} timing={200}>
                        <button
                            onClick={doorClose}
                            className="bg-green-500 rounded-xl hover:bg-blue-700 text-white font-bold py-2 px-2 border border-blue-700 rounded"
                        >
                            <Link className="text-3xl" to={`/home/${user.id}`}>
                                Go Back Home
                            </Link>
                        </button>
                    </Boop>
                </div>
            </div>
        </>
    );
};

export default Celebrate;
