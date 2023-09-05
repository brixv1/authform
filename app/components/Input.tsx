"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
    block
    text-sm
    font-medium
    leading-6
    text-slate-100
    "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
          form-input
          block
          w-full 
          rounded-md 
          border-0 
          bg-neutral-800 
          py-1.5 
          text-slate-100 
          shadow-sm 
          ring-1 
          ring-inset 
          ring-neutral-700
          placeholder:text-gray-400 
          focus:ring-2 
          focus:ring-inset
           
          focus:ring-violet-600 
          sm:text-sm 
          sm:leading-6
          `,
            errors[id] && "focus:ring-rose-500",
            disabled && "cursor-default opacity-50",
          )}
        />
      </div>
    </div>
  );
};

export default Input;
