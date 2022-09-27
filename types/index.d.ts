import { ReactNode } from "react";
import { configParticlesProps } from "../src/utils/particles/config";

type BackgroundParticlesProps = {
  children: ReactNode;
  config?: configParticlesProps;
};

export const BackgroundParticles: ({
  children,
  config,
}: BackgroundParticlesProps) => JSX.Element;

export type { configParticlesProps } from "../src/utils/particles/config";

export const load: (
  tag_id: string,
  config_json?: configParticlesProps,
  callback?: () => void
) => void;

export const destroy: () => void;
