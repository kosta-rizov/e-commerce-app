import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {storedId: string};
}

const DashboardLayout: FC<DashboardLayoutProps> = async ({children , params}) => {

    const { userId } = auth()
    if(!userId) {
        redirect('/sign-in')
    }
    
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storedId,
            userId
        }
    })

    if(!store) redirect('/')


  return (
    <>
        <div>
            <Navbar />
            {children}
        </div>
    </>
  )
}

export default DashboardLayout