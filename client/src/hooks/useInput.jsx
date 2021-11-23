import { useState } from 'react';

export default function useInput(initialValue = {}) {
  const [value, setValue] = useState(initialValue);

  const onChangeInput = (e) => {
    setValue({ [e.target.name]: e.target.value});
  };

  return {
    value,
    onChangeInput,
  };
}
