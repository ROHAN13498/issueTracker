import React from 'react'
import { Box } from '@radix-ui/themes';
import Skeleton from"@/app/components/Skeleton"

const IssueFormSkeleton = () => {
  return (
    <div>
    <Box>
              <Skeleton  width="35rem"/>
            </Box>
            <Box>
              <Skeleton height="20rem" width="35rem" />
      </Box>

    </div>
  )
}

export default IssueFormSkeleton