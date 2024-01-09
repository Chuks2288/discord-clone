"use client"

import * as z from "zod";
import qs from "query-string";
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
} from "@/components/ui/form"

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";


const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Message file is required"
    })
})

const MessageFileModal = () => {

    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();

    const { apiUrl, query } = data;

    const isModalOpen = isOpen && type === "messageFile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: ({
            fileUrl: "",
        })
    });

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        try {

            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            });

            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });

            form.reset();
            router.refresh();
            handleClose();
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                        </div>

                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button
                                title={
                                    isLoading
                                        ? (
                                            <Loader2
                                                className="animate-spin w-5 h-5"
                                            />
                                        ) : "Send"

                                }
                                disabled={isLoading}
                                variant="primary"
                                className="w-[5rem]"
                            />

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFileModal