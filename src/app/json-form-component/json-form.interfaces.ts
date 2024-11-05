export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'checkbox' | 'select' | 'date';
  number: number;
  span: number;
  placeholder?: string;
  readonly?: boolean;
  options?: { value: string; label: string; }[];
  mask?: string;
}

export interface JsonFormConfig {
  columnStartNumbers: number[];
  fields: FormField[];
}

export type AdaptiveMode = "none" | "auto";