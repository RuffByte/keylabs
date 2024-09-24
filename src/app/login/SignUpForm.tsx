'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import TextInput from '@/components/authentication/TextInput' // Import the TextInput component

import Button from '@/components/common/Button'
import { signUp } from './login.action'
import { signUpSchema } from '@/schemas/zod/schemas'

const SignUpForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const res = await signUp(values)
    if (res.success) {
      toast.success('Account created successfully')
      router.push('/dashboard')
    } else {
      toast.error(res.error)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-[350px]">
      <h1 className="mb-2 text-secondary-blue font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <TextInput
          id="name"
          type="text"
          placeholder="Name"
          {...register('name')}
          errors={errors.name?.message}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="Email"
          {...register('email')}
          errors={errors.email?.message}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          {...register('password')}
          errors={errors.password?.message}
        />
        <TextInput
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
          errors={errors.confirmPassword?.message}
        />
        <Button type="submit" className="mt-2">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
