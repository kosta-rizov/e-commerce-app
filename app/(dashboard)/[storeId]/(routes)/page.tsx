import { FC } from "react";
import prismadb from "@/lib/prismadb";

interface dashboardPageProps {
  params: { storedId: string };
}

const DashboardPage: FC<dashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storedId,
    },
  });

  return (
    <>
      <div>
        <h1>DashboardPage</h1>
        {store?.name}
      </div>
    </>
  );
};

export default DashboardPage;
