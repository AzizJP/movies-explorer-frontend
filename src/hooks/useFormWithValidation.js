import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

export function useFormWithValidation(
  initialValues,
  initialErrors,
  initialValid
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(initialValid);

  const handleChange = evt => {
    const regexName = /^([a-zA-Z]|[а-яА-Я](| |-|))+$/;
    const {
      name,
      value,
      validity: { valid },
    } = evt.target;
    const validation = () => {
      if(name === 'email') {
        return isEmail(value)
      }
      if(name === 'name') {
        return regexName.test(value)
      }
      return valid
    }
    const validationMessage =() => {
      if(name === 'email') {
        if(!validation()) {
          if(value === '') {
            return 'Заполните это поле.'
          }
          return 'Поле должно соответствовать типу: example@yandex.com. Введите валидный адрес электронной почты'
        }
      }
      if(name === 'name') {
        if(!validation()) {
          if(value === '') {
            return 'Заполните это поле.'
          }
          return 'Поле должно начинаться с буквы и может содержать только кириллицу, латиницу, пробел и дефис'
        }
      }
      return evt.target.validationMessage
    }
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage() });
    setIsValid({ ...isValid, [name]: validation() });
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
  };
}
