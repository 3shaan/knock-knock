import getCurrentUser from "@/app/Action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // console.log("req", request);
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (isGroup && (!members || !name)) {
      return new NextResponse("invalid data ", { status: 400 });
    }

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("unauthorized ", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await prisma?.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      newConversation.users.map(user=>(
        pusherServer.trigger(user.email!, 'conversation:new',newConversation)
      ));

      return NextResponse.json(newConversation);
    }

    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversation[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    newConversation.users.map(user=>(
      pusherServer.trigger(user.email!, 'conversation:new',newConversation)
    ));
    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
