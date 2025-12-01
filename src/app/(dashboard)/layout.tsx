import { Sidebar } from "@/components/navigation/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen pb-20 md:pb-0 md:ml-[80px] bg-neutral-50">
        {/* Global Content Wrapper - Enforces Design System */}
        <div className="px-8 md:px-12 py-12 max-w-6xl mx-auto">{children}</div>
      </main>
    </>
  );
}
