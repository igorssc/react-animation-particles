import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

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
      value: string;
      setValue: Dispatch<SetStateAction<string>>;
    };
    shape: {
      type: Array<
        "circle" | "edge" | "triangle" | "polygon" | "star" | "image"
      >;
      setType: Dispatch<
        SetStateAction<
          Array<"circle" | "edge" | "triangle" | "polygon" | "star" | "image">
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
        src: string;
        setSrc: Dispatch<SetStateAction<string>>;
        width: number;
        setWidth: Dispatch<SetStateAction<number>>;
        height: number;
        setHeight: Dispatch<SetStateAction<number>>;
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
        mode: Array<"grab" | "bubble" | "repulse">;
        setMode: Dispatch<SetStateAction<Array<"grab" | "bubble" | "repulse">>>;
      };
      onclick: {
        enable: boolean;
        setEnable: Dispatch<SetStateAction<boolean>>;
        mode: Array<"push" | "remove" | "bubble" | "repulse">;
        setMode: Dispatch<
          SetStateAction<Array<"push" | "remove" | "bubble" | "repulse">>
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
  const [particlesNumberValue, setParticlesNumberValue] = useState(60);
  const [particlesNumberDensityEnable, setParticlesNumberDensityEnable] =
    useState(true);
  const [particlesNumberDensityArea, setParticlesNumberDensityArea] =
    useState(800);
  const [particlesColorValue, setParticlesColorValue] = useState("#199ada");
  const [particlesShapeType, setParticlesShapeType] = useState<
    Array<"circle" | "triangle" | "star" | "polygon" | "edge" | "image">
  >(["star"]);
  const [particlesShapeStrokeWidth, setParticlesShapeStrokeWidth] = useState(0);
  const [particlesShapeStrokeColor, setParticlesShapeStrokeColor] =
    useState("#000000");
  const [particlesShapePolygonSides, setParticlesShapePolygonSides] =
    useState(5);
  const [particlesShapeImageSrc, setParticlesShapeImageSrc] = useState("");
  const [particlesShapeImageWidth, setParticlesShapeImageWidth] = useState(300);
  const [particlesShapeImageHeight, setParticlesShapeImageHeight] =
    useState(300);
  const [particlesOpacityValue, setParticlesOpacityValue] = useState(0.5);
  const [particlesOpacityRandom, setParticlesOpacityRandom] = useState(false);
  const [particlesOpacityAnimEnable, setParticlesOpacityAnimEnable] =
    useState(false);
  const [particlesOpacityAnimSpeed, setParticlesOpacityAnimSpeed] = useState(1);
  const [particlesOpacityAnimOpacityMin, setParticlesOpacityAnimOpacityMin] =
    useState(0.1);
  const [particlesOpacityAnimSync, setParticlesOpacityAnimSync] =
    useState(false);
  const [particlesSizeValue, setParticlesSizeValue] = useState(3);
  const [particlesSizeRandom, setParticlesSizeRandom] = useState(true);
  const [particlesSizeAnimEnable, setParticlesSizeAnimEnable] = useState(false);
  const [particlesSizeAnimSpeed, setParticlesSizeAnimSpeed] = useState(40);
  const [particlesSizeAnimSizeMin, setParticlesSizeAnimSizeMin] = useState(0.1);
  const [particlesSizeAnimSync, setParticlesSizeAnimSync] = useState(false);
  const [particlesLineLinkedEnable, setParticlesLineLinkedEnable] =
    useState(true);
  const [particlesLineLinkedDistance, setParticlesLineLinkedDistance] =
    useState(150);
  const [particlesLineLinkedColor, setParticlesLineLinkedColor] =
    useState("#199ada");
  const [particlesLineLinkedOpacity, setParticlesLineLinkedOpacity] =
    useState(0.3);
  const [particlesLineLinkedWidth, setParticlesLineLinkedWidth] = useState(1);
  const [particlesMoveEnable, setParticlesMoveEnable] = useState(true);
  const [particlesMoveSpeed, setParticlesMoveSpeed] = useState(2);
  const [particlesMoveDirection, setParticlesMoveDirection] = useState<
    | "none"
    | "top"
    | "top-right"
    | "right"
    | "bottom-right"
    | "bottom"
    | "bottom-left"
    | "left"
    | "top-left"
  >("none");
  const [particlesMoveRandom, setParticlesMoveRandom] = useState(false);
  const [particlesMoveStraight, setParticlesMoveStraight] = useState(false);
  const [particlesMoveOutMode, setParticlesMoveOutMode] = useState<
    "out" | "bounce"
  >("out");
  const [particlesMoveBounce, setParticlesMoveBounce] = useState(false);
  const [particlesMoveAttractEnable, setParticlesMoveAttractEnable] =
    useState(false);
  const [particlesMoveAttractRotateX, setParticlesMoveAttractRotateX] =
    useState(600);
  const [particlesMoveAttractRotateY, setParticlesMoveAttractRotateY] =
    useState(1200);

  const [interactivityDetectOn, setInteractivityDetectOn] = useState<
    "canvas" | "window"
  >("canvas");
  const [
    interactivityEventsOnHoverEnable,
    setInteractivityEventsOnHoverEnable,
  ] = useState(false);
  const [interactivityEventsOnHoverMode, setInteractivityEventsOnHoverMode] =
    useState<Array<"grab" | "bubble" | "repulse">>(["grab"]);
  const [
    interactivityEventsOnClickEnable,
    setInteractivityEventsOnClickEnable,
  ] = useState(true);
  const [interactivityEventsOnClickMode, setInteractivityEventsOnClickMode] =
    useState<Array<"push" | "remove" | "bubble" | "repulse">>(["push"]);
  const [interactivityEventsResize, setInteractivityEventsResize] =
    useState(true);
  const [interactivityModesGrabDistance, setInteractivityModesGrabDistance] =
    useState(400);
  const [
    interactivityModesGrabLineLinkedOpacity,
    setInteractivityModesGrabLineLinkedOpacity,
  ] = useState(1);
  const [
    interactivityModesBubbleDistance,
    setInteractivityModesBubbleDistance,
  ] = useState(30);
  const [interactivityModesBubbleSize, setInteractivityModesBubbleSize] =
    useState(4);
  const [
    interactivityModesBubbleDuration,
    setInteractivityModesBubbleDuration,
  ] = useState(2);
  const [interactivityModesBubbleOpacity, setInteractivityModesBubbleOpacity] =
    useState(0.8);
  const [interactivityModesBubbleSpeed, setInteractivityModesBubbleSpeed] =
    useState(3);
  const [
    interactivityModesRepulseDistance,
    setInteractivityModesRepulseDistance,
  ] = useState(200);
  const [
    interactivityModesRepulseDuration,
    setInteractivityModesRepulseDuration,
  ] = useState(0.4);
  const [interactivityModesPushNumbers, setInteractivityModesPushNumbers] =
    useState(4);
  const [interactivityModesRemoveNumbers, setInteractivityModesRemoveNumbers] =
    useState(4);

  const [retinaDetect, setRetinaDetect] = useState(false);

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
