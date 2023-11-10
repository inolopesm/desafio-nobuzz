import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs";
  fluid?: boolean;
}

export default function Container({
  className,
  maxWidth,
  fluid,
  ...props
}: ContainerProps) {
  return (
    <div
      className={classNames(
        styles.container,
        maxWidth && styles[maxWidth],
        fluid && styles.fluid,
        className
      )}
      {...props}
    />
  );
}
