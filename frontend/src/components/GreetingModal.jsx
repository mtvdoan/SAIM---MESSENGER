import React, {useState} from "react";
import Boop from "./Boop";
import gitHub from "../images/gitHub.png";
import linkedin from "../images/linkedIn.png";
const GreetingModal = (props) => {
    const [openModal, setOpenModal] = useState(true);
    return (
        <>
            <div className="GreetingModal">
                <div className="fixed inset-0 z-10 overflow-y-auto items-center text-center">
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
                            <div className="mt-3 sm:flex">
                                <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    <h4 className="text-3xl flex p-2 justify-center text-center font-extrabold text-gray-800">
                                        <div>Welcome 😊!</div>
                                        <div>
                                            <Boop
                                                rotation={"20"}
                                                duration={"200"}
                                            >
                                                👋
                                            </Boop>
                                        </div>
                                    </h4>
                                    <p className="mt-2 text-[24px] leading-relaxed text-gray-500">
                                        <p className="font-bold text-2xl text-center justify-center flex">
                                            Creator:
                                            <p className="ml-4">Monica Doan</p>
                                        </p>
                                        <hr />
                                        <p className="text-center text-3xl mt-2 tracking-tighter text-blue-700 font-extrabold">
                                            Let's Connect!
                                        </p>
                                    </p>
                                    <div className="items-center mt-3 sm:flex">
                                        <button
                                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                            onClick={() => setOpenModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default GreetingModal;
