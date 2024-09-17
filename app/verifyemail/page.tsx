"use client";

import { userData } from "@/context/authcontext";
import Image from "next/image";

export default function VerifyEmail() {

    const { user } = userData()!;

    return (
        <div className="w-full h-screen bg-slate-50 grid place-items-center px-4">
            <div className="border-2 rounded p-4 lg:w-1/3 md:w-1/2 w-full">
                <Image
                    className="block mx-auto"
                    src="/images/email.png"
                    alt="mail image"
                    width={500}
                    height={500}
                />
                <h1 className="text-center md:text-4xl text-2xl my-4">Email Confirmation</h1>
                <p className="w-full text-center mx-auto">We have sent email to <span className="text-blue-600">{user?.email}</span> confirm the validity of our email address. After receiving the email follow the link provided to complete your registration.</p>
                <hr className="my-8" />
            </div>
        </div>
    )
}