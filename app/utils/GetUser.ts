"use client";
import { client } from "@/lib/supabaseClient";
import React, { useEffect, useState } from "react";
// import { DropdownMenuCheckboxes } from "./dropDown";
import { User } from "@supabase/auth-js/dist/module/lib/types";

export default function GetUser(): User | null {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Get initial user
        const getInitialUser = async () => {
            const {
                data: { user },
            } = await client.auth.getUser();
            console.log(user)
            setUser(user);
        };

        getInitialUser();

        // Listen for auth state changes
        const {
            data: { subscription },
        } = client.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
                setUser(session.user);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    if (!user) return null;

    return user

}