import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { configParticles as configParticlesDefault } from "../utils/particles.config";

interface ConfigParticlesProviderProps {
  children: ReactNode;
}

interface ConfigContextData {
  particles: {
    number: {
      value: number;
      setValue: Dispatch<SetStateAction<number>>;
      density: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        value_area: number;
        setValueArea: Dispatch<SetStateAction<number>>;
      };
    };
    color: {
      value:
        | string
        | {
            r: number;
            g: number;
            b: number;
            h: never;
            s: never;
            l: never;
          }
        | {
            h: number;
            s: number;
            l: number;
            r: never;
            g: never;
            b: never;
          }
        | string[];
      setValue: Dispatch<
        SetStateAction<
          | string
          | {
              r: number;
              g: number;
              b: number;
              h: never;
              s: never;
              l: never;
            }
          | {
              h: number;
              s: number;
              l: number;
              r: never;
              g: never;
              b: never;
            }
          | string[]
        >
      >;
    };
    shape: {
      type:
        | "circle"
        | "edge"
        | "triangle"
        | "polygon"
        | "star"
        | "image"
        | ("circle" | "edge" | "triangle" | "polygon" | "star" | "image")[];
      setType: Dispatch<
        SetStateAction<
          | "circle"
          | "edge"
          | "triangle"
          | "polygon"
          | "star"
          | "image"
          | ("circle" | "edge" | "triangle" | "polygon" | "star" | "image")[]
        >
      >;
      stroke: {
        width: number;
        setWidth: Dispatch<SetStateAction<number>>;
        color: string;
        setColor: Dispatch<SetStateAction<string>>;
      };
      polygon: {
        nb_sides: number;
        setNbSides: Dispatch<SetStateAction<number>>;
      };
      image: {
        src: string | undefined;
        setSrc: Dispatch<SetStateAction<string | undefined>>;
        width: number | undefined;
        setWidth: Dispatch<SetStateAction<number | undefined>>;
        height: number | undefined;
        setHeight: Dispatch<SetStateAction<number | undefined>>;
      };
    };
    opacity: {
      value: number;
      setValue: Dispatch<SetStateAction<number>>;
      random: boolean;
      setRandom: Dispatch<SetStateAction<boolean>>;
      anim: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        speed: number;
        setSpeed: Dispatch<SetStateAction<number>>;
        opacity_min: number;
        setOpacityMin: Dispatch<SetStateAction<number>>;
        sync: boolean;
        setSync: Dispatch<SetStateAction<boolean>>;
      };
    };
    size: {
      value: number;
      setValue: Dispatch<SetStateAction<number>>;
      random: boolean;
      setRandom: Dispatch<SetStateAction<boolean>>;
      anim: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        speed: number;
        setSpeed: Dispatch<SetStateAction<number>>;
        size_min: number;
        setSizeMin: Dispatch<SetStateAction<number>>;
        sync: boolean;
        setSync: Dispatch<SetStateAction<boolean>>;
      };
    };
    line_linked: {
      enable: boolean;
      setEnable: Dispatch<SetStateAction<boolean>>;
      distance: number;
      setDistance: Dispatch<SetStateAction<number>>;
      color: string;
      setColor: Dispatch<SetStateAction<string>>;
      opacity: number;
      setOpacity: Dispatch<SetStateAction<number>>;
      width: number;
      setWidth: Dispatch<SetStateAction<number>>;
    };
    move: {
      enable: boolean;
      setEnable: Dispatch<SetStateAction<boolean>>;
      speed: number;
      setSpeed: Dispatch<SetStateAction<number>>;
      direction:
        | "none"
        | "top"
        | "top-right"
        | "right"
        | "bottom-right"
        | "bottom"
        | "bottom-left"
        | "left"
        | "top-left";
      setDirection: Dispatch<
        SetStateAction<
          | "none"
          | "top"
          | "top-right"
          | "right"
          | "bottom-right"
          | "bottom"
          | "bottom-left"
          | "left"
          | "top-left"
        >
      >;
      random: boolean;
      setRandom: Dispatch<SetStateAction<boolean>>;
      straight: boolean;
      setStraight: Dispatch<SetStateAction<boolean>>;
      out_mode: "out" | "bounce";
      setOutMode: Dispatch<SetStateAction<"out" | "bounce">>;
      bounce: boolean;
      setBounce: Dispatch<SetStateAction<boolean>>;
      attract: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        rotateX: number;
        setRotateX: Dispatch<SetStateAction<number>>;
        rotateY: number;
        setRotateY: Dispatch<SetStateAction<number>>;
      };
    };
  };
  interactivity: {
    detect_on: "canvas" | "window";
    setDetectOn: Dispatch<SetStateAction<"canvas" | "window">>;
    events: {
      onhover: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        mode: "grab" | "bubble" | "repulse" | ("grab" | "bubble" | "repulse")[];
        setMode: Dispatch<
          SetStateAction<
            "grab" | "bubble" | "repulse" | ("grab" | "bubble" | "repulse")[]
          >
        >;
      };
      onclick: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        mode:
          | "bubble"
          | "repulse"
          | "push"
          | "remove"
          | ("bubble" | "repulse" | "push" | "remove")[];
        setMode: Dispatch<
          SetStateAction<
            | "bubble"
            | "repulse"
            | "push"
            | "remove"
            | ("bubble" | "repulse" | "push" | "remove")[]
          >
        >;
      };
      resize: boolean;
      setResize: Dispatch<SetStateAction<boolean>>;
    };
    modes: {
      grab: {
        distance: number;
        setDistance: Dispatch<SetStateAction<number>>;
        line_linked: {
          opacity: number;
          setOpacity: Dispatch<SetStateAction<number>>;
        };
      };
      bubble: {
        distance: number;
        setDistance: Dispatch<SetStateAction<number>>;
        size: number;
        setSize: Dispatch<SetStateAction<number>>;
        duration: number;
        setDuration: Dispatch<SetStateAction<number>>;
        opacity: number;
        setOpacity: Dispatch<SetStateAction<number>>;
        speed: number;
        setSpeed: Dispatch<SetStateAction<number>>;
      };
      repulse: {
        distance: number;
        setDistance: Dispatch<SetStateAction<number>>;
        duration: number;
        setDuration: Dispatch<SetStateAction<number>>;
      };
      push: {
        particles_nb: number;
        setParticlesNb: Dispatch<SetStateAction<number>>;
      };
      remove: {
        particles_nb: number;
        setParticlesNb: Dispatch<SetStateAction<number>>;
      };
    };
  };
  retina_detect: boolean;
  setRetinaDetect: Dispatch<SetStateAction<boolean>>;
}

