import getCurrentUser from "@/app/Action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

type Params = {
  conversationId: string;
};

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // check existing conversation first
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Invalid Id", { status: 401 });
    }

    //find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // update last message seen list

    const updateMessageSeen = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    // update all connection with seen

    await pusherServer.trigger(currentUser.email!, "conversation:update", {
      id: conversationId,
      messages: [updateMessageSeen],
    });

    //if user already seen message

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    //last message seen update real time
    await pusherServer.trigger(
      conversationId!,
      "message:update",
      updateMessageSeen
    );

    return NextResponse.json(updateMessageSeen);
  } catch (error: any) {
    console.log("Error from seen post api", error);
    return new NextResponse("Server Side Error", { status: 500 });
  }
}
