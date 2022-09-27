import styles from "./styles.module.css";

interface ButtonProps {
  text: string;
  onClick: () => any;
}

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <button className={styles.button}>{text}</button>
      </div>
    </>
  );
};
