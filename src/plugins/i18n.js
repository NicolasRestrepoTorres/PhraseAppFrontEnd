import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const messages = {
  'en': {
    en: "English",
    de: "German",
    form: {
      title: "Title",
      topic: "Topic",
      section: "Section",
      language: "Language",
      content: "Content",
      charactersLeft: "Characters left",
      submit: "Create article",
      submitting: "Creating article",
      languages: {
        en: "English",
        de: "German"
      },
      submitted: "Creation was successful",
      sentInfo: "Information sent",
      return: "Back to the main page"
    },
    creation:{
      title: "Create your own article for PhraseApp"
    },
    welcomeMsg: 'An automatic knowledge base in two languages',
    action: "Action"

  },
  'de': {
    en: "Englisch",
    de: "Deutsch",
    form: {
      title: "Titel",
      topic: "Thema",
      section: "Abschnitt",
      language: "Sprache",
      content: "Inhalt",
      charactersLeft: "Zeichen!",
      submit: "Weiter zum Erschaffen des Artikels",
      submitting: "Lädt",
      languages: {
        en: "Englisch",
        de: "Deutsch"
      }
    },
    creation:{
      title: "Erschaff dein eigener Artikel bei PhraseApp"
    },
    welcomeMsg: 'Eine automatische Wissensdatenbank in zwei Sprachen',
    action: "AKTION?"

  }
};

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});


export default i18n;
