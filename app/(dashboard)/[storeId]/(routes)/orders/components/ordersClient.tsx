"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";
import { OrdersColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrdersClientProps {
  data: OrdersColumn[]
}

const OrdersClient: FC<OrdersClientProps> = ({data}) => {

  return (
    <>
      <Heading 
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />

      <DataTable searchKey="products" columns={columns} data={data}/>

    </>
  );
};

export default OrdersClient;
