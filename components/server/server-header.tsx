"use client"

import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole } from '@prisma/client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, LogOut, Plus, Settings, Trash, UserPlus, Users } from 'lucide-react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useModal } from '@/hooks/use-modal-store';


interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

const ServerHeader = ({
    server,
    role,
}: ServerHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;




    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none' asChild>
                    <button
                        className='w-full text-md gap-2 font-semibold px-3 flex items-center h-12 border-neutral-200 
                    dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'
                    >
                        {server.name}
                        <ChevronDown className='h-5 w-5' />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'
                >
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("invite", { server })}
                            className='cursor-pointer text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm'>
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}

                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("editServer", { server })}
                            className='cursor-pointer px-3 py-2 text-sm'>
                            Server Settings
                            <Settings className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("members", { server })}
                            className='cursor-pointer px-3 py-2 text-sm'>
                            Manage Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("createChannels")}
                            className='cursor-pointer px-3 py-2 text-sm'>
                            Create Channels
                            <Plus className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}

                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}

                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("deleteServer", { server })}
                            className='cursor-pointer px-3 py-2 text-rose-500 text-sm'>
                            Delete Server
                            <Trash className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("leaveServer", { server })}
                            className='cursor-pointer px-3 py-2 text-rose-500 text-sm'>
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default ServerHeader