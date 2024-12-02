import { Header } from "@/layout/Header";
import { AuthorizationProvider } from "@/provider/AuthorizationProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthorizationProvider>
        <Header />
        <main>{children}</main>
      </AuthorizationProvider>
    </NextIntlClientProvider>
  );
}
