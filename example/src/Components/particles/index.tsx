import { Particles as BackgroundParticles } from "particles-ts";
import { ReactNode, useContext } from "react";
import { ConfigParticlesContext } from "../../hooks/useConfigParticles";

interface ParticlesProps {
  children: ReactNode;
}

export const Particles = ({ children }: ParticlesProps) => {
  const configParticles = useContext(ConfigParticlesContext);

  return (
    <>
      <BackgroundParticles config={configParticles}>
        {children}
      </BackgroundParticles>
    </>
  );
};
