import React from 'react'
import prisma from '@/prisma/client'
import IssuePage from '@/app/components/Issue'
import { notFound } from 'next/navigation'


interface Props{
  params:{id:string}
}

const EditIssuePage = async ({params}:Props) => {

  const issue=await prisma.issue.findUnique({
    where:{
      id:parseInt(params.id)
    }
  })

  if(!issue) notFound()
  return (
    <div>
        <IssuePage issue={issue} />
    </div>
  )
}

export default EditIssuePage