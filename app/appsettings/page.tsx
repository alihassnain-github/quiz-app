"use client";

import { useState } from "react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export default function Settings() {

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <main className="bg-slate-50 w-full min-h-screen h-full pe-4">
            <div className="flex">
                <div className="border-r-2 h-screen w-64">
                    <Button size="sm" radius="none" className="fixed top-2 start-4">
                        <Link href="home" className="flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg> Back</Link>
                    </Button>
                    <ul className="pb-4 pt-[60px]">
                        <li className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-edit-box-line"></i> Edit profile</li>
                        <li className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-lock-password-line"></i> Change password</li>
                        <li className="py-3 cursor-pointer ps-4 hover:bg-slate-200 transition"><i className="text-xl me-2 ri-account-circle-line"></i> Switch account</li>
                        <li className="py-3 cursor-pointer hover:bg-[#F31260] hover:text-white text-[#F31260] ps-4 transition"><i className="text-xl me-2 ri-delete-bin-5-line"></i> Delete account</li>
                    </ul>
                </div>
                <div>
                    <h1 className="sm:text-2xl md:text-4xl text-2xl font-semibold py-4 ms-4">Settings</h1>

                    {/* change password UI */}
                    {/* <div className="mx-4">
                        <h2 className="text-lg font-medium py-4 text-gray-600">Change Password</h2>
                        <Input
                            className="w-96"
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
                    </div> */}
                    {/* change password UI */}

                </div>
            </div>
        </main>
    )
}