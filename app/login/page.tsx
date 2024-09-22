"use client";

import { loginWithEmailPassword } from "@/firebase/firebaseauth";
import Link from "next/link";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { FormEvent, useState } from "react";

export default function Login() {

    const [isLoading, setisLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        setisLoading(true);

        loginWithEmailPassword(email, password)
            .then((userCredential) => {
                setisLoading(false);
                setEmailError("");
                setGeneralError("");
            })
            .catch((error) => {

                if (error.code === 'auth/invalid-email') {
                    setEmailError('Invalid email address. Please enter a valid email.');
                    setGeneralError('');
                } else if (error.code === 'auth/invalid-credential') {
                    setGeneralError('auth/invalid-credential');
                    setEmailError('');
                }
                else if (error.code === 'auth/network-request-failed') {
                    setGeneralError('auth/network-request-failed');
                    setEmailError('');
                }
                else {
                    setGeneralError('login-failed');
                    setEmailError('');
                }

                setisLoading(false);

                setTimeout(() => {
                    setGeneralError('');
                }, 5000);

            });

        setEmail("");
        setPassword("");
    }

    return (
        <div className="h-screen w-full grid place-items-center p-4 relative">
            {
                generalError === "auth/invalid-credential" && (
                    <div className="mx-4 flex items-end absolute z-20 border-2 border-danger-400 rounded px-4 py-3 top-4">
                        <i className="ri-error-warning-line me-3 text-xl text-danger-400"></i>
                        <p>Invalid email or password.</p>
                    </div>
                )
            }
            {
                generalError === "auth/network-request-failed" && (
                    <div className="mx-4 flex items-end absolute z-20 border-2 border-danger-400 rounded px-4 py-3 top-4">
                        <i className="ri-signal-wifi-error-fill me-3 text-xl text-danger-400"></i>
                        <p>Network error. Please check your connection.</p>
                    </div>
                )
            }
            {
                generalError === "login-failed" && (
                    <div className="mx-4 flex items-end absolute z-20 border-2 border-danger-400 rounded px-4 py-3 top-4">
                        <i className="ri-close-circle-line me-3 text-xl text-danger-400"></i>
                        <p>Login failed. Please try again.</p>
                    </div>
                )
            }

            <form className="md:w-2/5 sm:w-1/2 w-full border-2 rounded px-4 py-8" onSubmit={submitHandler}>
                <h1 className="sm:text-2xl md:text-4xl text-2xl font-semibold mb-[60px] text-center">Login your account</h1>
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
                    <p className="text-sm my-2 cursor-pointer hover:underline">forget password?</p>
                </div>

                <Button isLoading={isLoading} type="submit" radius="none" color="primary" className="mt-8 w-40 text-lg">
                    Login
                </Button>
                <p className="text-sm text-center mt-8">Don't have an account? <Link href="signup"><span className="text-blue-500 font-semibold cursor-pointer">Signup</span></Link></p>
            </form>
        </div>
    )
}