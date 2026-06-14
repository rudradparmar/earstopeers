import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const origin = new URL(request.url).origin;

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Upsert profile on OAuth login
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username:
          data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "User",
        avatar_url: data.user.user_metadata?.avatar_url || null,
      });
    }
  }

  return NextResponse.redirect(`${origin}/`);
}
