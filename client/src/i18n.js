import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      pages: {
        auth: {
          title: 'Привет, с возвращением!',
          sub: 'Введите свои данные ниже.',
          create: 'Создать',
          q: 'Нет учетной записи?',
          remember: 'Запомнить меня',
          or: 'ИЛИ',
        },
        reg: {
          title: 'Начни абсолютно бесплатно.',
          sub: 'Бесплатно навсегда. Кредитная карта не требуется.',
          login: 'Войти',
          q: 'Уже есть аккаунт?',
          warning: 'Регистрируясь, я принимаю',
          politic: 'Политику конфиденциальности',
        },
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
      pages: {
        auth: {
          title: 'Hello, welcome back!',
          sub: 'Enter your info below.',
          create: 'Create',
          q: "Don't have an account?",
          remember: 'Remember me',
          or: 'OR',
        },
        reg: {
          title: 'Get started absolutely free.',
          sub: 'Free forever. No credit card required.',
          login: 'Log in',
          q: 'Have an account?',
          warning: 'By registering I accept',
          politic: 'Privacy policy',
        },
      },
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
      pages: {
        auth: {
          title: 'Bonjour, bon retour !',
          sub: 'Entrez vos informations ci-dessous.',
          create: 'Créer',
          q: "Vous n'avez pas de compte ?",
          remember: 'Souviens-toi de moi',
          or: 'OU',
        },
        reg: {
          title: 'Commencez tout à fait gratuitement.',
          sub: 'Libre pour toujours. Pas de carte de crédit nécessaire.',
          login: 'Connexion',
          q: 'Avoir un compte?',
          warning: "En m'inscrivant j'accepte",
          politic: 'Politique de confidentialité',
        },
      },
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
