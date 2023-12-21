import { useState } from "react";

export const useForm = ({ initialState }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    ...form,
    form,
    handleChange,
  };
};
