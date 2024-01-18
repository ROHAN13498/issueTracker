import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Assigneeselect from "./Assigneeselect";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueEditButton from "./IssueEditButton";
import Issuedetails from "./Issuedetails";
import { title } from "process";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache(async (issueId: number) => {
  return await prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  });
});

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Issuedetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4" px={"2"}>
            <Assigneeselect issue={issue} />
            <IssueEditButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailPage;
