import { Locale } from "@/types/locale";
import { redirect } from "next/navigation";

export default async function rootPage() {
  redirect(`/${Locale.English}`);
}
