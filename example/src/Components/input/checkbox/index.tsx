import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";

interface InputCheckboxProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>> | ((isChecked: boolean) => void);
}

export const InputCheckbox = ({ value, setValue }: InputCheckboxProps) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
      </div>
    </>
  );
};
