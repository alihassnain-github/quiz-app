"use client";

import Link from "next/link";
import { signupWithEmailPassword, sendEmail } from "@/firebase/firebaseauth";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { FormEvent, useState } from "react";

export default function Signup() {

    const [isLoading, setisLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [generalError, setGeneralError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function submitHandler(e: FormEvent) {

        setEmailError("");
        setPasswordError("");
        setGeneralError("");

        e.preventDefault();
        setisLoading(true);
        signupWithEmailPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (!user.emailVerified) {
                    sendEmail()?.then(() => {
                        setisLoading(false);
                    }).catch((error) => {
                        setGeneralError("Something went wrong please try again.");
                        setisLoading(false);
                    })
                }
            })
            .catch((error) => {
                if (error.code === "auth/invalid-email") {
                    setEmailError("Invalid email. Please enter a valid email.");
                }
                else if (error.code === "auth/weak-password") {
                    setPasswordError("Password is to weak. Please enter a strong password.");
                }
                else if (error.code === "auth/missing-email") {
                    setEmailError("Please enter your email.");
                }
                else if (error.code === "auth/missing-password") {
                    setPasswordError("Please enter your password.");
                }
                else if (error.code === "auth/network-request-failed") {
                    setGeneralError("Network error. Please check your connection.");
                }
                else {
                    setGeneralError("Something went wrong please try again.");
                }

                setisLoading(false);

                setTimeout(() => {
                    setGeneralError('');
                }, 5000);

            });
    }

    return (
        <div className="h-screen w-full grid place-items-center p-4 relative">
            {
                generalError && (
                    <div className="mx-4 flex items-end absolute z-20 border-2 border-danger-400 rounded px-4 py-3 top-4">
                        <i className="ri-error-warning-line me-3 text-xl text-danger-400"></i>
                        <p>{generalError}</p>
                    </div>
                )
            }
            <form className="md:w-2/5 sm:w-1/2 w-full border-2 rounded px-4 py-8" onSubmit={submitHandler}>
                <h1 className="sm:text-2xl md:text-4xl text-2xl font-semibold mb-[60px] text-center">Create an account</h1>
                <div className="my-4">
                    <Input type="email" required label="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <small className={emailError ? "text-danger-400 ms-1" : "text-danger-400 ms-1 hidden"}>{emailError}</small>
                </div>
                <div className="my-4">
                    <Input
                        required
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
                    <small className={passwordError ? "text-danger-400 ms-1" : "text-danger-400 ms-1 hidden"}>{passwordError}</small>
                </div>

                <Button isLoading={isLoading} radius="none" type="submit" color="primary" className="mt-8 w-48 text-lg">
                    Create Account
                </Button>
                <p className="text-sm text-center mt-8">Already have an account? <Link href="/login"><span className="text-blue-500 font-semibold cursor-pointer">Login</span></Link></p>
            </form>
        </div>
    )
}