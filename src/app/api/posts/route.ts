import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  const posts = await prisma.post.findMany();
  return Response.json(posts);
};

export const POST = async (request: Request) => {
  const { title, content } = await request.json();
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return Response.json(newPost);
};