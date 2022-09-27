import React, { Component, ReactNode } from "react";
import { Particles } from "./Components/particles";
import { configParticlesProps } from "./utils/particles/config";

interface BackgroundParticlesProps {
  children: ReactNode;
  config?: configParticlesProps;
}

export class BackgroundParticles extends Component<BackgroundParticlesProps> {
  render() {
    return (
      <React.StrictMode>
        <Particles config={this.props.config}>{this.props.children}</Particles>
      </React.StrictMode>
    );
  }
}

export type { configParticlesProps } from "./utils/particles/config";
export { destroy, load } from "./utils/particles/index";
