export default function ({ app: { i18n }, store, redirect, route }) {
  const locale = i18n.locale === i18n.defaultLocale ? "" : "/" + i18n.locale;
  const pages = ["auth", "r-id"];
  if (!store.getters.token && !pages.find(i => route.name.includes(i))) {
    console.log("redirect to login..");
    redirect(`${locale}/auth`);
  } else if (store.getters.token && !!pages.find(i => route.name.includes(i))) {
    console.log("redirect to home..");
    redirect(`${locale}/`);
  }
}
