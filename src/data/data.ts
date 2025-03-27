import type { IForm, IFormValues } from '@/types/types.ts'
import { ref } from 'vue'

export const form: IForm = {
  name: {
    type: 'text',
    required: true,
    label: 'Ваше имя:',
    attributes: {
      name: 'name',
    },
    rules: [(value: string) => !!value, (value: string) => value.length >= 2],
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
    rules: [
      (value: string) => !!value,
      (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    ],
    errorMessages: ['Email обязателен.', 'Введите корректный email.'],
  },
  password: {
    type: 'password',
    required: true,
    attributes: {
      name: 'password',
    },
    label: 'Введите пароль:',
    rules: [(value: string) => !!value, (value: string) => value.length >= 6],
    errorMessages: ['Пароль обязателен.', 'Пароль должен содержать как минимум 6 символов.'],
  },
  textarea: {
    type: 'textarea',
    required: true,
    label: 'Пожелания:',
    attributes: {
      maxlength: 400,
      row: 8,
      name: 'textarea',
    },
    rules: [(value: string) => !!value, (value: string) => value.length >= 10],
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
    rules: [(value: string) => !!value],
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
    rules: [(value: string) => !!value],
  },
  terms: {
    type: 'checkbox',
    required: true,
    attributes: {
      name: 'terms',
    },
    label: 'Согласие на обработку данных',
    rules: [(value: boolean) => value === true],
  },
}

export const inputValuesRef: IFormValues = ref({
  name: '',
  email: '',
  password: '',
  textarea: '',
  country: '',
  terms: false,
  gender: '',
})
