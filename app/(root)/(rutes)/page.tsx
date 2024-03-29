"use client"
import { useStoreModal } from "@/hooks/use-store-modals";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home() {

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }

  },[isOpen, onOpen])

  return null;
}
