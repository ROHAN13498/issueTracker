'use client'
import { TextField,Button, CalloutText,Callout } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import {useForm,Controller} from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation'
import axios from 'axios'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false }) 

interface issueType{
  title:string,
  description:string
}

const NewIssue = () => {
  const router=useRouter();
  const [error,setError]=useState("");
  const {register,control,handleSubmit}=useForm<issueType>();
  
  return (
    <div className="max-w-xl">
      {error && <Callout.Root color='red '>
        <CalloutText>{error}</CalloutText>
        </Callout.Root>}
    <form className=' space-y-3' 
    onSubmit={handleSubmit( async(data)=>{
      try {
        const response=await axios.post('/api/issues',data);
        router.push("/issues")
      } catch (error) {
        setError("A unexpected error has occured")
      }
    })}>
        <TextField.Root>
          <TextField.Input placeholder='Title'  {...register('title')}></TextField.Input>
        </TextField.Root>
        <Controller  name='description' control={control} render={({field})=> <SimpleMDE  placeholder='description' {...field}  />}/>
        <Button>Submit</Button>
    </form>
        </div>
  )
}

export default NewIssue
