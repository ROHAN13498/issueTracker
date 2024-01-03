import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Issue } from '@prisma/client'
import { Heading, Card,Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface props{
  issue:Issue
}

const Issuedetails = ({issue}:props) => {
  return (
    <div>
        <Heading>{issue.title}</Heading>
          <div className="flex  space-x-3 my-2 ">
            <IssueStatusBadge status={issue.status}/>
            <Text>{issue.createdAt.toDateString()}</Text>
          </div>
          <Card className='prose'>
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
    </div>
  )
}

export default Issuedetails