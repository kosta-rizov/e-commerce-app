"use client";
import { useState } from "react";
import * as z from "zod";
import { useStoreModal } from "@/hooks/use-store-modals";
import { Modal } from "@/components/ui/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export const StoreModal = () => {

  const [loading, setLoading ] = useState(false)

  const storeModal = useStoreModal();

  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmithHandler = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post("api/stores", value )
      
      window.location.assign(`/${response.data.id}`)

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")

    }finally {
      setLoading(false)
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add new Store to manage products and categories"
      isOpen={storeModal.isOpen}
      onclose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmithHandler)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-Commerc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>
                  Cancel
                </Button>

                <Button disabled={loading} type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
