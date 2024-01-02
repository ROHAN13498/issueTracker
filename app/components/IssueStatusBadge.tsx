import { Status } from '@prisma/client'
import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Stats, stat } from 'fs';

interface Props{
    status:Status
}

const statusMap:Record<Status,{label:string ,color:'red' |  "violet" | 'green'}>={
    OPEN:{label:'Open',color :'red'},
    CLOSED:{label:"Closed",color:"green"},
    IN_PROGRESS:{label:"In Progress",color: "violet"}
};

const IssueStatusBadge = ({status}:Props) => {
  return (
    <div>
        <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  )
}

export default IssueStatusBadge