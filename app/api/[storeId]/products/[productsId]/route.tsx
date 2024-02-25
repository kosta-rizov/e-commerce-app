import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { productsId: string } }
) => {
  try {
    if (!params.productsId) {
      return new NextResponse("Products id is required", { status: 400 });
    }

    const products = await prismadb.product.findUnique({
      where: {
        id: params.productsId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { productsId: string; storeId: string } }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      images,
      price,
      categoryId,
      colorId,
      sizeId,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("images is required", { status: 400 });
    }
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category Id is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color Id is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size Id is required", { status: 400 });
    }

    if (!params.productsId) {
      return new NextResponse("Products Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
        where: {
          id: params.productsId
        },
        data: {
          name,
          price,
          categoryId,
          colorId,
          sizeId,
          images: {
            deleteMany: {},
          },
          isFeatured,
          isArchived,
        },
      });
  
      const product = await prismadb.product.update({
        where: {
          id: params.productsId
        },
        data: {
          images: {
            createMany: {
              data: [
                ...images.map((image: { url: string }) => image),
              ],
            },
          },
        },
      })

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATHC]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; productsId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.productsId) {
      return new NextResponse("Products id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productsId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PROSUCT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
