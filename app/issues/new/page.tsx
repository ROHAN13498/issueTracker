'use client'

import { TextArea, TextField } from '@radix-ui/themes'
import React from 'react'
import { Button } from '@radix-ui/themes'

const NewIssue = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Title'></TextField.Input>
        </TextField.Root>
        <TextArea placeholder='description'></TextArea>
        <Button>Submit</Button>
    </div>
  )
}

export default NewIssue