import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@repo/auth";
import { AdminShell, ToastProvider } from "@repo/ui";
import Script from "next/script";
import { UserRoleBadge } from "@/components/user-role-badge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LivePro: Production",
  description: "Plan and run live events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="lp-theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('lp-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <AdminShell
              appName="LivePro: Production"
              sideNav={[
                { href: "/", label: "Dashboard" },
                { href: "/events", label: "Events" },
                { href: "/sections/management", label: "Management" },
                { href: "/sections/build", label: "Build" },
                { href: "/sections/logistics", label: "Logistics" },
              ]}
              rightSlot={(
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <span className="ui:px-3 ui:py-1.5 ui:rounded-md ui:border ui:border-black/10 hover:ui:bg-black/5 ui:cursor-pointer">Sign in</span>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserRoleBadge />
                    <UserButton appearance={{ elements: { userButtonBox: "ui:ml-1" } }} />
                  </SignedIn>
                </>
              )}
            >
              {children}
            </AdminShell>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
