import  {NextRequest, NextResponse}  from "next/server";
import  {issuePatchSchema}  from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

interface paramsInterface{
    params:{id:string}
}
export async function PATCH(request:NextRequest,{params}:paramsInterface){
    // const session=await getServerSession(authOptions)

    // if(!session) return NextResponse.json({},{status:401})
    const id=parseInt(params.id);
    const body=await request.json();
    const validation=issuePatchSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.format(),{status:400})

    const {title,description,assignedToUserId}=body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
          where: { id: assignedToUserId },
        });
        if (!user)
          return NextResponse.json(
            { error: "Invalid user." },
            { status: 400 }
          );
      }

    const updatedIssue=await prisma.issue.update({
        where:{
            id:id
        },
        data:{
            title,
            description,
            assignedToUserId
        }
    });

    return NextResponse.json(updatedIssue,{status:200});

}

export async function DELETE(request:NextRequest,{params}:paramsInterface){
    const session=await getServerSession(authOptions)

    if(!session) return NextResponse.json({},{status:401})
    const id=parseInt(params.id);
    const issue=await prisma.issue.findUnique({
        where:{
            id: id
        }
    });

    if(!issue){
        return NextResponse.json({error:"invalid issue"},{status:404});
    }

    await prisma.issue.delete({
        where:{
            id:id
        }
    })
    return NextResponse.json({});

}