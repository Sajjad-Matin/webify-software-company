"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/ui/site-header";
import useAuth from "@/hooks/use-auth";
import {
  User,
  Laptop,
  Package,
  Code,
  MessageCircleDashedIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data, isLoading, isError } = useAuth();

  // 🚀 AUTH CHECK
  useEffect(() => {
    if (!isLoading) {
      // Not logged in → redirect to login
      if (!data?.success || isError) {
        router.replace("/auth/login");
      }
    }
  }, [data, isLoading, isError, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Checking authentication...
      </div>
    );
  }

  // If not authenticated → don't render dashboard
  if (!data?.success) {
    return null;
  }

  // LOGGED-IN USER → Render admin layout
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 50)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        routes={[
          {
            name: "Report",
            url: `/auth/${data?.user?.fullName}`,
            icon: Package,
          },
          {
            name: "Users",
            url: `/auth/${data?.user?.fullName}/users`,
            icon: User,
          },
          {
            name: "Team Members",
            url: `/auth/${data?.user?.fullName}/team`,
            icon: Laptop,
          },
          {
            name: "Projects",
            url: `/auth/${data?.user?.fullName}/projects`,
            icon: Code,
          },
          {
            name: "Messages",
            url: `/auth/${data?.user?.fullName}/messages`,
            icon: MessageCircleDashedIcon,
          },
        ]}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 my-4">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
