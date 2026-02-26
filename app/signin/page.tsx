"use client";
import Email from "next-auth/providers/email";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [form, setForm] = useState({ name: "", email: "" });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError("");
      if(!form.name.trim() || )
    }
}
