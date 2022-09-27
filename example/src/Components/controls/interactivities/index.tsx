import { useContext, useEffect, useState } from "react";
import { formatObjectMode } from "..";
import { ConfigParticlesContext } from "../../../hooks/useConfigParticles";
import { Accordion } from "../../accordion";
import { InputCheckbox } from "../../input/checkbox";
import { InputRange } from "../../input/range";
import { Panel } from "../../panel";

export const ConfigInteractivities = () => {
  const { interactivity } = useContext(ConfigParticlesContext);

  const [interactivityEventOnHover, setInteractivityEventOnHover] = useState({
    grab: true,
    bubble: false,
    repulse: false,
  });
  const [interactivityEventOnClick, setInteractivityEventOnClick] = useState({
    push: true,
    remove: false,
    bubble: false,
    repulse: false,
  });

  useEffect(() => {
    interactivity.events.onhover.setMode(
      formatObjectMode(interactivityEventOnHover) as Array<
        "grab" | "bubble" | "repulse"
      >
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactivityEventOnHover]);

  useEffect(() => {
    interactivity.events.onclick.setMode(
      formatObjectMode(interactivityEventOnClick) as Array<
        "push" | "remove" | "bubble" | "repulse"
      >
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interactivityEventOnClick]);

  return (
    <>
      <Accordion title="Interactivities">
        <Accordion title="Hover">
          <Panel title="Enable">
            <InputCheckbox
              value={interactivity.events.onhover.enable}
              setValue={interactivity.events.onhover.setEnable}
            />
          </Panel>
          <Panel title="Direction">
            <Panel title="Grab">
              <InputCheckbox
                value={interactivityEventOnHover.grab}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnHover((current) => ({
                    ...current,
                    grab: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Bubble">
              <InputCheckbox
                value={interactivityEventOnHover.bubble}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnHover((current) => ({
                    ...current,
                    bubble: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Repulse">
              <InputCheckbox
                value={interactivityEventOnHover.repulse}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnHover((current) => ({
                    ...current,
                    repulse: isChecked,
                  }))
                }
              />
            </Panel>
          </Panel>
        </Accordion>
        <Accordion title="Click">
          <Panel title="Enable">
            <InputCheckbox
              value={interactivity.events.onclick.enable}
              setValue={interactivity.events.onclick.setEnable}
            />
          </Panel>
          <Panel title="Direction">
            <Panel title="Push">
              <InputCheckbox
                value={interactivityEventOnClick.push}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnClick((current) => ({
                    ...current,
                    push: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Bubble">
              <InputCheckbox
                value={interactivityEventOnClick.bubble}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnClick((current) => ({
                    ...current,
                    bubble: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Repulse">
              <InputCheckbox
                value={interactivityEventOnClick.repulse}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnClick((current) => ({
                    ...current,
                    repulse: isChecked,
                  }))
                }
              />
            </Panel>
            <Panel title="Remove">
              <InputCheckbox
                value={interactivityEventOnClick.remove}
                setValue={(isChecked: boolean) =>
                  setInteractivityEventOnClick((current) => ({
                    ...current,
                    remove: isChecked,
                  }))
                }
              />
            </Panel>
          </Panel>
        </Accordion>
        <Accordion title="Modes">
          <Accordion title="Grab">
            <Accordion title="Line linked">
              <Panel title="Opacity">
                <InputRange
                  min={0}
                  max={1}
                  step={0.1}
                  value={interactivity.modes.grab.line_linked.opacity}
                  setValue={interactivity.modes.grab.line_linked.setOpacity}
                />
              </Panel>
            </Accordion>
            <Panel title="Distance">
              <InputRange
                min={0}
                max={1000}
                value={interactivity.modes.grab.distance}
                setValue={interactivity.modes.grab.setDistance}
              />
            </Panel>
          </Accordion>
          <Accordion title="Bubble">
            <Panel title="Opacity">
              <InputRange
                min={0}
                max={1}
                step={0.1}
                value={interactivity.modes.bubble.opacity}
                setValue={interactivity.modes.bubble.setOpacity}
              />
            </Panel>
            <Panel title="Distance">
              <InputRange
                min={0}
                max={1000}
                value={interactivity.modes.bubble.distance}
                setValue={interactivity.modes.bubble.setDistance}
              />
            </Panel>
            <Panel title="Size">
              <InputRange
                min={0}
                max={20}
                value={interactivity.modes.bubble.size}
                setValue={interactivity.modes.bubble.setSize}
              />
            </Panel>
            <Panel title="Durantion (sec)">
              <InputRange
                min={0}
                max={5}
                step={0.1}
                value={interactivity.modes.bubble.duration}
                setValue={interactivity.modes.bubble.setDuration}
              />
            </Panel>
            <Panel title="Speed">
              <InputRange
                min={0}
                max={10}
                step={0.1}
                value={interactivity.modes.bubble.speed}
                setValue={interactivity.modes.bubble.setSpeed}
              />
            </Panel>
          </Accordion>
          <Accordion title="Repulse">
            <Panel title="Distance">
              <InputRange
                min={0}
                max={1000}
                value={interactivity.modes.repulse.distance}
                setValue={interactivity.modes.repulse.setDistance}
              />
            </Panel>
            <Panel title="Duration">
              <InputRange
                min={0}
                max={5}
                step={0.1}
                value={interactivity.modes.repulse.duration}
                setValue={interactivity.modes.repulse.setDuration}
              />
            </Panel>
          </Accordion>
          <Accordion title="Push">
            <Panel title="Particles">
              <InputRange
                min={0}
                max={10}
                value={interactivity.modes.push.particles_nb}
                setValue={interactivity.modes.push.setParticlesNb}
              />
            </Panel>
          </Accordion>
          <Accordion title="Remove">
            <Panel title="Particles">
              <InputRange
                min={0}
                max={10}
                value={interactivity.modes.remove.particles_nb}
                setValue={interactivity.modes.remove.setParticlesNb}
              />
            </Panel>
          </Accordion>
        </Accordion>
      </Accordion>
    </>
  );
};
