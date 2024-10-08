'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import TextInput from '@/components/authentication/TextInput';
import Button from '@/components/common/Button';
import { forgetPasswordSchema } from '@/schemas/zod/schemas';
import { resetPasswordAction } from './actions';

const ForgetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof forgetPasswordSchema>) => {
    const result = await resetPasswordAction(values);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[350px] flex-col gap-4"
    >
      <TextInput
        id="email"
        type="email"
        placeholder="Email"
        {...register('email')}
        errors={errors.email?.message}
      />
      <Button
        type="submit"
        className="mt-2 rounded bg-input px-5 py-1 text-sm text-foreground"
      >
        Send Reset Password
      </Button>
    </form>
  );
};

export default ForgetPasswordForm;
