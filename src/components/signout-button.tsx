import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit" className="cursor-pointer">
        Sign Out
      </button>
    </form>
  );
}
