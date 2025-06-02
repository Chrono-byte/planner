import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

// Reusable Button component
// This creates a button element with some default styling
export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || !!props.disabled}
      class={`px-2 py-1 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors ${props.class || ""}`}
    /> 
  );
}
