import { ref } from 'vue';
import type { IFormField, IFormValues } from '@/types/types.ts';

export const useFormValidation = (
  initialFields: Record<string, IFormField>,
  inputValuesRef: IFormValues,
) => {
  const errorMessages = ref<Record<string, string[]>>({});
  const isValid = ref(false);

  Object.keys(initialFields).forEach((key) => {
    errorMessages.value[key] = [];
  });

  const validateField = (name: string) => {
    const field = initialFields[name];
    const errors: string[] = [];

    if (field) {
      field.rules.forEach((rule, index) => {
        if (!rule(inputValuesRef[name])) {
          const errorMessage = field.errorMessages?.[index];
          if (errorMessage) {
            errors.push(errorMessage);
          }
        }
      });
    }
    errorMessages.value[name] = errors;
    updateIsValid();
  };

  //валидация на инпуте
  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name;
    if (!name) {
      console.error('В данных поля отсутствует name');
      return;
    }
    const { value, type } = target;
    inputValuesRef[name] = type === 'checkbox' ? target.checked : value;
    validateField(name);
  };

  //валидация
  const validateForm = () => {
    Object.keys(initialFields).forEach((key) => {
      validateField(key);
    });
    updateIsValid();
  };

  //проверка формы для правильного определения isValid
  const updateIsValid = () => {
    const allFieldsValid = Object.keys(initialFields).every((fieldName) => {
      const field = initialFields[fieldName];
      return field.rules.every((rule: (value: string) => boolean) =>
        rule(inputValuesRef[fieldName]),
      );
    });
    isValid.value =
      Object.values(errorMessages.value).every((errors) => errors.length === 0) && allFieldsValid;
  };

  return {
    errorMessages,
    isValid,
    handleChange,
    validateForm,
  };
};
