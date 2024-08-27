'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/Components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { toast } from '@/Components/ui/use-toast';
import Path from '@/Services/Path';
import Spinner from '@/Components/Spinner'; // Import the Spinner component

const securityFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, {
        message: 'New password must be at least 8 characters.',
      })
      .max(20, {
        message: 'New password must not be longer than 20 characters.',
      }),
    confirmPassword: z.string().min(8, {
      message: 'Confirm password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SecurityForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(securityFormSchema),
    mode: 'onChange',
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await Path.put('/api/profile/password/update', {
        new_password: data.newPassword,
      });

      if (response.data.success) {
        toast({
          title: 'Password Updated successfully!',
        });
        form.reset({
          newPassword: '',
          confirmPassword: '',
        }); // Clear the form inputs
      } else {
        toast({
          title: 'Error changing password',
        });
      }
    } catch (error) {
      toast({
        title: 'Error changing password',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading} className="relative w-36">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {loading ? '' : 'Change Password'}
        </Button>
      </form>
    </Form>
  );
}
