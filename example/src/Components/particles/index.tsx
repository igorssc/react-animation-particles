import { ReactNode, useContext } from "react";
import {
  configParticlesProps,
  Particles as BackgroundParticles,
} from "react-animation-particles";
import { ConfigParticlesContext } from "../../hooks/useConfigParticles";

interface ParticlesProps {
  children: ReactNode;
}

export const Particles = ({ children }: ParticlesProps) => {
  const configParticles = useContext(ConfigParticlesContext);

  return (
    <>
      <BackgroundParticles config={configParticles as configParticlesProps}>
        {children}
      </BackgroundParticles>
    </>
  );
};
