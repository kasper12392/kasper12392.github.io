import React, {ChangeEvent, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faCube, faCaretDown, faCaretUp, faFolderTree} from "@fortawesome/free-solid-svg-icons";
import {faPaste, faImage} from "@fortawesome/free-regular-svg-icons";
import {Transition} from "@headlessui/react";

const Connecting = () => {

    // Versie dropdown
    const [isShowing, setIsShowing] = useState(false)
    const [selectedVersion, setSelectedVersion] = useState("v1")


    // Update collectionEdit - (onnodig complex voor hier maar handig voor later)
    const [collectionEdit, setCollectionEdit] = useState({ clientId: "", clientSecret: "" });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollectionEdit((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };


    // Postman download
    const determineHrefByFileName = (fileName: string, updateData: boolean) => {
        const collection = require('../resources/' + fileName);

        if (updateData) {
            collection.clientId = collectionEdit.clientId;
            collection.clientSecret = collectionEdit.clientSecret;
        }

        const json = JSON.stringify(collection, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        return URL.createObjectURL(blob);
    }


    // Paste knop
    const handlePaste = async (name: string) => {
        const value: string = await navigator.clipboard.readText();
        console.log("name: " + name);
        console.log("value: " + value);
        if (name === "clientId") {
            setCollectionEdit((prevState: any) => ({
                ...prevState,
                clientId: value
            }));
        }
        if (name === "clientSecret") {
            setCollectionEdit((prevState: any) => ({
                ...prevState,
                clientSecret: value
            }));
        }
    }

    const bleep = () => {
        console.log("bleep")
    }



    return (
        <div className="max-w-screen-lg mx-auto mt-16 text-gray-700 flex">

            <div className="space-y-12">

                <section>
                    <h1 className="text-5xl font-bold mb-6">Postman</h1>
                    <p className="mt-4">
                        Postman is an API platform for building and testing API functionality.

                        If you are new to Postman you can check out the
                        <a href="https://learning.postman.com/docs/getting-started/introduction/" target="_blank" rel="noopener noreferrer" className="bg-sky-100 px-1 ml-1 border-b-2 border-sky-200 hover:bg-sky-200 hover:border-sky-300">Postman Learning Center</a>.
                    </p>
                </section>

                <section>
                    <div className="flex mt-16">
                        <div className="grow mr-2">
                            <h1 className="text-3xl font-bold"><FontAwesomeIcon icon={faCube}/> Generate environment</h1>
                            <p className="bg-amber-100 px-1 w-fit mt-2">Last updated: 11-12-2022</p>
                            <br/>
                            <label>ClientId:</label>
                            <div className="flex">
                                <input className="w-2/3 border-2 p-1 text-sm outline-gray-300 rounded overflow-ellipsis "
                                       type="text"
                                       placeholder="Rd0QC4qH1lZFn0QOpKufLIDkbbrO3NQB12WYMCXP+rs="
                                       value={collectionEdit.clientId}
                                       onChange={handleChange}
                                       name="clientId"
                                />
                                {/*<button className="rounded px-1 border-2 text-red-600 border-red-600 ml-1 bg-red-100"><FontAwesomeIcon icon={faCircleExclamation}/></button>*/}
                                <button onClick={() => handlePaste("clientId")} className="rounded px-1 border-2 border-gray-300 ml-1 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800"><FontAwesomeIcon icon={faPaste}/></button>
                            </div>
                            <label>ClientSecret:</label>
                            <div className="flex">
                                <input className="w-2/3 border-2 p-1 text-sm outline-gray-300 rounded"
                                       type="text"
                                       placeholder="Rd0QC4qH1lZFn0QOpKufLIDkbbrO3NQB12WYMCXP+rs="
                                       value={collectionEdit.clientSecret}
                                       onChange={handleChange}
                                       name="clientSecret"
                                />
                                <button onClick={() => handlePaste("clientSecret")} className="rounded px-1 border-2 border-gray-300 ml-1 bg-gray-100 hover:bg-gray-200 hover:border-gray-400 hover:text-gray-800"><FontAwesomeIcon icon={faPaste}/></button>
                            </div>
                            <a href={determineHrefByFileName("postmantest2.json", true)} download="environment">
                                <button className="w-28 bg-orange-500 text-white font-bold rounded py-1 px-2 mt-2 text-base hover:bg-orange-600">Generate <FontAwesomeIcon icon={faDownload}/></button>
                            </a>
                        </div>

                        <div className="grow ml-2">
                            <h1 className="text-3xl font-bold"><FontAwesomeIcon icon={faFolderTree}/> Generate collection</h1>
                            <p className="bg-amber-100 px-1 w-fit mt-2">Last updated: 11-12-2022</p>
                            <br/>

                            <label>Version:</label>
                            <div className="relative w-28">
                                <button onClick={() => setIsShowing((isShowing) => !isShowing)} className="w-full rounded border-navbar border-2 hover:text-navbar py-0.5 shadow-lg">
                                    {selectedVersion} <FontAwesomeIcon icon={isShowing ? faCaretUp : faCaretDown}/>
                                </button>
                                <Transition show={isShowing} enter="transition-opacity duration-250" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-125" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <div className="absolute w-full mt-1 rounded shadow-lg hover:[&>*]:font-bold border-2 border-gray-100 text-base flex-col bg-gray-50" onClick={() => setIsShowing(false)}>
                                        {/*<button className="flex w-full hover:bg-gray-100 py-1 pr-2 justify-center" onClick={() => {setSelectedVersion("v3")}}>v3</button>*/}
                                        {/*<button className="flex w-full hover:bg-gray-100 py-1 pr-2 justify-center" onClick={() => {setSelectedVersion("v2")}}>v2</button>*/}
                                        <button className="flex w-full hover:bg-gray-100 py-1 pr-2 justify-center" onClick={() => {setSelectedVersion("v1")}}>v1</button>
                                    </div>
                                </Transition>
                            </div>
                            <a href={determineHrefByFileName("postmantest2.json", false)} download="environment">
                                <button className="w-28 bg-orange-500 text-white font-bold rounded py-1 px-2 mt-2 text-base hover:bg-orange-600">Generate <FontAwesomeIcon icon={faDownload}/></button>
                            </a>
                        </div>

                    </div>
                </section>

            </div>

        </div>
    );
};

export default Connecting;