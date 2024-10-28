import type { Localization } from '../../types';

export const ru: Localization = {
  language: "Русский",
  logotypeText: "Логотип (Высота 40px, длина до 300px)",
  policy: {
    conditions: "Условия",
    confidentiality: "Конфиденциальность"
  },
  step0: {
    title: "Введите номер телефона",
    description: "Чтобы войти или зарегистрироваться",
    countryLabel: "Страна",
    searchPlaceholder: "Поиск",
    emptySearchText: "Ничего не найдено",
    mobilePhoneLabel: "Номер телефона",
    buttonText: "Продолжить"
  },
  step1: {
    title: "Введите код",
    description: "Отправлен по номеру",
    channelLabel: "Способ получения кода",
    codeLabel: "Введите код",
    buttonSendText: "Отправить",
    buttonNextText: "Продолжить",
    buttonPrevText: "Назад"
  },
  step2: {
    buttonTextBot: "Авторизоваться в боте",
    buttonTextCheck: "Проверить статус"
  },
  validationErrors: {
    required: "Поле обязательно для заполнения"
  }
}
