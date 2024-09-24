import Layout from "@/components/dashboard/layout";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return <Layout>{children}</Layout>;
};

export default DashboardLayout;
