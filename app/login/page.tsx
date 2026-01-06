"use client"

import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <section className="min-h-[80vh] flex items-center justify-center py-16">
            <div className="max-w-md w-full p-8 bg-card shadow-md rounded-xl">
                <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>
                <p className="text-sm text-muted mb-6">Welcome back — please enter your details.</p>
                <LoginForm />
            </div>
        </section>
    );
}
