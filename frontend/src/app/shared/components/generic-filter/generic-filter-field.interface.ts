export interface FilterField {
  name: string; // tên property (key trong object emit)
  label: string; // label hiển thị
  type: 'text' | 'select' | 'date' | 'number';
  options?: { label: string; value: any }[]; // nếu là select
  placeholder?: string;
}