export const ConfigParticlesContext = createContext<ConfigContextData>(
  {} as ConfigContextData
);

export const ConfigParticlesProvider = ({
  children,
}: ConfigParticlesProviderProps) => {
  const [particlesNumberValue, setParticlesNumberValue] = useState(
    configParticlesDefault.particles.number.value
  );
  const [particlesNumberDensityEnable, setParticlesNumberDensityEnable] =
    useState(configParticlesDefault.particles.number.density.enable);
  const [particlesNumberDensityArea, setParticlesNumberDensityArea] = useState(
    configParticlesDefault.particles.number.density.value_area
  );
  const [particlesColorValue, setParticlesColorValue] = useState(
    configParticlesDefault.particles.color.value
  );
  const [particlesShapeType, setParticlesShapeType] = useState(
    configParticlesDefault.particles.shape.type
  );
  const [particlesShapeStrokeWidth, setParticlesShapeStrokeWidth] = useState(
    configParticlesDefault.particles.shape.stroke.width
  );
  const [particlesShapeStrokeColor, setParticlesShapeStrokeColor] = useState(
    configParticlesDefault.particles.shape.stroke.color
  );
  const [particlesShapePolygonSides, setParticlesShapePolygonSides] = useState(
    configParticlesDefault.particles.shape.polygon.nb_sides
  );
  const [particlesShapeImageSrc, setParticlesShapeImageSrc] = useState(
    configParticlesDefault.particles.shape.image?.src
  );
  const [particlesShapeImageWidth, setParticlesShapeImageWidth] = useState(
    configParticlesDefault.particles.shape.image?.width
  );
  const [particlesShapeImageHeight, setParticlesShapeImageHeight] = useState(
    configParticlesDefault.particles.shape.image?.height
  );
  const [particlesOpacityValue, setParticlesOpacityValue] = useState(
    configParticlesDefault.particles.opacity.value
  );
  const [particlesOpacityRandom, setParticlesOpacityRandom] = useState(
    configParticlesDefault.particles.opacity.random
  );
  const [particlesOpacityAnimEnable, setParticlesOpacityAnimEnable] = useState(
    configParticlesDefault.particles.opacity.anim.enable
  );
  const [particlesOpacityAnimSpeed, setParticlesOpacityAnimSpeed] = useState(
    configParticlesDefault.particles.opacity.anim.speed
  );
  const [particlesOpacityAnimOpacityMin, setParticlesOpacityAnimOpacityMin] =
    useState(configParticlesDefault.particles.opacity.anim.opacity_min);
  const [particlesOpacityAnimSync, setParticlesOpacityAnimSync] = useState(
    configParticlesDefault.particles.opacity.anim.sync
  );
  const [particlesSizeValue, setParticlesSizeValue] = useState(
    configParticlesDefault.particles.size.value
  );
  const [particlesSizeRandom, setParticlesSizeRandom] = useState(
    configParticlesDefault.particles.size.random
  );
  const [particlesSizeAnimEnable, setParticlesSizeAnimEnable] = useState(
    configParticlesDefault.particles.size.anim.enable
  );
  const [particlesSizeAnimSpeed, setParticlesSizeAnimSpeed] = useState(
    configParticlesDefault.particles.size.anim.speed
  );
  const [particlesSizeAnimSizeMin, setParticlesSizeAnimSizeMin] = useState(
    configParticlesDefault.particles.size.anim.size_min
  );
  const [particlesSizeAnimSync, setParticlesSizeAnimSync] = useState(
    configParticlesDefault.particles.size.anim.sync
  );
  const [particlesLineLinkedEnable, setParticlesLineLinkedEnable] = useState(
    configParticlesDefault.particles.line_linked.enable
  );
  const [particlesLineLinkedDistance, setParticlesLineLinkedDistance] =
    useState(configParticlesDefault.particles.line_linked.distance);
  const [particlesLineLinkedColor, setParticlesLineLinkedColor] = useState(
    configParticlesDefault.particles.line_linked.color
  );
  const [particlesLineLinkedOpacity, setParticlesLineLinkedOpacity] = useState(
    configParticlesDefault.particles.line_linked.opacity
  );
  const [particlesLineLinkedWidth, setParticlesLineLinkedWidth] = useState(
    configParticlesDefault.particles.line_linked.width
  );
  const [particlesMoveEnable, setParticlesMoveEnable] = useState(
    configParticlesDefault.particles.move.enable
  );
  const [particlesMoveSpeed, setParticlesMoveSpeed] = useState(
    configParticlesDefault.particles.move.speed
  );
  const [particlesMoveDirection, setParticlesMoveDirection] = useState(
    configParticlesDefault.particles.move.direction
  );
  const [particlesMoveRandom, setParticlesMoveRandom] = useState(
    configParticlesDefault.particles.move.random
  );
  const [particlesMoveStraight, setParticlesMoveStraight] = useState(
    configParticlesDefault.particles.move.straight
  );
  const [particlesMoveOutMode, setParticlesMoveOutMode] = useState(
    configParticlesDefault.particles.move.out_mode
  );
  const [particlesMoveBounce, setParticlesMoveBounce] = useState(
    configParticlesDefault.particles.move.bounce
  );
  const [particlesMoveAttractEnable, setParticlesMoveAttractEnable] = useState(
    configParticlesDefault.particles.move.attract.enable
  );
  const [particlesMoveAttractRotateX, setParticlesMoveAttractRotateX] =
    useState(configParticlesDefault.particles.move.attract.rotateX);
  const [particlesMoveAttractRotateY, setParticlesMoveAttractRotateY] =
    useState(configParticlesDefault.particles.move.attract.rotateY);

  const [interactivityDetectOn, setInteractivityDetectOn] = useState(
    configParticlesDefault.interactivity.detect_on
  );
  const [
    interactivityEventsOnHoverEnable,
    setInteractivityEventsOnHoverEnable,
  ] = useState(configParticlesDefault.interactivity.events.onhover.enable);
  const [interactivityEventsOnHoverMode, setInteractivityEventsOnHoverMode] =
    useState(configParticlesDefault.interactivity.events.onhover.mode);
  const [
    interactivityEventsOnClickEnable,
    setInteractivityEventsOnClickEnable,
  ] = useState(configParticlesDefault.interactivity.events.onclick.enable);
  const [interactivityEventsOnClickMode, setInteractivityEventsOnClickMode] =
    useState(configParticlesDefault.interactivity.events.onclick.mode);
  const [interactivityEventsResize, setInteractivityEventsResize] = useState(
    configParticlesDefault.interactivity.events.resize
  );
  const [interactivityModesGrabDistance, setInteractivityModesGrabDistance] =
    useState(configParticlesDefault.interactivity.modes.grab.distance);
  const [
    interactivityModesGrabLineLinkedOpacity,
    setInteractivityModesGrabLineLinkedOpacity,
  ] = useState(
    configParticlesDefault.interactivity.modes.grab.line_linked.opacity
  );
  const [
    interactivityModesBubbleDistance,
    setInteractivityModesBubbleDistance,
  ] = useState(configParticlesDefault.interactivity.modes.bubble.distance);
  const [interactivityModesBubbleSize, setInteractivityModesBubbleSize] =
    useState(configParticlesDefault.interactivity.modes.bubble.size);
  const [
    interactivityModesBubbleDuration,
    setInteractivityModesBubbleDuration,
  ] = useState(configParticlesDefault.interactivity.modes.bubble.duration);
  const [interactivityModesBubbleOpacity, setInteractivityModesBubbleOpacity] =
    useState(configParticlesDefault.interactivity.modes.bubble.opacity);
  const [interactivityModesBubbleSpeed, setInteractivityModesBubbleSpeed] =
    useState(configParticlesDefault.interactivity.modes.bubble.speed);
  const [
    interactivityModesRepulseDistance,
    setInteractivityModesRepulseDistance,
  ] = useState(configParticlesDefault.interactivity.modes.repulse.distance);
  const [
    interactivityModesRepulseDuration,
    setInteractivityModesRepulseDuration,
  ] = useState(configParticlesDefault.interactivity.modes.repulse.duration);
  const [interactivityModesPushNumbers, setInteractivityModesPushNumbers] =
    useState(configParticlesDefault.interactivity.modes.push.particles_nb);
  const [interactivityModesRemoveNumbers, setInteractivityModesRemoveNumbers] =
    useState(configParticlesDefault.interactivity.modes.remove.particles_nb);

  const [retinaDetect, setRetinaDetect] = useState(
    configParticlesDefault.retina_detect
  );

  const configParticles = {
    particles: {
      number: {
        value: particlesNumberValue,
        setValue: setParticlesNumberValue,
        density: {
          enable: particlesNumberDensityEnable,
          setEnable: setParticlesNumberDensityEnable,
          value_area: particlesNumberDensityArea,
          setValueArea: setParticlesNumberDensityArea,
        },
      },
      color: {
        value: particlesColorValue,
        setValue: setParticlesColorValue,
      },
      shape: {
        type: particlesShapeType,
        setType: setParticlesShapeType,
        stroke: {
          width: particlesShapeStrokeWidth,
          setWidth: setParticlesShapeStrokeWidth,
          color: particlesShapeStrokeColor,
          setColor: setParticlesShapeStrokeColor,
        },
        polygon: {
          nb_sides: particlesShapePolygonSides,
          setNbSides: setParticlesShapePolygonSides,
        },
        image: {
          src: particlesShapeImageSrc,
          setSrc: setParticlesShapeImageSrc,
          width: particlesShapeImageWidth,
          setWidth: setParticlesShapeImageWidth,
          height: particlesShapeImageHeight,
          setHeight: setParticlesShapeImageHeight,
        },
      },
      opacity: {
        value: particlesOpacityValue,
        setValue: setParticlesOpacityValue,
        random: particlesOpacityRandom,
        setRandom: setParticlesOpacityRandom,
        anim: {
          enable: particlesOpacityAnimEnable,
          setEnable: setParticlesOpacityAnimEnable,
          speed: particlesOpacityAnimSpeed,
          setSpeed: setParticlesOpacityAnimSpeed,
          opacity_min: particlesOpacityAnimOpacityMin,
          setOpacityMin: setParticlesOpacityAnimOpacityMin,
          sync: particlesOpacityAnimSync,
          setSync: setParticlesOpacityAnimSync,
        },
      },
      size: {
        value: particlesSizeValue,
        setValue: setParticlesSizeValue,
        random: particlesSizeRandom,
        setRandom: setParticlesSizeRandom,
        anim: {
          enable: particlesSizeAnimEnable,
          setEnable: setParticlesSizeAnimEnable,
          speed: particlesSizeAnimSpeed,
          setSpeed: setParticlesSizeAnimSpeed,
          size_min: particlesSizeAnimSizeMin,
          setSizeMin: setParticlesSizeAnimSizeMin,
          sync: particlesSizeAnimSync,
          setSync: setParticlesSizeAnimSync,
        },
      },
      line_linked: {
        enable: particlesLineLinkedEnable,
        setEnable: setParticlesLineLinkedEnable,
        distance: particlesLineLinkedDistance,
        setDistance: setParticlesLineLinkedDistance,
        color: particlesLineLinkedColor,
        setColor: setParticlesLineLinkedColor,
        opacity: particlesLineLinkedOpacity,
        setOpacity: setParticlesLineLinkedOpacity,
        width: particlesLineLinkedWidth,
        setWidth: setParticlesLineLinkedWidth,
      },
      move: {
        enable: particlesMoveEnable,
        setEnable: setParticlesMoveEnable,
        speed: particlesMoveSpeed,
        setSpeed: setParticlesMoveSpeed,
        direction: particlesMoveDirection,
        setDirection: setParticlesMoveDirection,
        random: particlesMoveRandom,
        setRandom: setParticlesMoveRandom,
        straight: particlesMoveStraight,
        setStraight: setParticlesMoveStraight,
        out_mode: particlesMoveOutMode,
        setOutMode: setParticlesMoveOutMode,
        bounce: particlesMoveBounce,
        setBounce: setParticlesMoveBounce,
        attract: {
          enable: particlesMoveAttractEnable,
          setEnable: setParticlesMoveAttractEnable,
          rotateX: particlesMoveAttractRotateX,
          setRotateX: setParticlesMoveAttractRotateX,
          rotateY: particlesMoveAttractRotateY,
          setRotateY: setParticlesMoveAttractRotateY,
        },
      },
    },
    interactivity: {
      detect_on: interactivityDetectOn,
      setDetectOn: setInteractivityDetectOn,
      events: {
        onhover: {
          enable: interactivityEventsOnHoverEnable,
          setEnable: setInteractivityEventsOnHoverEnable,
          mode: interactivityEventsOnHoverMode,
          setMode: setInteractivityEventsOnHoverMode,
        },
        onclick: {
          enable: interactivityEventsOnClickEnable,
          setEnable: setInteractivityEventsOnClickEnable,
          mode: interactivityEventsOnClickMode,
          setMode: setInteractivityEventsOnClickMode,
        },
        resize: interactivityEventsResize,
        setResize: setInteractivityEventsResize,
      },
      modes: {
        grab: {
          distance: interactivityModesGrabDistance,
          setDistance: setInteractivityModesGrabDistance,
          line_linked: {
            opacity: interactivityModesGrabLineLinkedOpacity,
            setOpacity: setInteractivityModesGrabLineLinkedOpacity,
          },
        },
        bubble: {
          distance: interactivityModesBubbleDistance,
          setDistance: setInteractivityModesBubbleDistance,
          size: interactivityModesBubbleSize,
          setSize: setInteractivityModesBubbleSize,
          duration: interactivityModesBubbleDuration,
          setDuration: setInteractivityModesBubbleDuration,
          opacity: interactivityModesBubbleOpacity,
          setOpacity: setInteractivityModesBubbleOpacity,
          speed: interactivityModesBubbleSpeed,
          setSpeed: setInteractivityModesBubbleSpeed,
        },
        repulse: {
          distance: interactivityModesRepulseDistance,
          setDistance: setInteractivityModesRepulseDistance,
          duration: interactivityModesRepulseDuration,
          setDuration: setInteractivityModesRepulseDuration,
        },
        push: {
          particles_nb: interactivityModesPushNumbers,
          setParticlesNb: setInteractivityModesPushNumbers,
        },
        remove: {
          particles_nb: interactivityModesRemoveNumbers,
          setParticlesNb: setInteractivityModesRemoveNumbers,
        },
      },
    },
    retina_detect: retinaDetect,
    setRetinaDetect: setRetinaDetect,
  };

  return (
    <ConfigParticlesContext.Provider value={configParticles}>
      {children}
    </ConfigParticlesContext.Provider>
  );
};

export function useConfigParticles() {
  const context = useContext(ConfigParticlesContext);

  return context;
}
