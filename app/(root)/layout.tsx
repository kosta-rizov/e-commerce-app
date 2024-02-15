import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface homeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: FC<homeLayoutProps> = async ({ children }) => {

    const { userId } = auth()
    if(!userId) redirect('/sign-in')

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })
    if(store) [
        redirect(`/${store.id}`)
    ]

  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
