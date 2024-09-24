"use client";

import Link from "next/link";
import { logout } from "@/firebase/firebaseauth";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Navbar, NavbarBrand, NavbarContent, useDisclosure } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from "@nextui-org/react";
import { useState } from "react";

export default function Header() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);

    function logoutUser() {

        setIsLoading(true);
        logout()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <Navbar>
                <NavbarContent>
                    <NavbarBrand>
                        <p className="font-semibold">Quiz Portal</p>
                    </NavbarBrand>
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                    isBordered: true,
                                    src: "",
                                }}
                                className="transition-transform"
                                name="Tony Reichert"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="settings">
                                <Link href="appsettings"> My Settings</Link>
                            </DropdownItem>
                            <DropdownItem onClick={onOpen} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </Navbar >


            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log out?</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to log out?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button isLoading={isLoading} onClick={logoutUser} color="danger" variant="light">
                                    Log out
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );

}