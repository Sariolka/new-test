import type { IForm, IFormValues } from '@/types/types.ts';
import { ref } from 'vue';
import { isOld, minLength, mustCheck, required, validEmail } from '@/data/rulesdata.ts';

export const form: IForm = {
  name: {
    type: 'text',
    required: true,
    label: 'Ваше имя:',
    attributes: {
      name: 'name',
    },
    rules: [required, minLength(2)],
    errorMessages: ['Имя обязательно.', 'Имя должно содержать как минимум 2 символа.'],
  },
  email: {
    type: 'email',
    required: true,
    label: 'Введите email:',
    attributes: {
      type: 'email',
      placeholder: 'email@example.com',
      name: 'email',
    },
    rules: [required, validEmail],
    errorMessages: ['Email обязателен.', 'Введите корректный email.'],
  },
  password: {
    type: 'password',
    required: true,
    attributes: {
      name: 'password',
    },
    label: 'Введите пароль:',
    rules: [required, minLength(6)],
    errorMessages: ['Пароль обязателен.', 'Пароль должен содержать как минимум 6 символов.'],
  },
  textarea: {
    type: 'textarea',
    required: true,
    label: 'Пожелания:',
    attributes: {
      maxlength: 200,
      rows: 7,
      name: 'textarea',
    },
    rules: [required, minLength(10)],
    errorMessages: ['Обязательное поле.', 'Не менее 10 символов.'],
  },
  country: {
    type: 'select',
    required: true,
    attributes: {
      name: 'country',
    },
    label: 'Выберите страну:',
    options: [
      { value: 'ru', label: 'Россия' },
      { value: 'by', label: 'Беларусь' },
      { value: 'kz', label: 'Казахстан' },
      { value: 'ua', label: 'Украина' },
      { value: 'us', label: 'США' },
      { value: 'de', label: 'Германия' },
      { value: 'fr', label: 'Франция' },
      { value: 'cn', label: 'Китай' },
    ],
    rules: [required],
    errorMessages: ['Поле  обязательно для заполнения.'],
  },
  date: {
    type: 'date',
    required: true,
    attributes: {
      name: 'date',
    },
    label: 'Укажите дату рождения:',
    rules: [required, isOld],
    errorMessages: ['Поле  обязательно для заполнения.', 'Вам должно быть не менее 18 лет.'],
  },
  gender: {
    type: 'radio',
    required: true,
    attributes: {
      name: 'gender',
    },
    label: 'Выберите пол:',
    radio: [
      { value: 'f', label: 'Женский' },
      { value: 'm', label: 'Мужской' },
    ],
    rules: [required],
  },
  terms: {
    type: 'checkbox',
    required: true,
    attributes: {
      name: 'terms',
    },
    label: 'Согласие на обработку данных',
    rules: [mustCheck],
  },
};

export const inputValuesRef: IFormValues = ref({
  name: '',
  email: '',
  password: '',
  textarea: '',
  country: '',
  terms: false,
  gender: '',
  date: '',
});
