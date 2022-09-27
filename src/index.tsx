import React from "react";
import ReactDOM from "react-dom/client";
import githubLogo from "./assets/github-logo-bold.svg";
import { Controls } from "./Components/controls";
import { Particles } from "./Components/particles";
import "./global.css";
import { ConfigParticlesProvider } from "./hooks/useConfigParticles";
import styles from "./index.module.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigParticlesProvider>
      <Particles>
        <div className={styles.container}>
          <div className={styles.menu}>
            <div className={styles.controls}>
              <Controls />
            </div>
            <div>
              <a
                href="https://github.com/igorssc/particles"
                target="_blank"
                rel="noreferrer"
                className={styles.githubLink}
              >
                <img src={githubLogo} alt="GitHub Logo" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </Particles>
    </ConfigParticlesProvider>
  </React.StrictMode>
);

reportWebVitals();
