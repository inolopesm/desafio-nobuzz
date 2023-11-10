import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "warn" | "error";
}

export default function Alert({ variant, className, ...props }: AlertProps) {
  return (
    <div
      className={classNames(styles.alert, styles[variant], className)}
      {...props}
    />
  );
}
