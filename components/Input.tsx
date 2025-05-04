import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => {
  return <input {...props} className="p-2 border rounded w-full" />;
};

export default Input;
