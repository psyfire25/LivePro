import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AdminShell, ToastProvider } from "@repo/ui";
import { AuthProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@repo/auth";
import { NotificationManager } from "../components/NotificationManager";

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
      <head>
        <Script id="lp-theme-init" strategy="beforeInteractive">
          {`(function(){try{var c=document.cookie.split('; ').find(r=>r.startsWith('lp-theme='));var t=c?c.split('=')[1]:null;if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            <AdminShell
              appName="LivePro: Staffing"
              sideNav={[
                { href: "/roster", label: "Roster" },
                { href: "/schedule", label: "Schedule" },
                { href: "/requests", label: "Requests" },
              ]}
              rightSlot={(
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
              )}
            >
              {children}
            </AdminShell>
            <SignedIn>
              <NotificationManager />
            </SignedIn>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
