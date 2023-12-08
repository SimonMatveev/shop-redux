import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { DEFAULT_VALIDATION_MSG, EMAIL_VALIDATION_MSG, NAME_VALIDATION_MSG, REG_EXP_EMAIL, REG_EXP_NAME } from '../utils/constants';

export default function useFormAndValidation({ passwordCheck }: { passwordCheck: boolean }) {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, pattern, validity } = e.target;
    if (validity.patternMismatch) {
      let validityMsg = DEFAULT_VALIDATION_MSG;
      if (pattern === REG_EXP_EMAIL) validityMsg = EMAIL_VALIDATION_MSG;
      if (pattern === REG_EXP_NAME) validityMsg = NAME_VALIDATION_MSG;
      e.target.setCustomValidity(validityMsg);
    } else e.target.setCustomValidity('');

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form')!.checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  useEffect(() => {
    if (passwordCheck) {
      if (values.password !== values.password_2) {
        setIsValid(false);
        if (values.password_2 !== '' && values.password_2 !== undefined) {
          setErrors(prev => {
            return {
              ...prev,
              password_2: 'Пароли должны совпадать'
            }
          })
        } else {
          setErrors(prev => {
            return {
              ...prev,
              password_2: ''
            }
          })
        }
      } else {
        setErrors(prev => {
          return {
            ...prev,
            password_2: ''
          }
        })
      }
    }
  }, [values])

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors, };
}
