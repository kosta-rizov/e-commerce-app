import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Create Categories
export const POST = async (
  req: Request,
  { params }: { params: { categoryId: string , storeId: string} }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unanthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403})
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST_API]", error);
    return new NextResponse("error", { status: 500 });
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }

    const category = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("error", { status: 500 });
  }
};
