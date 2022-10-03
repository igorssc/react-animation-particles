![animation](https://user-images.githubusercontent.com/26682297/192773634-09ee1b6d-329e-4f2c-b464-3f4b4f1acf6e.jpg)

A lightweight JavaScript library for creating particles.

## ✨ Technologies

This project was developed with the following technologies:

- React
- TypeScript

### 📃 `Library installation`

#### npm

```bash
npm install react-animation-particles
```

#### yarn

```bash
yarn add react-animation-particles
```

#### pnpm

```bash
pnpm install react-animation-particles
```

react-animation-particles aims to be a "plug and play" solution, without needing a lot of tinkering. In the ideal case, you can wrap the children you already have with , and get animation for free: <Particles>

**app.js**

```javascript
import { Particles } from "react-animation-particles";
import config from "assets/particles.config";

export const Example = () => (
  <Particles config={config}>
    <p style={{ position: relative, zIndex: 11 }}>Hello World!</p>
  </Particles>
);
```

> By default, the particles have zIndex: 10, you must set the children with higher value

### 🪄 Demo / Generator

Configure, export, and share your react-animation-particles configuration:

![Demo](https://user-images.githubusercontent.com/26682297/192793755-76c6a16b-eafe-4300-9c05-56df42021ef9.gif)

Access <https://react-animation-particles.vercel.app>

**particles.config.json**

```javascript
{
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#199ada",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "",
        width: 300,
        height: 300,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#199ada",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 30,
        size: 4,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: false,
}
```

You can control the start and end of the animation, just use the `load()` and `destroy()` functions

```javascript
import { load } from "react-animation-particles";

/* load(@path-json (optional), @callback (optional)); */
load("assets/particles.json", function () {
  console.log("callback - particles.js config loaded");
});
```

```javascript
import { destroy } from "react-animation-particles";

destroy();
```

### ⚓ `SSR`

You can use the package with SSR frameworks, like nextJs, for that you just have to do a few steps:

```typescript
// index.tsx

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { BackgroundParticles } from "../Components/Particles";

const Content = () => {
  return (
    <>
      <p style={{ height: "100vh" }}>Hello, world!</p>
    </>
  );
};

const Home: NextPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <>
        <Content />
      </>
    );
  }
  return (
    <BackgroundParticles>
      <Content />
    </BackgroundParticles>
  );
};

export default Home;
```

```typescript
// Components/Particles.tsx

import { ReactNode } from "react";
import { Particles } from "react-animation-particles";

export const BackgroundParticles = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Particles>{children}</Particles>
    </>
  );
};
```

### `Options`

| key                                                   | option type / notes                                                                                      | example                                                                                                                                                            |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `particles.number.value`                              | number                                                                                                   | `40`                                                                                                                                                               |
| `particles.number.density.enable`                     | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.number.density.value_area`                 | number                                                                                                   | `800`                                                                                                                                                              |
| `particles.color.value`                               | HEX (string) <br /> RGB (object) <br /> HSL (object) <br /> array selection (HEX) <br /> random (string) | `"#b61924"` <br /> `{r:182, g:25, b:36}` <br /> `{h:356, s:76, l:41}` <br /> `["#b61924", "#333333"]` <br /> `"random"`                                            |
| `particles.shape.type`                                | string <br /> array selection                                                                            | `"circle"` <br /> `"edge"` <br /> `"triangle"` <br /> `"polygon"` <br /> `"star"` <br /> `"image"` <br /> `["circle", "image"]`                                    |
| `particles.shape.stroke.width`                        | number                                                                                                   | `2`                                                                                                                                                                |
| `particles.shape.stroke.color`                        | HEX (string)                                                                                             | `"#222222"`                                                                                                                                                        |
| `particles.shape.polygon.nb_slides`                   | number                                                                                                   | `5`                                                                                                                                                                |
| `particles.shape.image.src`                           | path link <br /> svg / png / gif / jpg                                                                   | `"assets/img/yop.svg"` <br /> `"http://example.com/img.png"`                                                                                                       |
| `particles.shape.image.width`                         | number <br />(for aspect ratio)                                                                          | `100`                                                                                                                                                              |
| `particles.shape.image.height`                        | number <br />(for aspect ratio)                                                                          | `100`                                                                                                                                                              |
| `particles.opacity.value`                             | number (0 to 1)                                                                                          | `0.75`                                                                                                                                                             |
| `particles.opacity.random`                            | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.opacity.anim.enable`                       | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.opacity.anim.speed`                        | number                                                                                                   | `3`                                                                                                                                                                |
| `particles.opacity.anim.opacity_min`                  | number (0 to 1)                                                                                          | `0.25`                                                                                                                                                             |
| `particles.opacity.anim.sync`                         | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.size.value`                                | number                                                                                                   | `20`                                                                                                                                                               |
| `particles.size.random`                               | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.size.anim.enable`                          | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.size.anim.speed`                           | number                                                                                                   | `3`                                                                                                                                                                |
| `particles.size.anim.size_min`                        | number                                                                                                   | `0.25`                                                                                                                                                             |
| `particles.size.anim.sync`                            | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.line_linked.enable`                        | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.line_linked.distance`                      | number                                                                                                   | `150`                                                                                                                                                              |
| `particles.line_linked.color`                         | HEX (string)                                                                                             | `#ffffff`                                                                                                                                                          |
| `particles.line_linked.opacity`                       | number (0 to 1)                                                                                          | `0.5`                                                                                                                                                              |
| `particles.line_linked.width`                         | number                                                                                                   | `1.5`                                                                                                                                                              |
| `particles.move.enable`                               | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.move.speed`                                | number                                                                                                   | `4`                                                                                                                                                                |
| `particles.move.direction`                            | string                                                                                                   | `"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"` |
| `particles.move.random`                               | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.move.straight`                             | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.move.out_mode`                             | string <br /> (out of canvas)                                                                            | `"out"` <br /> `"bounce"`                                                                                                                                          |
| `particles.move.bounce`                               | boolean <br /> (between particles)                                                                       | `true` / `false`                                                                                                                                                   |
| `particles.move.attract.enable`                       | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `particles.move.attract.rotateX`                      | number                                                                                                   | `3000`                                                                                                                                                             |
| `particles.move.attract.rotateY`                      | number                                                                                                   | `1500`                                                                                                                                                             |
| `interactivity.detect_on`                             | string                                                                                                   | `"canvas", "window"`                                                                                                                                               |
| `interactivity.events.onhover.enable`                 | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `interactivity.events.onhover.mode`                   | string <br /> array selection                                                                            | `"grab"` <br /> `"bubble"` <br /> `"repulse"` <br /> `["grab", "bubble"]`                                                                                          |
| `interactivity.events.onclick.enable`                 | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `interactivity.events.onclick.mode`                   | string <br /> array selection                                                                            | `"push"` <br /> `"remove"` <br /> `"bubble"` <br /> `"repulse"` <br /> `["push", "repulse"]`                                                                       |
| `interactivity.events.resize`                         | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |
| `interactivity.events.modes.grab.distance`            | number                                                                                                   | `100`                                                                                                                                                              |
| `interactivity.events.modes.grab.line_linked.opacity` | number (0 to 1)                                                                                          | `0.75`                                                                                                                                                             |
| `interactivity.events.modes.bubble.distance`          | number                                                                                                   | `100`                                                                                                                                                              |
| `interactivity.events.modes.bubble.size`              | number                                                                                                   | `40`                                                                                                                                                               |
| `interactivity.events.modes.bubble.duration`          | number <br /> (second)                                                                                   | `0.4`                                                                                                                                                              |
| `interactivity.events.modes.repulse.distance`         | number                                                                                                   | `200`                                                                                                                                                              |
| `interactivity.events.modes.repulse.duration`         | number <br /> (second)                                                                                   | `1.2`                                                                                                                                                              |
| `interactivity.events.modes.push.particles_nb`        | number                                                                                                   | `4`                                                                                                                                                                |
| `interactivity.events.modes.push.particles_nb`        | number                                                                                                   | `4`                                                                                                                                                                |
| `retina_detect`                                       | boolean                                                                                                  | `true` / `false`                                                                                                                                                   |

## 📝 Licence

This project is under MIT licence. See the archive [LICENSE](LICENSE.md) to more details.

---

Made with 💜 by [IGS Design](https://igsdesign.com.br) - Igor Santos 👋
