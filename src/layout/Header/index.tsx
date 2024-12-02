"use client";

import Image from "next/image";
import logo from "@/assets/images/img/logo.png";
import { Button } from "@/ui/Button";
import styles from "./style.module.css";
import { Modal } from "@/ui/Modal";
import { Input } from "@/ui/Input";
import { paths } from "@/app/paths";
import { useLogin } from "./hooks/useLogin";
import { useDeviceType } from "@/hooks/useDeviceType";
import { BurgerMenu } from "@/components/BurgerMenu";
import { LocaleDropdown } from "@/components/LocaleDropdown";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

export const Header = () => {
  const { push } = useRouter();
  const {
    handleAuth,
    isSignInModalOpen,
    logged,
    onChange,
    signIn,
    setIsSignInModalOpen,
    email,
  } = useLogin();
  const { isDesktop } = useDeviceType();
  const t = useTranslations();

  const isUnauthorizedAndMobile = !isDesktop && logged;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => push(`/${paths.main}`)}>
          <Image src={logo} alt="logo" />
        </button>
        {isUnauthorizedAndMobile ? (
          <BurgerMenu />
        ) : (
          <div className={styles.left}>
            <LocaleDropdown />
            <Button onClick={handleAuth}>
              {logged ? t("signOut") : t("signIn")}
            </Button>
            {isSignInModalOpen && (
              <div className={styles.authorization}>
                <Modal
                  isOpen={isSignInModalOpen}
                  toggle={(val) => setIsSignInModalOpen(val)}
                  title={t("signInToContinue")}
                >
                  <form onSubmit={signIn}>
                    <Input
                      value={email}
                      onChange={onChange}
                      placeholder={t("writeEmail")}
                      type="email"
                    />
                    <Button>{t("continue")}</Button>
                  </form>
                </Modal>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
