import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface InputTextProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((value: string) => void);
}

export const InputText = ({ value, setValue }: InputTextProps) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
        />
      </div>
    </>
  );
};
