import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Server } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
    serverId: string;
}



export async function DELETE(
    req: Request,
    params: { params: IParams }
) {

    try {

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const server = await db.server.delete({
            where: {
                id: params.params.serverId,
                profileId: profile.id,
            },
        })

        return NextResponse.json(server);
    } catch (error) {
        console.error("SERVER_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}



export async function PATCH(
    req: Request,
    params: { params: IParams }
) {

    try {

        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const server = await db.server.update({
            where: {
                id: params.params.serverId,
                profileId: profile.id,
            },
            data: {
                name: name,
                imageUrl: imageUrl
            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.error("SERVER_ID_PATCH", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}