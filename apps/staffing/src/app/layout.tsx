import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@repo/ui/src/components/ui/app-shell";
import { AuthProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@repo/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LivePro: Staffing",
  description: "Crew assignment and roles",
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
          <AppShell rightSlot={(
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
          )}>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
