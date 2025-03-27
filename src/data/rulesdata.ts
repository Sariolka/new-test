import type { IRule } from '@/types/types.ts';

export const minLength = (length: number): IRule => {
  return (value: string) => value.length >= length;
};

export const required: IRule = (value: any) => !!value;

export const validEmail: IRule = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const mustCheck: IRule = (value: boolean) => value === true;

export const isOld: IRule = (value: string) => {
  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return (
    age > 18 ||
    (age === 18 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)))
  );
};
