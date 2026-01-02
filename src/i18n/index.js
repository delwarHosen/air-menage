import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";

const LANG_KEY = "APP_LANG";

// default fallback
let defaultLang = "en";

// check if Localization.locale exists
if (Localization.locale && Localization.locale.startsWith("fr")) {
  defaultLang = "fr";
}

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: { en: { translation: en }, fr: { translation: fr } },
  lng: defaultLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// load saved language
(async () => {
  const savedLang = await AsyncStorage.getItem(LANG_KEY);
  if (savedLang) i18n.changeLanguage(savedLang);
})();

export const changeLanguage = async (lang) => {
  await AsyncStorage.setItem(LANG_KEY, lang);
  i18n.changeLanguage(lang);
};

export default i18n;
