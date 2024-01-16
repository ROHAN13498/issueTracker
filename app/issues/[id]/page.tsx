import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Issuedetails from "./Issuedetails";
import IssueEditButton from "./IssueEditButton";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import Assigneeselect from "./Assigneeselect";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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

export default IssueDetailPage;
