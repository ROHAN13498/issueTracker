import React from 'react'
import { Button, Table} from '@radix-ui/themes'
import prisma from '@/prisma/client'
import Link from '../components/Link';
import IssueStatusBadge from '../components/IssueStatusBadge'
import delay from 'delay'

const IssuesPage = async () => {
  const issues=await prisma.issue.findMany({});
  // await delay(2000);
  return (
    <div>
      <div className='mb-5'>
        <Button ><Link href="/issues/new" >New Issue</Link> </Button>
      </div>
        <Table.Root variant='surface'>
          <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell className='hidden md:table-cell'>Issue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell  className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell  className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
            </Table.Row>
              </Table.Header>
            <Table.Body>
              {issues.map(issue=>(
                <Table.Row key={issue.id}>  
                  <Table.Cell >
                    <Link  href={`/issues/${issue.id}`}>{issue.title}</Link> </Table.Cell>
                  <Table.Cell><IssueStatusBadge status={issue.status}/></Table.Cell>
                  <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
        </Table.Root>
    </div>
  )
}

export default IssuesPage