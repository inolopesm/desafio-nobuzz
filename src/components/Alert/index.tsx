import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "warn" | "error";
}

export default function Alert({ type, className, ...props }: AlertProps) {
  return (
    <div
      className={classNames(styles.alert, styles[type], className)}
      {...props}
    />
  );
}
