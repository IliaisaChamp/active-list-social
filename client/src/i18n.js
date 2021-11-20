import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      main: {
        title: '',
      },
      button: {
        send: 'Отправить',
        cancel: 'Отменить',
        out: 'Выйти',
        go: 'Войти',
        reg: 'Зарегистрироваться',
      },
      form: {
        login_submit: 'Войти',
        register_submit: 'Зарегистрироваться',
        email: 'Электронная почта',
        first_name: 'Имя',
        last_name: 'Фамилия',
        nickname: 'Никнейм',
        password: 'Пароль',
        password_confirm: 'Подтвердите пароль',
        forgot_password: 'Забыли пароль?',
      },
      report: {
        textarea: 'Подробное описание',
        title: 'Создать отчет о выполнении цели',
        form_button: 'Создать отчет',
        title_rename: 'Переименовать канал',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
