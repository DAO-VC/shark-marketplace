export default function ({ app: { i18n }, store, redirect, route }) {
  const locale = i18n.locale === i18n.defaultLocale ? "" : "/" + i18n.locale;
  const address = store.getters.wallet?.account ?? null;
  // Страницы, которые открыты для неавторизованного пользователя
  const pages = ["connect"];
  if (!address && !pages.find(i => route.name.includes(i))) {
    console.log("redirect to login..");
    redirect(`${locale}/connect`);
  } else if (address && !!pages.find(i => route.name.includes(i))) {
    console.log("redirect to account..");
    redirect(`${locale}/account`);
  }
  console.log("middleware:", address);
}
