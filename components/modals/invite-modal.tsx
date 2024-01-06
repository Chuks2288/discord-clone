"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
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
import { Check, Copy, RefreshCcw } from "lucide-react";
import useOrigin from "@/hooks/use-origin";
import { useState } from "react";


const InviteModal = () => {

    const origin = useOrigin();

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "invite"
    const { server } = data;


    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`


    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onRegenerate = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);

            onOpen("invite", { server: response.data });

            toast.success("Link Generated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error Generating Linking");

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                        Server invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button
                            disabled={isLoading}
                            size="icon"
                            onClick={onCopy}
                            Icon={copied ? <Check /> : <Copy />}
                        />
                    </div>
                    <Button
                        disabled={isLoading}
                        title="Generate a new link"
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                        Icon={<RefreshCcw />}
                        onClick={onRegenerate}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal;