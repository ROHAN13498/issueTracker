'use client'

import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const IssueActions = () => {
  return (
    <Flex  justify="between">
      <FilterIssues />
      <Button>
        <Link href="/issues/new">New Issue</Link>{" "}
      </Button>
    </Flex>
  );
};

const FilterIssues = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closes", value: "CLOSED" },
  ];

  const router =useRouter();
  const searchParams=useSearchParams();
  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        console.log("search params")
        if (status) params.set('status', status);
        if (searchParams.get('orderBy'))
          params.set('orderBy', searchParams.get('orderBy')!);
        const query = params.size ? '?' + params.toString() : '';
        router.push('/issues' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by Status.."></Select.Trigger>
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
  
};

export default IssueActions;
