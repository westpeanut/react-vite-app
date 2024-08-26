import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Ref } from "react";
import { QRData } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeQrData = (data: QRData): string => {
  return JSON.stringify(data || {});
};

export const decodeQrData = (data: string): QRData => {
  return JSON.parse(data) || {};
};

type PossibleRef<T> = Ref<T> | undefined;

export function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (typeof ref === "object" && ref !== null && "current" in ref) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

export function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T | null) => {
    refs.forEach((ref) => assignRef(ref, node));
  };
}
