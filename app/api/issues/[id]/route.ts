import  {NextRequest, NextResponse}  from "next/server";
import  {issueSchema}  from "@/app/validationSchemas";
import prisma from "@/prisma/client";

interface paramsInterface{
    params:{id:string}
}
export async function PATCH(request:NextRequest,{params}:paramsInterface){
    const id=parseInt(params.id);
    const body=await request.json();
    const validation=issueSchema.safeParse(body);

    if(!validation.success) return NextResponse.json(validation.error.errors,{status:400})

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