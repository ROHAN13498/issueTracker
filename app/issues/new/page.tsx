import dynamic from 'next/dynamic'
import React from 'react'
import IssueFormSkeleton from './loading'

const IssueForm=dynamic(
  ()=>import('@/app/components/Issue'),
  {
  ssr:false,
  loading:()=><IssueFormSkeleton/>
}
)

const Issue = () => {
  return (
    <div>
      <IssueForm/>
    </div>
  )
}

export default Issue