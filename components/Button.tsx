import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

// Reusable Button component
// This creates a button element with some default styling
export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const baseClasses =
    "px-4 py-2 border border-gray-500 rounded hover:bg-green-700 transition-colors";
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || !!props.disabled}
      class={`${baseClasses} ${props.class || ""}`}
    />
  );
}
