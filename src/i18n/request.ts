import { Locale } from "@/types/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || Locale.English;

  const messages = await import(`../locales/${locale}/common.json`);

  return {
    locale,
    messages: messages.default,
  };
});
