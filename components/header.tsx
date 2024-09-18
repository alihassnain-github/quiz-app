"use client";

import Link from "next/link";
import { logout } from "@/firebase/firebaseauth";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from "@nextui-org/react";

export default function Header() {

    function logoutUser() {
        logout();
    }

    return (
        <Navbar>
            <NavbarContent>
                <NavbarBrand>
                    <p className="font-semibold">Quiz Portal</p>
                </NavbarBrand>
                <Dropdown>
                    <DropdownTrigger>
                        <Button className="bg-white"
                        >
                            <User
                                name="Jane Doe"
                                avatarProps={{
                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                }}
                            />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="settings"><Link href="appsettings">Settings</Link></DropdownItem>
                        <DropdownItem onClick={logoutUser} key="delete" className="text-danger" color="danger">
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar >
    );

}