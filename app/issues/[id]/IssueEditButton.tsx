import { Pencil1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface props{
  params:{id:string}
}

const IssueEditButton = ({params}:props) => {
  return (
    <div>
         <Button>
            <Pencil1Icon></Pencil1Icon>
            <Link href={`/issues/${params.id}/edit`}>Edit Issue</Link>
          </Button>
    </div>
  )
}

export default IssueEditButton