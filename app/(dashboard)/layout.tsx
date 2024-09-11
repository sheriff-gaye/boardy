interface DashbaordLayoutProps {
  children: React.ReactNode;
}
const DashbaordLayout = ({ children }: DashbaordLayoutProps) => {
  return <div>{children}</div>;
};

export default DashbaordLayout;
