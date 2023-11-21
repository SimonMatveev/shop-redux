import { ChangeEvent, useState } from "react";

export function useForm(inputValues: { [key: string]: any }) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setValues({ ...values, [name]: !values[name] });
  };
  return { values, handleChange, setValues };
}