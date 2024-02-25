import { FC } from 'react'
import ProductsClient from './components/productsClient'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/columns'
import { format } from "date-fns"
import { Formatter } from '@/lib/utils'

const ProductsPage = async ({params}: {params: {storeId: string}} ) => {

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      // include Models
      category: true, 
      size: true,
      color: true,
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formatedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: Formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do yyyy")
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductsClient data={formatedProducts}/>
        </div>
    </div>
  )
}

export default ProductsPage