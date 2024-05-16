import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import signOut from "@/actions/auth/signOut";


export default async function AuthButton() {
  // This component doesn't update, when route changes, should it be a client component or revalidate path after login?
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4 ml-auto">
      Hi, {user.email}!
      <form action={signOut}>
        <button>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="ml-auto"
    >
      Login
    </Link>
  );
}