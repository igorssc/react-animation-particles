import { Component, ReactNode } from "react";
import { destroy, load } from "../utils/particles";
import { configParticlesProps } from "../utils/particles/config";

interface ParticlesProps {
  config: configParticlesProps | undefined;
  children: ReactNode;
}

export class Particles extends Component<ParticlesProps> {
  componentDidMount = () => {
    typeof window !== "undefined" &&
      load("particles-js", this.props.config, function () {});
  };

  componentWillUnmount = () => {
    typeof window !== "undefined" && destroy();
  };

  componentDidUpdate = (nextProps: {
    config: configParticlesProps | undefined;
  }) => {
    if (nextProps.config !== this.props.config) {
      try {
        destroy();
      } catch {}

      load("particles-js", this.props.config, function () {});
    }
  };

  render(): ReactNode {
    return (
      <>
        <div id="particles-js" style={{ width: "100%" }}>
          {this.props.children}
        </div>
      </>
    );
  }
}
