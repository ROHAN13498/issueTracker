'use client'
import { TextField,Button, CalloutText,Callout, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import {useForm,Controller} from 'react-hook-form'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { issueSchema } from '@/app/validationSchemas'
import {z} from "zod"
import Spinner from '@/app/components/Spinner'
import ErrorMessage from '@/app/components/ErrorMessage'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false }) 

type issueType=z.infer<typeof issueSchema>

const NewIssue = () => {
  const router=useRouter();
  const [error,setError]=useState("");
  const [isSubmitting,setIsSubmitting]=useState(false);
  const {register,control,handleSubmit,formState:{errors}}=useForm<issueType>({
    resolver:zodResolver(issueSchema)
  });
  
  return (
    <div className="max-w-xl">
      {error && <Callout.Root color='red'>
        <CalloutText>{error}</CalloutText>
        </Callout.Root>}
    <form className=' space-y-3' 
    onSubmit={handleSubmit( async(data)=>{
      try {
        setIsSubmitting(true)
        const response=await axios.post('/api/issues',data);
        router.push("/issues")
      } catch (error) {
        setIsSubmitting(false)
        setError("A unexpected error has occured")
      }
    })}>
        <TextField.Root>
          <TextField.Input placeholder='Title'  {...register('title')}></TextField.Input>
        </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller  name='description' control={control} render={({field})=> <SimpleMDE  placeholder='description' {...field}  />}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit{isSubmitting && <Spinner></Spinner>}</Button>
    </form>
        </div>
  )
}

export default NewIssue
