import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow - Smart Task Management for Productivity",
  description: "Organize your work with TaskFlow. Create, track, and manage tasks efficiently. Boost your productivity with our intuitive task board.",
  keywords: "task management, productivity, todo app, task planner, workflow",
  authors: [{ name: "TaskFlow Team" }],
  openGraph: {
    title: "TaskFlow - Smart Task Management",
    description: "Manage your tasks efficiently with TaskFlow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Task Management App",
    description: "Organize tasks and boost productivity",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✓</text></svg>" />
      </head>
      <body className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
