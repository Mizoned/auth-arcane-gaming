import type { Localization } from '../../types';

export const en: Localization = {
  language: 'English',
  logotypeText: "Logo (Height 40px, length up to 300px)",
  policy: {
    conditions: "Terms and Conditions",
    confidentiality: "Privacy"
  },
  step0: {
    title: "Enter phone number",
    description: "Log in or sign up",
    countryLabel: "Country",
    searchPlaceholder: "Search",
    emptySearchText: "Nothing found",
    mobilePhoneLabel: "Phone number",
    buttonText: "Continue"
  },
  step1: {
    title: "Enter code",
    description: "Sent to the number",
    channelLabel: "Code delivery method",
    codeLabel: "Enter code",
    buttonSendText: "Send",
    buttonNextText: "Continue",
    buttonPrevText: "Back"
  },
  step2: {
    buttonTextBot: "Authorize in bot",
    buttonTextCheck: "Check status"
  },
  validationErrors: {
    required: "This field is required"
  }
}
