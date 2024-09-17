"use client";

import Link from "next/link";
import { Image, Input, Button } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export default function Profile() {

    const [isDisabled, setIsDisabled] = useState(true);
    const [image, setImage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    function submitHandler(e: FormEvent) {
        e.preventDefault();
    }


    return (
        <main className="w-full min-h-screen h-full bg-slate-50 px-4 grid place-items-center relative">
            <Button size="sm" radius="none" className="absolute top-2 start-4">
                <Link href="home" className="flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg> Back</Link>
            </Button>
            <form className="lg:w-2/3 mx-auto w-full" onSubmit={submitHandler}>
                <h1 className="sm:text-2xl md:text-4xl text-2xl font-semibold text-center py-4">Edit Profile</h1>
                <div className="relative mx-auto w-64">
                    <Image
                        width={200}
                        height={200}
                        src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                        alt="NextUI Album Cover"
                        className="rounded-full border-2 ms-7"
                    />
                    <label htmlFor="uploadImage" className="absolute top-[150px] start-[170px] z-10 rounded-full cursor-pointer grid place-items-center bg-blue-500 w-[40px] h-[40px]"><i className="ri-camera-line text-2xl text-white"></i></label>
                    <input type="file" id="uploadImage" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.value)} value={image} />
                </div>
                <div className="md:my-8 mt-8 grid md:grid-cols-2 gap-x-8">
                    <Input type="text" className="my-4 md:my-0" label="First Name" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    <Input type="text" className="my-4 md:my-0" label="Last Name" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                </div>
                <div className="md:my-8 grid md:grid-cols-2 gap-x-8">
                    <Input type="email" className="my-4 md:my-0" label="Email" readOnly />
                    <Input type="text" className="my-4 md:my-0" label="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                </div>
                <Button radius="none" type="submit" isDisabled={isDisabled} color="primary" className="text-lg mt-8 mb-4">
                    Save
                </Button>
            </form>
        </main>
    )
}
