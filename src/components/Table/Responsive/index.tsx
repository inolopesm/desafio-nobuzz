import classNames from "../../../utils/classNames";
import styles from "./styles.module.css";

export interface TableResponsiveProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function TableResponsive({
  className,
  ...props
}: TableResponsiveProps) {
  return (
    <div className={classNames(styles.tableResponsive, className)} {...props} />
  );
}
