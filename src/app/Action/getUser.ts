import prisma from '@/app/libs/prismadb';
import getSession from './getSession';


export default async function getUser() {
    const session = await getSession();

    if(!session?.user?.email){
        return null;
    }
    const user = await prisma.user.findMany({
        orderBy:{
            createdAt:"desc"
        },
        where:{
            NOT:{
                email:session.user?.email
            }
        }
    });

    if(!user){
        return null;
    };
    return user;
}
