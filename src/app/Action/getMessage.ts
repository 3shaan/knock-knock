import prisma from "@/app/libs/prismadb";

export async function getMessage(conversationId: string) {
  try {
    const message = await prisma.message.findMany({
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: true,
        sender: true,
      },
      orderBy: {
        CreateAt: "asc",
      },
    });

    return message;
  } catch (error: any) {
    console.log("get message error", error);
    return [];
  }
}
