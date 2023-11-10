import classNames from "../../utils/classNames";
import styles from "./styles.module.css";

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {}

export default function Table({ className, ...props }: TableProps) {
  return <table className={classNames(styles.table, className)} {...props} />;
}
