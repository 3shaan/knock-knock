import getCurrentUser from "@/app/Action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Request", { status: 401 });
    }

    const deleteConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    return NextResponse.json(deleteConversation);
  } catch (error: any) {
    console.log("Error from conversation delete", error);
    return new NextResponse("Server Side Error", { status: 500 });
  }
}
