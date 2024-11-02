export type ID = string;
export type Metadata = {
  key: string;
  label: string;
  type: 'text' | 'price';
};

export type MetricRange = {
  startsAt: Date;
  endsAt: Date;
};