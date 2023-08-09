import getCurrentUser from "@/app/Action/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

type Params = {
    conversationId :string
}

export async function POST(request:Request, {params}:{params:Params}){
    try {
        const {
            conversationId
          } = params;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
          }

          // check existing conversation first
        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true,
                messages:{
                    include:{
                        seen:true
                    }
                }
            }
        });

        if(!conversation){
            return new NextResponse('Invalid Id', { status: 401 });
        };

        //find last message
        const lastMessage = conversation.messages[conversation.messages.length -1];

        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        // update last message seen list

        const updateMessageSeen = await prisma.message.update({
            where:{
                id:lastMessage.id
            },
            include:{
                seen:true,
                sender:true
            },
            data:{
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }
            }
        });

        return NextResponse.json(updateMessageSeen);


        
    } catch (error:any) {
        console.log('Error from seen post api', error);
        return new NextResponse('Server Side Error', {status:500});
    }
}