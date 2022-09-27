import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { formatObjectMode } from "..";
import { ConfigParticlesContext } from "../../../hooks/useConfigParticles";
import { Accordion } from "../../accordion";
import { InputCheckbox } from "../../input/checkbox";
import { InputColor } from "../../input/color";
import { InputRange } from "../../input/range";
import { InputSelect } from "../../input/select";
import { InputText } from "../../input/text";
import { Panel } from "../../panel";

export const ConfigParticles = () => {
  const { particles } = useContext(ConfigParticlesContext);

  const [particlesShapeType, setParticlesShapeType] = useState({
    circle: true,
    triangle: false,
    star: true,
    polygon: false,
    edge: false,
    image: false,
  });

  useEffect(() => {
    particles.shape.setType(
      formatObjectMode(particlesShapeType) as Array<
        "circle" | "triangle" | "star" | "polygon" | "edge" | "image"
      >
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particlesShapeType]);

  return (
    <>
      <Accordion title="Particles">
        <Accordion title="Number">
          <Panel title="Value">
            <InputRange
              min={1}
              max={500}
              value={particles.number.value}
              setValue={particles.number.setValue}
            />
          </Panel>
          <Panel title="Density">
            <InputCheckbox
              value={particles.number.density.enable}
              setValue={particles.number.density.setEnable}
            />
          </Panel>
          <Panel title="Density">
            <InputRange
              min={0}
              max={2000}
              value={particles.number.density.value_area}
              setValue={particles.number.density.setValueArea}
            />
          </Panel>
        </Accordion>
        <Accordion title="Color">
          <Panel title="Value">
            <InputColor
              color={particles.color.value}
              setColor={particles.color.setValue}
            />
          </Panel>
        </Accordion>
        <Accordion title="Shape">
          <Accordion title="Stroke">
            <Panel title="Width">
              <InputRange
                min={0}
                max={100}
                value={particles.shape.stroke.width}
                setValue={particles.shape.stroke.setWidth}
              />
            </Panel>
            <Panel title="Color">
              <InputColor
                color={particles.shape.stroke.color}
                setColor={particles.shape.stroke.setColor}
              />
            </Panel>
          </Accordion>
          <Accordion title="Polygon">
            <Panel title="Sides">
              <InputRange
                min={3}
                max={10}
                value={particles.shape.polygon.nb_sides}
                setValue={particles.shape.polygon.setNbSides}
              />
            </Panel>
          </Accordion>
          <Accordion title="Image">
            <Panel title="Source">
              <InputText
                value={particles.shape.image.src}
                setValue={particles.shape.image.setSrc}
              />
            </Panel>
            <Panel title="Width">
              <InputRange
                min={0}
                max={200}
                value={particles.shape.image.width}
                setValue={particles.shape.image.setWidth}
              />
            </Panel>
            <Panel title="Height">
              <InputRange
                min={0}
                max={200}
                value={particles.shape.image.height}
                setValue={particles.shape.image.setHeight}
              />
            </Panel>
          </Accordion>
          <Panel title="Type">
            <Panel title="Circle">
              <InputCheckbox
                value={particlesShapeType.circle}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    circle: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Triangle">
              <InputCheckbox
                value={particlesShapeType.triangle}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    triangle: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Star">
              <InputCheckbox
                value={particlesShapeType.star}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    star: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Polygon">
              <InputCheckbox
                value={particlesShapeType.polygon}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    polygon: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Edge">
              <InputCheckbox
                value={particlesShapeType.edge}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    edge: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Image">
              <InputCheckbox
                value={particlesShapeType.image}
                setValue={(isChecked: boolean) =>
                  setParticlesShapeType((current) => ({
                    ...current,
                    image: isChecked,
                  }))
                }
              />
            </Panel>
          </Panel>
        </Accordion>
        <Accordion title="Size">
          <Accordion title="Animation">
            <Panel title="Enable">
              <InputCheckbox
                value={particles.size.anim.enable}
                setValue={particles.size.anim.setEnable}
              />
            </Panel>
            <Panel title="Speed">
              <InputRange
                min={0}
                max={300}
                value={particles.size.anim.speed}
                setValue={particles.size.anim.setSpeed}
              />
            </Panel>
            <Panel title="Min size">
              <InputRange
                min={0}
                max={100}
                value={particles.size.anim.size_min}
                setValue={particles.size.anim.setSizeMin}
              />
            </Panel>
            <Panel title="Sync">
              <InputCheckbox
                value={particles.size.anim.sync}
                setValue={particles.size.anim.setSync}
              />
            </Panel>
          </Accordion>
          <Panel title="Value">
            <InputRange
              min={0}
              max={500}
              value={particles.size.value}
              setValue={particles.size.setValue}
            />
          </Panel>
          <Panel title="Random">
            <InputCheckbox
              value={particles.size.random}
              setValue={particles.size.setRandom}
            />
          </Panel>
        </Accordion>
        <Accordion title="Opacity">
          <Accordion title="Animation">
            <Panel title="Enable">
              <InputCheckbox
                value={particles.opacity.anim.enable}
                setValue={particles.opacity.anim.setEnable}
              />
            </Panel>
            <Panel title="Speed">
              <InputRange
                min={0}
                max={300}
                value={particles.opacity.anim.speed}
                setValue={particles.opacity.anim.setSpeed}
              />
            </Panel>
            <Panel title="Min opacity">
              <InputRange
                min={0}
                step={0.01}
                max={1}
                value={particles.opacity.anim.opacity_min}
                setValue={particles.opacity.anim.setOpacityMin}
              />
            </Panel>
            <Panel title="Sync">
              <InputCheckbox
                value={particles.opacity.anim.sync}
                setValue={particles.opacity.anim.setSync}
              />
            </Panel>
          </Accordion>
          <Panel title="Value">
            <InputRange
              min={0}
              step={0.01}
              max={1}
              value={particles.opacity.value}
              setValue={particles.opacity.setValue}
            />
          </Panel>
          <Panel title="Random">
            <InputCheckbox
              value={particles.opacity.random}
              setValue={particles.opacity.setRandom}
            />
          </Panel>
        </Accordion>
        <Accordion title="Line Linked">
          <Panel title="Enable">
            <InputCheckbox
              value={particles.line_linked.enable}
              setValue={particles.line_linked.setEnable}
            />
          </Panel>
          <Panel title="Distance">
            <InputRange
              min={0}
              max={2000}
              value={particles.line_linked.distance}
              setValue={particles.line_linked.setDistance}
            />
          </Panel>
          <Panel title="Color">
            <InputColor
              color={particles.line_linked.color}
              setColor={particles.line_linked.setColor}
            />
          </Panel>
          <Panel title="Opacity">
            <InputRange
              min={0}
              max={1}
              step={0.01}
              value={particles.line_linked.opacity}
              setValue={particles.line_linked.setOpacity}
            />
          </Panel>
          <Panel title="Width">
            <InputRange
              min={0}
              max={20}
              step={0.1}
              value={particles.line_linked.width}
              setValue={particles.line_linked.setWidth}
            />
          </Panel>
        </Accordion>
        <Accordion title="Move">
          <Panel title="Enable">
            <InputCheckbox
              value={particles.move.enable}
              setValue={particles.move.setEnable}
            />
          </Panel>
          <Panel title="Direction">
            <InputSelect
              items={[
                "none",
                "top",
                "top-right",
                "right",
                "bottom-right",
                "bottom",
                "bottom-left",
                "left",
                "top-left",
              ]}
              defaultValue={particles.move.direction}
              setValue={
                particles.move.setDirection as Dispatch<SetStateAction<string>>
              }
            />
          </Panel>
          <Panel title="Random">
            <InputCheckbox
              value={particles.move.random}
              setValue={particles.move.setRandom}
            />
          </Panel>
          <Panel title="Straight">
            <InputCheckbox
              value={particles.move.straight}
              setValue={particles.move.setStraight}
            />
          </Panel>
          <Panel title="Speed">
            <InputRange
              min={0}
              max={100}
              step={0.1}
              value={particles.move.speed}
              setValue={particles.move.setSpeed}
            />
          </Panel>
          <Panel title="Out mode">
            <InputSelect
              items={["out", "bounce"]}
              defaultValue={particles.move.out_mode}
              setValue={
                particles.move.setOutMode as Dispatch<SetStateAction<string>>
              }
            />
          </Panel>
          <Panel title="Attract enable">
            <InputCheckbox
              value={particles.move.attract.enable}
              setValue={particles.move.attract.setEnable}
            />
          </Panel>
          <Panel title="Attract rotate X">
            <InputRange
              min={0}
              max={10000}
              value={particles.move.attract.rotateX}
              setValue={particles.move.attract.setRotateX}
            />
          </Panel>
          <Panel title="Attract rotate Y">
            <InputRange
              min={0}
              max={10000}
              value={particles.move.attract.rotateY}
              setValue={particles.move.attract.setRotateY}
            />
          </Panel>
        </Accordion>
      </Accordion>
    </>
  );
};
