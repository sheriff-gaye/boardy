import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar/index";

interface DashbaordLayoutProps {
  children: React.ReactNode;
}
const DashbaordLayout = ({ children }: DashbaordLayoutProps) => {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="pl-[60px] flex-1 flex h-screen">
        <OrgSidebar customclass="h-full" />
        <div className="flex-1 flex flex-col h-full">
          <Navbar />

          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashbaordLayout;
