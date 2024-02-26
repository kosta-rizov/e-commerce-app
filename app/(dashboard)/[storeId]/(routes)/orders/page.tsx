import { FC } from 'react'
import OrdersClient from './components/ordersClient'
import prismadb from '@/lib/prismadb'
import { OrdersColumn } from './components/columns'
import { format } from "date-fns"
import { Formatter } from '@/lib/utils'


const OrdersPage = async ({params}: {params: {storeId: string}} ) => {

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: { product: true }
      }
    },
    orderBy:{
      createdAt: "desc"
    }
  })

  const formatedOrders: OrdersColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,

    products: item.orderItems.map((orderItem) => orderItem.product.name).join(", "),

    totalPrice: Formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),

    createdAt: format(item.createdAt, "MMMM do yyyy")
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <OrdersClient data={formatedOrders}/>
        </div>
    </div>
  )
}

export default OrdersPage