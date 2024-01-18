import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = searchParams.status;

  const possibleStatuses = Object.keys(Status);

  const orderBy =
    searchParams.orderBy && columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: "asc" }
      : {};

  const where = {
    status: possibleStatuses.includes(status) ? status : undefined,
  };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const metadata:Metadata={
  title: "Issue Tracker -Issue List",
  description:"List of all issues"
};



export default IssuesPage;
