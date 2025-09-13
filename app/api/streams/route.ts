import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import play from "play-dl";

const YT_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com\/(?:watch\?(?!.*\blist=)(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&]\S+)?$/;

const CreateStreamSchema = z.object({
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "Unauthenticated" },
        { status: 403 }
      );
    }

    const data = CreateStreamSchema.parse(await req.json());
    const match = data.url.match(YT_REGEX);

    if (!match) {
      return NextResponse.json(
        { message: "Wrong URL format" },
        { status: 411 }
      );
    }

    const extractedId = match[1];

    // استخدم play-dl لجلب تفاصيل الفيديو
    const info = await play.video_info(data.url);
    const videoDetails = info.video_details;

    console.log("Title:", videoDetails.title);
    console.log("Thumbnail:", videoDetails.thumbnails[0]?.url);

    const stream = await prismaClient.stream.create({
      data: {
        userId: user.id,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: videoDetails.title ?? "",
        smallImg: videoDetails.thumbnails[0]?.url ?? "",
        bigImg:
          videoDetails.thumbnails[videoDetails.thumbnails.length - 1]?.url ?? "",
      },
    });

    return NextResponse.json(
      {
        message: "Stream added successfully",
        stream, // رجع الـ object كله
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: "Error while adding a stream", error: errorMessage },
      { status: 411 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? "",
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "Unauthenticated" },
        { status: 403 }
      );
    }

    const streams = await prismaClient.stream.findMany({
      where: {
        userId: user.id,
      },
    });
    return NextResponse.json({ data: streams }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        message: "Error while fetching streams",
        error: errorMessage,
      },
      { status: 411 }
    );
  }
}
