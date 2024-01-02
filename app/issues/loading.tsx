import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueStatusBadge from '../components/IssueStatusBadge'


const loadingIssuesPage = () => {
    const issues=[1,2,2,3,23,2,2,2,2,2,2,]
  return (
    <div>
      <div className='mb-5'>
        <Button ><Link href="/issues/new">New Issue</Link> </Button>
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
                <Table.Row key={issue}>  
                  <Table.Cell><Skeleton  /></Table.Cell>
                  <Table.Cell><Skeleton /></Table.Cell>
                  <Table.Cell><Skeleton /></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
        </Table.Root>
    </div>
  )
}

export default loadingIssuesPage