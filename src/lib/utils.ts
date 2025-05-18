import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const submitFormById = (id: string) => {
  const form = document.getElementById(id);
  form?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
};
