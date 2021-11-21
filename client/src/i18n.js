import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
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
        form_button: 'Отправить',
      },
      sideBar: {
        notFound: 'Cтраница не найдена',
        registration: 'Регистрация',
        login: 'Вход',
        top: 'Топ',
        chat: 'Сообщения',
        lenta: 'Лента',
        subscribe: 'Рекомендации',
        tasks: 'Цели',
        profile: 'Профиль',
      },
    },
  },
  en: {
    translation: {
      form: {
        login_submit: 'Log in',
        register_submit: 'Register now',
        email: 'Email',
        first_name: 'Name',
        last_name: 'Surname',
        nickname: 'Nickname',
        password: 'password',
        password_confirm: 'Confirm the password',
        forgot_password: 'Forgot your password?',
      },
      report: {
        textarea: 'Detailed',
        title: 'Create goal completion report',
        form_button: 'Send',
      },
      sideBar: {
        notFound: 'Page not found',
        registration: 'Registration',
        login: 'Log in',
        top: 'Top',
        chat: 'Messages',
        lenta: 'Timeline',
        subscribe: 'Recommended',
        tasks: 'Goals',
        profile: 'Profile',
      },
    },
  },
  fr: {
    translation: {
      form: {
        login_submit: 'Connexion',
        register_submit: "S'inscrire",
        email: 'Email',
        first_name: 'Nom',
        last_name: 'Nom de famille',
        nickname: 'Surnom',
        password: 'le mot de passe',
        password_confirm: 'Confirmer le mot de passe',
        forgot_password: 'Mot de passe oublié?',
      },
      report: {
        textarea: 'Détaillé',
        title: "Créer un rapport d'achèvement des objectifs",
        form_button: 'Envoyer',
      },
      sideBar: {
        notFound: 'Page non trouvée',
        registration: 'Inscription',
        login: 'Connexion',
        top: 'Top',
        chat: 'Messages',
        lenta: 'Chronologie',
        subscribe: 'Conseillé',
        tasks: 'Buts',
        profile: 'Profil',
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
