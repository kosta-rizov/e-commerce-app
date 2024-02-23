"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { SizesColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizeClientProps {
  data: SizesColumn[]
}

const SizesClient: FC<SizeClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
      router.refresh()
    },[router])

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
            title={`Sizes (${data.length})`}
            description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
            <Plus className="mr-2 h-4 w-4"/>
            Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="name" columns={columns} data={data}/>

      <Heading 
            title="API"
            description="API calls from sizes"
        />
      <Separator />
      <ApiList 
      entityName='sizes'
      entityIdName='sizeID'
      />
    </>
  );
};

export default SizesClient;
