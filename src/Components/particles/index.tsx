import { ReactNode, useContext, useEffect, useState } from "react";
import { ConfigParticlesContext } from "../../hooks/useConfigParticles";
import { destroy, load } from "../../utils/particles";
import { configParticlesProps } from "../../utils/particles/config";
import styles from "./styles.module.css";

interface ParticlesProps {
  children: ReactNode;
}

export const Particles = ({ children }: ParticlesProps) => {
  const particles = useContext(ConfigParticlesContext);
  const [lastRenderedComponent, setLastRenderedComponent] = useState(
    new Date().getTime()
  );

  useEffect(() => {
    try {
      destroy();
    } catch {}

    load(
      "particles-js",
      particles as unknown as configParticlesProps,
      function () {}
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (new Date().getTime() - lastRenderedComponent > 200) {
      try {
        destroy();
      } catch {}

      load(
        "particles-js",
        particles as unknown as configParticlesProps,
        function () {}
      );

      setLastRenderedComponent(new Date().getTime());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particles]);
  return (
    <>
      <div id="particles-js" className={styles.container}>
        {children}
      </div>
    </>
  );
};
