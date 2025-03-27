export type IRule = (value: any) => boolean;

export interface IFormField {
  type: string;
  required: boolean;
  label: string;
  options?: { value: string; label: string }[];
  radio?: { value: string; label: string }[];
  rules: IRule[];
  errorMessages?: string[];
  attributes: Record<string, any>;
}

export interface IForm {
  [key: string]: IFormField;
}

export interface IFormValues {
  [fieldName: string]: any;
}
