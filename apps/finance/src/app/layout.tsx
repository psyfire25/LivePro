import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminShell, ToastProvider } from "@repo/ui";
import { AuthProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@repo/auth";
import { SearchProvider } from "../components/search-provider";
import { ShellWrapper } from "../components/shell-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LivePro: Finance",
  description: "Budgets, suppliers, and settlements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <SearchProvider>
              <ShellWrapper
                rightSlot={
                  <>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <span className="ui:px-3 ui:py-1.5 ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5 ui:cursor-pointer">Sign in</span>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <UserButton appearance={{ elements: { userButtonBox: "ui:ml-1" } }} />
                    </SignedIn>
                  </>
                }
              >
                {children}
              </ShellWrapper>
            </SearchProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
