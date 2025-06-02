import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

// Reusable Button component
// This creates a button element with some default styling
export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const baseClasses = "px-3 py-1 border border-gray-300 hover:bg-gray-100";
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || !!props.disabled}
      class={`${baseClasses} ${props.class || ""}`}
    />
  );
}
