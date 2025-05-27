// app/forgot-password/page.tsx or any location you're using it
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// ✅ Zod schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

// ✅ Type inference
type FormData = z.infer<typeof formSchema>;

export function Forgotpassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // ✅ useForm setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // ✅ Submit logic
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8765/USER-SERVICE/api/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("OTP sent! Redirecting...");
        router.push("/otp"); // 🔁 Adjust this route if needed
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px] p-5">
      <CardHeader className="text-left pl-1">
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Recover your account by email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>

          <Button className="w-full mt-6" type="submit" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default Forgotpassword;
