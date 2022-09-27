import { useContext, useEffect, useState } from "react";
import { ConfigParticlesContext } from "../../../hooks/useConfigParticles";
import { Accordion } from "../../accordion";
import { InputCheckbox } from "../../input/checkbox";
import { InputColor } from "../../input/color";
import { InputSelect } from "../../input/select";
import { InputText } from "../../input/text";
import { Panel } from "../../panel";

export const ConfigSystem = () => {
  const { retina_detect, setRetinaDetect } = useContext(ConfigParticlesContext);

  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundSize, setBackgroundSize] = useState("cover");
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [backgroundRepeat, setBackgroundRepeat] = useState("no-repeat");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      backgroundColor
    );
  }, [backgroundColor]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-image",
      `url(${backgroundImage})`
    );
  }, [backgroundImage]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-size",
      backgroundSize
    );
  }, [backgroundSize]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-position",
      backgroundPosition
    );
  }, [backgroundPosition]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-repeat",
      backgroundRepeat
    );
  }, [backgroundRepeat]);

  return (
    <>
      <Accordion title="System">
        <Panel title="Retina detect">
          <InputCheckbox value={retina_detect} setValue={setRetinaDetect} />
        </Panel>
        <Panel title="Background Color">
          <InputColor color={backgroundColor} setColor={setBackgroundColor} />
        </Panel>
        <Panel title="Background Image">
          <InputText value={backgroundImage} setValue={setBackgroundImage} />
        </Panel>
        <Panel title="Background Position">
          <InputText
            value={backgroundPosition}
            setValue={setBackgroundPosition}
          />
        </Panel>
        <Panel title="Background size">
          <InputText value={backgroundSize} setValue={setBackgroundSize} />
        </Panel>
        <Panel title="Background Repeat">
          <InputSelect
            items={[
              "repeat",
              "repeat-x",
              "repeat-y",
              "no-repeat",
              "space",
              "round",
              "initial",
              "inherit",
            ]}
            defaultValue={backgroundRepeat}
            setValue={setBackgroundRepeat}
          />
        </Panel>
      </Accordion>
    </>
  );
};
