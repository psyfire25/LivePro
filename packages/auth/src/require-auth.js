"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
export function RequireAuth({ children }) {
    return (_jsxs(_Fragment, { children: [_jsx(SignedIn, { children: children }), _jsx(SignedOut, { children: _jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "border rounded-xl p-6 shadow-lg max-w-md w-full space-y-4", children: [_jsx("h1", { className: "text-xl font-semibold", children: "Please sign in" }), _jsx("p", { className: "text-sm opacity-70", children: "You need to be logged in to access LivePro." }), _jsx(SignInButton, {})] }) }) })] }));
}
