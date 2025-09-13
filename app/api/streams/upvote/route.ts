import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email ?? "",
    },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthenticated",
      },
      {
        status: 403,
      }
    );
  }
  try {
    const data = UpvoteSchema.parse(await req.json());
    
    // Check if upvote already exists
    const existingUpvote = await prismaClient.upvote.findUnique({
      where: {
        userId_streamId: {
          userId: user.id,
          streamId: data.streamId,
        },
      },
    });
    
    if (existingUpvote) {
      return NextResponse.json(
        {
          message: "Already upvoted",
        },
        {
          status: 409, // Conflict
        }
      );
    }
    
    await prismaClient.upvote.create({
      data: {
        userId: user.id,
        streamId: data.streamId,
      },
    });
    
    return NextResponse.json(
      {
        message: "Upvoted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error("Upvote error:", e);
    return NextResponse.json(
      {
        message: "Error while upvoting",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
