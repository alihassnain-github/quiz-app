"use client";

import { useState, FormEvent } from "react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Settings() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string>("edit-profile");

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isDisabled, setIsDisabled] = useState(true);
    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }

    function openMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function closeMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <main className="bg-slate-50 w-full min-h-screen h-full pe-4">
            <div onClick={closeMenu} className={isMenuOpen ? "transition-all w-full h-full fixed z-20 backdrop-blur-[10px] block" : "transition-all hidden w-full h-full fixed z-20 backdrop-blur-[5px]"}></div>
            <div className="flex relative h-full">
                <div className={isMenuOpen ? "transition-all border-r-2 h-screen w-64 fixed lg:left-0 left-0 bg-slate-50 z-30" : "transition-all border-r-2 h-screen w-64 absolute lg:left-0 left-[-100%] bg-slate-50 z-20"}>
                    <Button size="sm" radius="none" className="absolute top-2 start-4">
                        <Link href="home" className="flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg> Back</Link>
                    </Button>
                    <ul className="pb-4 pt-[60px]">
                        <li onClick={() => setActiveTab("edit-profile")} className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-edit-box-line"></i> Edit profile</li>
                        <li onClick={() => setActiveTab("change-password")} className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-lock-password-line"></i> Change password</li>
                        <li onClick={() => setActiveTab("switch-account")} className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-account-circle-line"></i> Switch account</li>
                        <li onClick={onOpen} className="py-3 cursor-pointer hover:bg-[#F31260] hover:text-white text-[#F31260] ps-4 transition"><i className="text-xl me-2 ri-delete-bin-5-line"></i> Delete account</li>
                    </ul>
                </div>
                <div className="absolute lg:left-[16em] left-0">
                    <div className="flex py-4 ms-4">
                        <i onClick={openMenu} className="ri-menu-line text-2xl me-4 cursor-pointer md:pt-1 lg:hidden block"></i>
                        <h1 className="md:text-4xl text-2xl font-semibold">Settings</h1>
                    </div>

                    {/* Edit profile UI */}

                    {activeTab === "edit-profile" && (
                        <form className="mx-4 w-full" onSubmit={submitHandler}>
                            <h2 className="text-lg font-medium py-4 text-gray-600">Edit Profile</h2>
                            <div className="relative w-64">
                                <Image
                                    width={200}
                                    height={200}
                                    src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                                    alt="NextUI Album Cover"
                                    className="rounded-full border-2 ms-7 z-10"
                                />
                                <label htmlFor="uploadImage" className="absolute top-[150px] start-[170px] z-10 rounded-full cursor-pointer grid place-items-center bg-blue-500 w-[40px] h-[40px]"><i className="ri-camera-line text-2xl text-white"></i></label>
                                <input type="file" id="uploadImage" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.value)} value={image} />
                            </div>
                            <div className="lg:my-8 mt-8 grid lg:grid-cols-2 gap-x-8">
                                <Input type="text" className="my-4 lg:w-80 w-80 md:w-96" label="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                <Input type="text" className="my-4 lg:w-80 w-80 md:w-96" label="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                            </div>
                            <div className="lg:my-8 grid lg:grid-cols-2 gap-x-8">
                                <Input type="email" className="my-4 lg:w-80 w-80 md:w-96" label="Email" readOnly />
                                <Input type="text" className="my-4 lg:w-80 w-80 md:w-96" label="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <Button radius="none" type="submit" isDisabled={isDisabled} color="primary" className="text-lg mt-8 mb-4">
                                Save
                            </Button>
                        </form>
                    )}

                    {/* Edit profile UI */}

                    {/* change password UI */}

                    {activeTab === "change-password" && (
                        <div className="mx-4">
                            <h2 className="text-lg font-medium py-4 text-gray-600">Change Password</h2>
                            <Input
                                className="lg:w-80 w-80 md:w-96"
                                label="Password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                            <p className="text-sm my-2 cursor-pointer hover:underline">forget password?</p>
                            <Button radius="none" type="submit" color="primary" className="text-lg mt-8 mb-4">
                                Contineu
                            </Button>
                        </div>
                    )}
                    {/* change password UI */}

                    {/* switch account UI */}

                    {activeTab === "switch-account" && (
                        <div className="mx-4">
                            <h2 className="text-lg font-medium py-4 text-gray-600">Switch Account</h2>
                            <Input
                                className="lg:w-80 w-80 md:w-96"
                                label="Password"
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />
                            <p className="text-sm my-2 cursor-pointer hover:underline">forget password?</p>
                            <Button radius="none" type="submit" color="primary" className="text-lg mt-8 mb-4">
                                Contineu
                            </Button>
                        </div>
                    )}

                    {/* switch account UI */}

                    {/* delete account UI */}

                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Delete account</ModalHeader>
                                    <ModalBody>
                                        <p>Are you sure you want to say goodbye ?</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Delete Account
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                    {/* delete account UI */}

                </div>
            </div>
        </main >
    )
}