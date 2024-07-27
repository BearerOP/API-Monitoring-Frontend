"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { toast } from "@/Components/ui/use-toast";
import axios from "axios";
import Path from "@/Services/Path";

const securityFormSchema = z.object({
  newPassword: z
    .string()
    .min(8, {
      message: "New password must be at least 8 characters.",
    })
    .max(20, {
      message: "New password must not be longer than 20 characters.",
    }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SecurityForm() {
  const form = useForm({
    resolver: zodResolver(securityFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data) {
    try {
      const response = await Path.put("/profile/password/update", {
        new_password: data.newPassword,
      });

      if (response.data.success) {
        toast({
          title: "Password changed successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(response.data, null, 2)}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Error changing password",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{response.data.message || "Unknown error"}</code>
            </pre>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Error changing password",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.response?.data?.message || error.message}</code>
          </pre>
        ),
      });
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
                <Input type="password" placeholder="Confirm New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Change Password</Button>
      </form>
    </Form>
  );
}