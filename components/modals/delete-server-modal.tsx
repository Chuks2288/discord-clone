"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Check, Copy, Loader2, RefreshCcw } from "lucide-react";
import useOrigin from "@/hooks/use-origin";
import { useState } from "react";
import { useRouter } from "next/navigation";


const DeleteServerModal = () => {

    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteServer"
    const { server } = data;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            toast.success("You have left the server")
            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete server, please try again!!");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete <br />
                        <span className="font-bold text-indigo-500">
                            {server?.name}
                        </span>  will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            title="Cancel"
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                            className="w-[7rem]"
                        />
                        <Button
                            disabled={isLoading}
                            title={
                                isLoading
                                    ? (
                                        <Loader2
                                            className="animate-spin w-5 h-5"
                                        />
                                    ) : "Confirm"

                            }
                            variant="danger"
                            onClick={onClick}
                            className="w-[7rem]"
                        />
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteServerModal;