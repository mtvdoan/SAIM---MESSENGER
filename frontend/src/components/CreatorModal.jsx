import React from "react";
import Boop from "./Boop";
import gitHub from "../images/gitHub.png";
import linkedin from "../images/linkedIn.png";
export default function CreatorModal({ setOpenModal }) {
    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={() => setOpenModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                        <div className="mt-3 sm:flex">
                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <h4 className="text-3xl flex p-2 font-extrabold text-gray-800">
                                    <div>Hi there!</div>
                                    <div>
                                        <Boop rotation={"15"} duration={"200"}>
                                            👋
                                        </Boop>
                                    </div>
                                </h4>
                                <p className="mt-2 text-[24px] leading-relaxed text-gray-500">
                                    <p className="font-bold text-2xl flex">
                                        Creator:
                                        <p className="ml-4">Monica Doan</p>
                                    </p>
                                    <hr />
                                    <p className="text-center text-3xl mt-2 tracking-tighter text-blue-700 font-extrabold">
                                        Let's Connect!
                                    </p>
                                    <p className="font-bold text-2xl">
                                        <Boop rotation={"15"} duration={"200"}>
                                            <a
                                                className="hover:underline cursor-pointer"
                                                href="https://github.com/mtvdoan/SAIM-MESSENGER"
                                            >
                                                <img
                                                    className=" h-24 w-24"
                                                    src={gitHub}
                                                    alt="gitHub"
                                                />
                                            </a>
                                        </Boop>

                                            <Boop rotation={"15"} duration={"200"}>
                                      <a
                                            className="hover:underline cursor-pointer"
                                            href="https://www.linkedin.com/in/monica-tv-doan/"
                                            >
                                                <img
                                                    className=" h-24 w-24"
                                                    src={linkedin}
                                                    alt="linkedin"
                                                />
                                            </a>
                                        </Boop>
                                       
                                        

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
        </>
    );
}
