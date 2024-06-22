export interface DataProps {
  label: string;
  value: string;
}

export interface Props {
  label: string;
  data: DataProps[];
  value: DataProps | null;
  onChange: (val: DataProps | null) => void;
  disabled?: boolean;
}
