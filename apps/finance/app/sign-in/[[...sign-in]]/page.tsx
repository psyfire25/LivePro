"use client";
import { SignIn } from "@clerk/nextjs";
export default function Page(){ return <div className="lp-wrap lp-container"><SignIn routing="hash" /></div>; }

