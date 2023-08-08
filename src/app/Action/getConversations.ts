import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export async function getConversation (){
    const currentUser = await getCurrentUser();
    if(!currentUser?.id){
        return [];
    };
    
    try {
        const conversation = await prisma.conversation.findMany({
            orderBy:{
                createAt:"desc"
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                user:true,
                messages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        });

        return conversation;
        
    } catch (error:any) {
        return [];
    }
}