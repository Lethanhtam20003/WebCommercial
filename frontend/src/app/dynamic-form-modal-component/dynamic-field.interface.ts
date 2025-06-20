export interface DynamicField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date';
  required?: boolean;
  options?: string[]; // cho select
  defaultValue?: any;
}
