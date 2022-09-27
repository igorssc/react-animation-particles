import { configParticlesProps } from "particles-ts";
import { useContext } from "react";
import { ConfigParticlesContext } from "../../hooks/useConfigParticles";
import { Button } from "../button";
import { ConfigInteractivities } from "./interactivities";
import { ConfigParticles } from "./particles";
import styles from "./styles.module.css";
import { ConfigSystem } from "./system";

export const formatObjectMode = (obj: Object) => {
  return Object.entries(obj)
    .filter((item) => item[1])
    .map((item) => item[0]);
};

export const Controls = () => {
  const { particles, interactivity, retina_detect } = useContext(
    ConfigParticlesContext
  );

  const exportImg = () => {
    const canvasElement = document.getElementsByClassName(
      "particles-js-canvas-el"
    );

    const MIME_TYPE = "image/png";

    const imgURL = (canvasElement[0] as HTMLCanvasElement).toDataURL(MIME_TYPE);

    const a = document.createElement("a");
    a.href = imgURL;
    a.download = "Image.png";
    a.click();
  };

  const exportJSON = () => {
    const json: configParticlesProps = {
      particles: {
        number: {
          value: particles.number.value,
          density: {
            enable: particles.number.density.enable,
            value_area: particles.number.density.value_area,
          },
        },
        color: {
          value: particles.color.value,
        },
        shape: {
          type: particles.shape.type,
          stroke: {
            width: particles.shape.stroke.width,
            color: particles.shape.stroke.color,
          },
          polygon: {
            nb_sides: particles.shape.polygon.nb_sides,
          },
          image: {
            src: particles.shape.image.src,
            width: particles.shape.image.width,
            height: particles.shape.image.height,
          },
        },
        opacity: {
          value: particles.opacity.value,
          random: particles.opacity.random,
          anim: {
            enable: particles.opacity.anim.enable,
            speed: particles.opacity.anim.speed,
            opacity_min: particles.opacity.anim.opacity_min,
            sync: particles.opacity.anim.sync,
          },
        },
        size: {
          value: particles.size.value,
          random: particles.size.random,
          anim: {
            enable: particles.size.anim.enable,
            speed: particles.size.anim.speed,
            size_min: particles.size.anim.size_min,
            sync: particles.size.anim.sync,
          },
        },
        line_linked: {
          enable: particles.line_linked.enable,
          distance: particles.line_linked.distance,
          color: particles.line_linked.color,
          opacity: particles.line_linked.opacity,
          width: particles.line_linked.width,
        },
        move: {
          enable: particles.move.enable,
          speed: particles.move.speed,
          direction: particles.move.direction,
          random: particles.move.random,
          straight: particles.move.straight,
          out_mode: particles.move.out_mode,
          bounce: particles.move.bounce,
          attract: {
            enable: particles.move.attract.enable,
            rotateX: particles.move.attract.rotateX,
            rotateY: particles.move.attract.rotateY,
          },
        },
      },
      interactivity: {
        detect_on: interactivity.detect_on,
        events: {
          onhover: {
            enable: interactivity.events.onhover.enable,
            mode: interactivity.events.onhover.mode,
          },
          onclick: {
            enable: interactivity.events.onclick.enable,
            mode: interactivity.events.onclick.mode,
          },
          resize: interactivity.events.resize,
        },
        modes: {
          grab: {
            distance: interactivity.modes.grab.distance,
            line_linked: {
              opacity: interactivity.modes.grab.line_linked.opacity,
            },
          },
          bubble: {
            distance: interactivity.modes.bubble.distance,
            size: interactivity.modes.bubble.size,
            duration: interactivity.modes.bubble.duration,
            opacity: interactivity.modes.bubble.opacity,
            speed: interactivity.modes.bubble.speed,
          },
          repulse: {
            distance: interactivity.modes.repulse.distance,
            duration: interactivity.modes.repulse.duration,
          },
          push: {
            particles_nb: interactivity.modes.push.particles_nb,
          },
          remove: {
            particles_nb: interactivity.modes.remove.particles_nb,
          },
        },
      },
      retina_detect: retina_detect,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json));

    const a = document.createElement("a");
    a.href = dataStr;
    a.download = "particles.config.json";
    a.click();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.controls}>
          <ConfigParticles />
          <ConfigInteractivities />
          <ConfigSystem />
          <br />
          <Button onClick={exportImg} text="Export image (PNG)" />
          <br />
          <Button onClick={exportJSON} text="Export current config (JSON)" />
        </div>
      </div>
    </>
  );
};
