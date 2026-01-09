"use client"

import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { loginActions } from "./actions";
import { client } from "@/lib/supabaseClient";
import { redirect, useRouter } from "next/navigation";
import GetUser from "../utils/GetUser";

const initialState = {
    success: null,
    errors: null,
};
export default function LoginForm() {
    const [isPending, setIsPending] = useState(false);
    const user = GetUser()

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        setIsPending(true);
        // LANGSUNG panggil di client, jangan lewat server action
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            setIsPending(false);
        } else {
            // Setelah login sukses di client, Local Storage akan OTOMATIS terisi
            console.log("Login sukses, session disimpan di Local Storage");
            setIsPending(false);
            router.push("/");
        }
    }
    // if (user) redirect("/");
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground"
                    placeholder="you@example.com"
                />

            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground"
                    placeholder="••••••••"
                />

            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" /> Remember me
                </label>
            </div>

            <div>
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing in..." : "Sign In"}
                </Button>
            </div>
        </form>
    );
}
