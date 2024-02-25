import prismadb from '@/lib/prismadb'
import { FC } from 'react'
import ProductsForm from './components/products-form'

interface SingleProductsPageProps {
  params: { productsId: string, storeId: string }
}

const SingleBillboardPage: FC<SingleProductsPageProps> = async ({params}) => {

    const products = await prismadb.product.findUnique({
        where: {
            id: params.productsId
        },
        include: {
          //include images model
          images: true
        }
    })

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    })

    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId
      }
    })

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    })

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductsForm 
              categories={categories}
              sizes={sizes}
              colors={colors}
              initialData={products}
            />
        </div>
    </div>
  )
}

export default SingleBillboardPage