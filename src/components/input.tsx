"use client";

import { forwardRef, InputHTMLAttributes, Ref, useState } from "react";

import VisibilityOffIcon from "@/assets/visibility_off.svg";
import VisibilityOnIcon from "@/assets/visibility_on.svg";
import { cn } from "@/lib/cn";

const BASE_CLASS =
  "flex items-center justify-center space-x-2 rounded-xl border border-slate-50 bg-slate-50 px-6 py-3 text-base font-normal focus-within:border-blue-500 hover:border-blue-300";

const RESPONSIVE_CLASS = "h-[44px] w-[343px] md:h-[48px] md:w-[612px]";

function Input(
  {
    type = "text",
    value,
    onChange,
    className,
    ...props
  }: InputHTMLAttributes<HTMLInputElement>,
  ref?: Ref<HTMLInputElement>,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn(BASE_CLASS, RESPONSIVE_CLASS, className)}>
      <input
        className="m-0 flex-1 appearance-none border-none bg-transparent p-0 text-slate-800 outline-none placeholder:text-slate-400"
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"}
          aria-pressed={showPassword}
        >
          {showPassword ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
        </button>
      )}
    </div>
  );
}

export default forwardRef(Input);
