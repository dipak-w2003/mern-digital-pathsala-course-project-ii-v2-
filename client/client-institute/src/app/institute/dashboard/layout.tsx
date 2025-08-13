import Dashboard from "@/lib/components/dashboard/Dashboard"
// layout.tsx automatically accepts other folder/page.tsx as children so it's like layout.tsx file naming convention accepts children(page.tsx) out of the box
function InstituteDashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Dashboard>
      {children}
    </Dashboard>
  )
}


export default InstituteDashboardLayout

