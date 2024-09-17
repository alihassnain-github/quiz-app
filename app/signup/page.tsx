"use client";

import Link from "next/link";
import { signupWithEmailPassword } from "@/firebase/firebaseauth";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { FormEvent, useState } from "react";

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    function submitHandler(e: FormEvent) {
        e.preventDefault();
        signupWithEmailPassword(email, password);
        setEmail("");
        setPassword("");
    }

    return (
        <div className="h-screen w-full grid place-items-center p-4">
            <form className="md:w-2/5 sm:w-1/2 w-full border-2 rounded px-4 py-8" onSubmit={submitHandler}>
                <h1 className="sm:text-2xl md:text-4xl text-2xl font-semibold mb-[60px] text-center">Create an account</h1>
                <div className="my-4">
                    <Input type="email" label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="my-4">
                    <Input
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <Button radius="none" type="submit" color="primary" className="mt-8 w-48 text-lg">
                    Create Account
                </Button>
                <p className="text-sm text-center mt-8">Already have an account? <Link href="/login"><span className="text-blue-500 font-semibold cursor-pointer">Login</span></Link></p>
            </form>
        </div>
    )
}