"use client"

import * as React from "react"
import { loginAction } from "@/app/admin/actions"
import { useActionState } from "react"

const initialState = {
  error: "",
}

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState)

  return (
    <div className="min-h-screen bg-[#221F1C] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-[#FBF6EE]">PrintBloom</h1>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9A8F85] mt-1">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#2C2926] border border-white/10 p-8">
          <h2 className="font-serif text-2xl text-[#FBF6EE] mb-6">Sign In</h2>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-mono text-[#9A8F85] uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="h-12 bg-[#221F1C] border border-white/10 text-[#FBF6EE] px-4 focus:outline-none focus:border-[#C1502E] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-mono text-[#9A8F85] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
                className="h-12 bg-[#221F1C] border border-white/10 text-[#FBF6EE] px-4 focus:outline-none focus:border-[#C1502E] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {state?.error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-300 text-sm px-4 py-3">
                {state.error === "Invalid login credentials"
                  ? "Galat email ya password. Dobara check karein."
                  : state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="h-12 bg-[#C1502E] text-white font-medium hover:bg-[#a8432a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#9A8F85] text-xs mt-6">
          Only authorized PrintBloom admins can access this panel.
        </p>
      </div>
    </div>
  )
}
