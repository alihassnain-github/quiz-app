"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="w-full h-screen grid place-items-center px-4">
      <main className="lg:w-1/3 md:w-1/2 sm:w-full w-full border-2 h-[70vh] flex flex-col justify-between py-8 px-4 rounded">
        <h1 className="text-center md:text-4xl text-2xl">Welcome to Quiz Application</h1>
        <div>
          <Button radius="none" color="primary" className="w-48 md:w-64 text-lg block mx-auto">
            <Link href="signup">Create Account</Link>
          </Button>
          <Button radius="none" color="primary" className="mt-4 w-48 md:w-64 text-lg block mx-auto">
            <Link href="login">Login</Link>
          </Button>
        </div>
        <h1 className="text-center">Developed by _ <a href="https://github.com/alihassnain-github" target="_blank" className="text-blue-500">Ali Hassnain</a></h1>
      </main>
    </div>
  );
}
