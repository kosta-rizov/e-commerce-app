import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <Button variant={"default"}>ok</Button>
      <UserButton afterSignOutUrl='/'/>
    </div>
  );
}
