import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
const messages = {
  'en': {
    en: "English",
    de: "German",
    create_article: "Create an article",
    questions: "Questions",
    back: "Back to the main menu",
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
    error: {
      fieldRequired: "Field required",
      fieldMaxLength: "Max length",
      invalidFields: "Invalid fields:",
    },
    creation:{
      title: "Create your own article for PhraseApp"
    },
    update:{
      title: "Updating the article: ",
      submit: "Edit this article!"
    },
    welcomeMsg: 'A knowledge base in two languages',
    action: "Action"

  },
  'de': {
    en: "Englisch",
    de: "Deutsch",
    create_article: "Erschaff ein Artikel",
    questions: "Fragen",
    back: "Zurück",
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
    error: {
      fieldRequired: "Erforderliches Feld",
      fieldMaxLength: "Maximale Lánge",
      invalidFields: "Ungültige Felder:",
    },
    creation:{
      title: "Erschaff dein eigener Artikel bei PhraseApp"
    },
    update:{
      title: "Bearbeite den Artikel unter der Name: ",
      submit: "Bearbeiten!"
    },
    welcomeMsg: 'Eine automatische Wissensdatenbank in zwei Sprachen',
    action: "Taten"

  }
};

export const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
});


export default i18n;
