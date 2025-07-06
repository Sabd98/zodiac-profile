import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string|number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  min?: string;
  max?: string;
  required?:boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
  className = "",
  min,
  max,
  required,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-400 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          max={max}
          required
          className={`w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0E191F] ${
            icon ? "pl-10" : ""
          } ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
