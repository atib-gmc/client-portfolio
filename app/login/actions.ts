"use server"

import client from "@/lib/supabaseClient";
import z from "zod";
import { redirect } from "next/navigation";

const formData = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type FormType = z.infer<typeof formData>;

export async function loginActions(prevState: any, data: FormData) {
    const validatedFields = formData.safeParse({
        email: data.get("email"),
        password: data.get("password"),
    });
    console.log("line 19", { email: data.get("email"), password: data.get("password") })
    if (!validatedFields.success) {
        return { success: false, errors: validatedFields.error.flatten() };
    }

    const { email, password } = validatedFields.data;
    const { error } = await client.auth.signInWithPassword({ email, password });
    console.log("success validating")

    if (error) {
        console.log("server log : ", error)
        return { success: false, errors: { fieldErrors: { email: [error.message], password: [error.message] } } };
    }
    redirect("/");

    return { success: true, msg: "Login successful" };
    // redirect("/")

}