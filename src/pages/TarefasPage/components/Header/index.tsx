import { useMemo } from "react";
import Button from "../../../../components/Button";
import useAuth from "../../../../hooks/useAuth";
import decodeJwt from "../../../../utils/decoreJwt";
import styles from "./styles.module.css";

export default function TarefasPageHeader() {
  const auth = useAuth();

  const payload = useMemo(
    () => decodeJwt<{ email: string }>(auth.accessToken),
    [auth.accessToken]
  );

  return (
    <div className={styles.header}>
      <div className={styles.brand}>Desafio NoBuzz</div>
      <div className={styles.user}>
        <div className={styles.userEmail}>{payload?.email}</div>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={auth.logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
