<script setup lang="ts">
import { useFormValidation } from '@/helpers/useValidation.ts'
import { useBaseRequest } from '@/api/api.ts'
import { ref } from 'vue'
import { form, inputValuesRef } from '@/data/data.ts'


const initialValues = ref({ ...inputValuesRef.value })
const { errorMessages, isValid, handleChange, validateForm } = useFormValidation(
  form,
  inputValuesRef,
)
const { baseRequest, loading, success, error, data, resetState } = useBaseRequest()

const handleSubmitForm = async () => {
  validateForm()
  if (isValid.value) {
    try {
      const sendingData = {
        name: inputValuesRef.value.name,
        email: inputValuesRef.value.email,
        password: inputValuesRef.value.password,
        textarea: inputValuesRef.value.textarea,
        country: inputValuesRef.value.country,
        terms: inputValuesRef.value.terms,
        gender: inputValuesRef.value.gender,
      }
      const response = await baseRequest<any>('https://reqres.in/api/users', 'POST', sendingData)
      console.log('Успешный ответ:', data.value, response)
      Object.assign(inputValuesRef.value, initialValues.value)
      setTimeout(() => {
        resetState()
      }, 2000)
    } catch (error) {
      console.error('Ошибка при отправке формы:', error)
    }
  } else {
    console.log('Ошибки валидации:', errorMessages.value)
  }
}
//можно сделать через component, меньше кода, но у меня была проблема со сбросом значений после отправки формы
</script>

<template>
  <div class="container">
    <h1 class="container__title">Заполните заявку</h1>
    <form novalidate @submit.prevent="handleSubmitForm" class="container__form">
      <label
        class="container__label"
        v-for="(field, index) in form"
        :key="index"
        :class="{
          'container__label_type-checkbox': field.type === 'checkbox' || field.type === 'radio',
        }"
      >
        {{ field.label }}
        <template v-if="field.type === 'radio'">
          <div class="container__radio-group">
            <label v-for="option in field.radio" :key="option.value" class="container__radio-label">
              <input
                type="radio"
                v-bind="field.attributes"
                :value="option.value"
                v-model="inputValuesRef[field.attributes.name]"
                @change="handleChange"
                class="container__radio-input"
              />
              {{ option.label }}
            </label>
          </div>
        </template>
        <template v-if="field.type === 'textarea'">
          <textarea
            class="container__input"
            :class="{
              'container__input_type-textarea': field.type === 'textarea',
              container__input_invalid: errorMessages[field.attributes.name]?.length,
            }"
            v-model="inputValuesRef[field.attributes.name]"
            @input="handleChange"
            v-bind="field.attributes"
          />
        </template>
        <template v-if="field.type === 'checkbox'">
          <input
            class="container__input"
            :class="{
              'container__input_type-checkbox': field.type === 'checkbox'
            }"
            v-model="inputValuesRef[field.attributes.name]"
            @change="handleChange"
            v-bind="field.attributes"
            :type="field.type"
          />
        </template>
        <template v-if="field.type === 'select'">
          <select
            class="container__input"
            v-model="inputValuesRef[field.attributes.name]"
            @change="handleChange"
            v-bind="field.attributes"
          >
            <option value="">Выберите страну проживания</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </template>
        <template v-else>
          <input
            class="container__input"
            :class="{
              container__input_invalid: errorMessages[field.attributes.name]?.length,
            }"
            v-model="inputValuesRef[field.attributes.name]"
            @input="handleChange"
            v-if="
              field.type !== 'select' &&
              field.type !== 'radio' &&
              field.type !== 'checkbox' &&
              field.type !== 'textarea'
            "
            :type="field.type"
            v-bind="field.attributes"
          />
        </template>
        <span
          class="container__error-message"
          v-if="errorMessages[field.attributes.name]?.length"
          >{{ errorMessages[field.attributes.name][0] }}</span
        >
      </label>
      <button
        :disabled="!isValid || loading"
        type="submit"
        class="container__button-submit"
        :class="{
          'container__button-submit_error': error,
          'container__button-submit_success': success,
        }"
      >
        Отправить данные
      </button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px 40px;
  width: 470px;
  border-radius: 10px;
  border: 1px solid #292929;
}

.container__input_type-textarea {
  resize: none;
}

.container__form {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 2rem;
}

.container__label {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  position: relative;
}

.container__label_type-checkbox {
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  gap: 12px;
}

.container__input {
  padding: 7px 2px;
  border-radius: 6px;
  align-items: center;
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
  outline: transparent;
  width: 100%;
  font-style: normal;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.94px;
  color: #000;
}

.container__input_invalid {
  border-color: #c66363;
}

.container__title {
  margin-bottom: 30px;
  color: #1871e8;
  font-weight: 600;
}

.container__error-message {
  position: absolute;
  bottom: -18px;
  font-size: 12px;
  line-height: normal;
  color: #b91c1c;
  font-weight: 400;
}

.container__radio-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.container__button-submit {
  border: none;
  font-size: 16px;
  line-height: 19.36px;
  font-style: normal;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 19.5px;
  background-color: #1871e8;
  transition: opacity 0.3s ease-in-out;
  color: #fff;
  align-self: end;
}

.container__button-submit:disabled {
  opacity: 0.6;
  cursor: default;
}

.container__button-submit_success {
  background-color: #1d6509;
}

.container__button-submit_error {
  background-color: #b91c1c;
}
</style>
