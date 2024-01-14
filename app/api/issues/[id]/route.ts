import  {NextRequest, NextResponse}  from "next/server";
import  {issueSchema}  from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";

interface paramsInterface{
    params:{id:string}
}
export async function PATCH(request:NextRequest,{params}:paramsInterface){
    // console.log(params);
    const id=parseInt(params.id);
    const body=await request.json();
    const validation=issueSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.format(),{status:400})

    const updatedIssue=await prisma.issue.update({
        where:{
            id:id
        },
        data:{
            title:body.title,
            description:body.description
        }
    });

    return NextResponse.json(updatedIssue,{status:200});

}

export async function DELETE(request:NextRequest,{params}:paramsInterface){
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