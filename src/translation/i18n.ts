import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./velogistics.en.json";
import de from "./velogistics.de.json";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en,
    de
};

let lng = "en";
const segments = window.location.pathname.split('/');
if (segments.length > 1) {
    if (segments[1] == "de") {
        lng = "de"
    }
}
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init(
        {
            resources,
            fallbackLng: "en",
            lng: lng,
            debug: true,
            keySeparator: false, // we do not use keys in form messages.welcome
            nsSeparator: false,
            interpolation: {
                escapeValue: false // react already safes from xss
            }
        },
        (err, t) => {
            if (err) return console.log("something went wrong loading", err);
            t("key"); // -> same as i18next.t
        }
    );

export default i18n;
