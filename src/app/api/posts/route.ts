import { Prisma, PrismaClient } from "@prisma/client";
import { type NextRequest } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const categoryId = searchParams.get("categoryId");
  const sort = searchParams.get("sort") === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc;

  const posts = await prisma.post.findMany({
    where: {
      ...(categoryId && {
        category: {
          is: {
            id: Number(categoryId),
          },
        },
      }),
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: sort,
    },
    include: {
      category: true,
    },
  });
  return Response.json(posts);
};

export const POST = async (request: Request) => {
  try {
    const { title, content, categoryId } = await request.json();
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        categoryId: Number(categoryId),
      },
    });
    return Response.json(newPost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
};
