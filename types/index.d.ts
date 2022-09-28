import { ReactNode } from "react";
import { configParticlesProps } from "../src/utils/particles/config";

type ParticlesProps = {
  children: ReactNode;
  config?: configParticlesProps;
};

export const Particles: ({ children, config }: ParticlesProps) => JSX.Element;

export type { configParticlesProps } from "../src/utils/particles/config";

export const load: (
  config_json?: configParticlesProps,
  callback?: () => void
) => void;

export const destroy: () => void;
