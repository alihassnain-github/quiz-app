"use client";

import { Spinner } from "@nextui-org/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase/firebaseconfig";
import { useRouter } from "next/navigation";

type UserContextType = {
    user: null | UserType
}

type UserType = {
    email: string | null
    uid: string
}

const UserContext = createContext<null | UserContextType>(null);

export default function UserContextProvider({ children }: { children: ReactNode }) {

    const [loading, setLoading] = useState(true);
    const route = useRouter();
    const [user, setUser] = useState<null | UserType>(null);

    useEffect(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const { email, uid, emailVerified } = user;
                setUser({ email, uid });

                if (emailVerified) {
                    route.push("home");
                }
                else {
                    route.push("verifyemail");
                }

            } else {
                setUser(null);
                route.push("/");
            }

            setLoading(false);
        });
    }, [route]);

    if (loading) {
        return (
            <div className="w-full h-screen grid place-items-center bg-slate-50">
                <Spinner color="primary" />
            </div>
        )
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )

};

export const userData = () => useContext(UserContext);