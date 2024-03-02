import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

interface Session {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    role?: string;
  };
  expires?: string;
}

export async function GET(request: Request): Promise<Response> {
  const session: Session | null = await getServerSession(authOptions);

  console.log("session", session);

  return Response.json({
    message: "test",
  });
}
