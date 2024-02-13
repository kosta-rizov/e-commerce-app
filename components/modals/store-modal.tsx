"use client";
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

export const StoreModal = () => {
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

  const onSubmithHandler = (value: z.infer<typeof formSchema>) => {
    console.log(value);
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
                      <Input placeholder="E-Commerc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant={"outline"} onClick={storeModal.onClose}>
                  Cancel
                </Button>

                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
