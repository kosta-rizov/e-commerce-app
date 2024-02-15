import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// Create Store
export const POST = async (req: Request) => {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { name } = body;


        if(!userId) {
            return new NextResponse('Unauthorized', {status: 401})
        }

        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("[STORES_POST_API]",error)
        return new NextResponse("error", {status: 500})
    }
}