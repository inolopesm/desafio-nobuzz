import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

export default function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={classNames(styles.checkbox, className)}
      {...props}
    />
  );
}
