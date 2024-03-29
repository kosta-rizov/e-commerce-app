"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrdersColumn = {
  id: string
  phone: string
  address: string
  isPaid: boolean
  products: string
  totalPrice: string
  createdAt: string
}

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
