"use client";

import { userData } from "@/context/authcontext";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { sendEmail } from "@/firebase/firebaseauth";

export default function VerifyEmail() {

    const [isLoading, setisLoading] = useState(false);
    const [generalError, setGeneralError] = useState("");
    const [sendEmailCount, setSendEmailCount] = useState(0);
    function resendEmail() {
        setGeneralError("");
        setisLoading(true);
        sendEmail()?.then(() => {
            setSendEmailCount(sendEmailCount + 1);
            setisLoading(false);
        })
            .catch((error) => {

                setGeneralError("Something went wrong. Please check your internet connection or try again.");
                setisLoading(false);
                setTimeout(() => {
                    setGeneralError('');
                }, 5000);
            })
    }
    const { user } = userData()!;

    return (
        <div className="w-full h-screen bg-slate-50 grid place-items-center px-4 relative">
            {
                generalError && (
                    <div className="mx-4 flex items-end absolute z-20 border-2 border-danger-400 rounded px-4 py-3 top-4">
                        <i className="ri-error-warning-line me-3 text-xl text-danger-400"></i>
                        <p>{generalError}</p>
                    </div>
                )
            }
            <div className="border-2 rounded p-4 lg:w-1/3 md:w-1/2 w-full">
                <svg fill="#F31260" className="block mx-auto" width="100px" height="100px" viewBox="0 0 512 512" id="_x30_1" version="1.1" xmlns="http://www.w3.org/2000/svg">

                    <g>

                        <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M412,353.5   c0,20.193-16.37,36.562-36.562,36.562H136.562c-20.193,0-36.562-16.37-36.562-36.562v-195c0-20.193,16.37-36.562,36.562-36.562   h238.875c20.193,0,36.562,16.37,36.562,36.562V353.5z" />

                        <path d="M334.463,166.703L256,212.004l-78.463-45.301c-8.744-5.048-19.924-2.052-24.973,6.691   c-5.048,8.744-2.052,19.924,6.691,24.973l87.604,50.578l0.001-0.002c2.777,1.6,5.936,2.443,9.139,2.448   c3.204-0.004,6.363-0.848,9.139-2.448l0.001,0.002l87.604-50.578c8.744-5.048,11.74-16.229,6.691-24.973   C354.388,164.651,343.207,161.655,334.463,166.703z" />

                    </g>

                </svg>
                <h1 className="text-center md:text-4xl text-2xl my-4">Email Confirmation</h1>
                <p className="w-full text-center mx-auto">Almost there! We've sent a verification email to <span className="text-[#F31260]">{user?.email}</span>. You need to verify your email to proceed further.</p>
                <div className="flex justify-center">
                    <Button onClick={resendEmail} isLoading={isLoading} size="sm" radius="full" className={sendEmailCount ? "bg-[#F31260] text-white hidden" : "text-center mt-4 bg-[#F31260] text-white"}>
                        Resend email
                    </Button>
                </div>
            </div>
        </div>
    )
}