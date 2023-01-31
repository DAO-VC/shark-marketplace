export default function ({ app: { i18n }, store, redirect, route }) {
  const locale = i18n.locale === i18n.defaultLocale ? "" : "/" + i18n.locale;
  // const pages = route.name.includes("login");
  const verify = store.getters.user?.emailVerified ?? null;
  if (store.getters.token && !verify) {
    if (confirm(`${i18n.t("EMAIL_VERIFIED_FAIL")}. ${i18n.t("CONFIRM_EMAIL")}?`)) {
      redirect(`${locale}/my/profile`);
    } else {
      redirect(`${locale}/my`);
    }
  }
}
