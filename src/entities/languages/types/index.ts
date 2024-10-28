export type LanguageType = 'ru' | 'en';

export interface Language {
  name: string;
  value: LanguageType;
}

export interface Localization {
  language: string;
  logotypeText: string;
  policy: {
    conditions: string;
    confidentiality: string;
  };
  step0: {
    title: string;
    description: string;
    countryLabel: string;
    searchPlaceholder: string;
    emptySearchText: string;
    mobilePhoneLabel: string;
    buttonText: string;
  };
  step1: {
    title: string;
    description: string;
    channelLabel: string;
    codeLabel: string;
    buttonSendText: string;
    buttonNextText: string;
    buttonPrevText: string;
  };
  step2: {
    buttonTextBot: string;
    buttonTextCheck: string;
  };
  validationErrors: {
    required: string;
  };
}

export interface Localizations {
  ru: Localization;
  en: Localization;
}
