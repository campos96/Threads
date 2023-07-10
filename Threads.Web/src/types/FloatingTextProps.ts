import { ChangeEvent } from "react";

type FloatingTextProps = {
  name: string;
  label: string;
  value: string | undefined;
  errorMessage?: string | undefined;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  height?: number;
};

export default FloatingTextProps;
