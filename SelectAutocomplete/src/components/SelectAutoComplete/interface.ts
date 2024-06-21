export interface DataProps {
  label: string;
  value: string;
}

export interface Props {
  data: DataProps[];
  value: DataProps | null;
  onChange: (val: DataProps | null) => void;
}
