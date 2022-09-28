import React, { Component, ReactNode } from "react";
import { Particles as BackgroundParticles } from "./Components/particles";
import { configParticlesProps } from "./utils/particles/config";
import { load as loadAnim } from "./utils/particles/index";

interface ParticlesProps {
  children: ReactNode;
  config?: configParticlesProps;
}

export class Particles extends Component<ParticlesProps> {
  render() {
    return (
      <React.StrictMode>
        <BackgroundParticles config={this.props.config}>
          {this.props.children}
        </BackgroundParticles>
      </React.StrictMode>
    );
  }
}

export type { configParticlesProps } from "./utils/particles/config";
export { destroy } from "./utils/particles/index";

export const load = (
  config_json?: configParticlesProps,
  callback?: () => void
) => loadAnim("particles-js", config_json, callback);
