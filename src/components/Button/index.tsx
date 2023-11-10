import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "medium" | "small";
}

export default function Button({
  className,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
      {...props}
    />
  );
}
