import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import Issuedetails from './Issuedetails';
import IssueEditButton from './IssueEditButton';
import DelteIssueButton from './DeleteIssueButton';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Issuedetails issue={issue} />
      </Box>
      <Box>
        <Flex gap="4">
        <IssueEditButton params={{ id: `${issue.id}` }} />
        <DelteIssueButton issueId={issue.id}/> 
        </Flex>
      </Box>
    </Grid>
  );
};

export const dynamic = 'force-dynamic'


export default IssueDetailPage;
