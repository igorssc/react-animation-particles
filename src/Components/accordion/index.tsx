import { ReactNode, useState } from "react";
import carteImg from "../../assets/caret-right-bold.svg";
import styles from "./styles.module.css";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleAccordion = () => {
    setIsVisible((current) => !current);
  };

  return (
    <>
      <button className={styles.accordion} onClick={toggleAccordion}>
        <img
          src={carteImg}
          alt=""
          className={`${styles.icon} ${isVisible && styles.visible}`}
        />
        {title}
      </button>
      <div className={`${styles.panel} ${isVisible && styles.visible}`}>
        <div>{children}</div>
      </div>
    </>
  );
};
