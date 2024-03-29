import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import NextLink from "next/link";
import IssueStatusBadge from "../components/IssueStatusBadge";
import React from 'react'
import { Issue, Status } from "@prisma/client";

interface Props{
    searchParams: { status: Status; orderBy: keyof Issue; page: string },
    issues:Issue[]
}
const IssueTable = ({searchParams,issues}:Props) => {
    
    return (
        <div>
        <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
                <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
                >
                <NextLink
                  href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                    >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                    )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
              <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.Cell>
              <Table.Cell>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

export const columnNames=columns.map((column)=>column.value)
export default IssueTable