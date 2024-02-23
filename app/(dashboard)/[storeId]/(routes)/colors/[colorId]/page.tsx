import prismadb from '@/lib/prismadb'
import { FC } from 'react'
import ColorForm from './components/colors-form'

interface SingleColorsPageProps {
  params: { colorId: string }
}

const SingleColorsPage: FC<SingleColorsPageProps> = async ({params}) => {

    const colors = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColorForm initialData={colors}/>
        </div>
    </div>
  )
}

export default SingleColorsPage