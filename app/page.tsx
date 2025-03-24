"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Landing/Header";
import Guest from "@/components/Landing/Guest";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header className="bg-transparent absolute text-white p-4 w-full" />
      {/* <Guest /> */}
      <Button onClick={() => router.push("/register")}>Signup</Button>
    </>
  );
}
