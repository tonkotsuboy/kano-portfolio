import { LiquidGlassBox } from "./LiquidGlassBox";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LiquidGlassBox> = {
  component: LiquidGlassBox,
  decorators: [
    (Story) => (
      <>
        <style>{`
          @keyframes moveBackground {
            0% {
              background-position: 0% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }

          @keyframes zoomBackground {
            0% {
              background-size: 100%;
            }
            50% {
              background-size: 150%;
            }
            100% {
              background-size: 100%;
            }
          }

          .animated-background {
            animation: moveBackground 20s ease-in-out infinite;
          }

          .zoom-background {
            animation: zoomBackground 15s ease-in-out infinite;
          }
        `}</style>
        <div
          className="animated-background"
          style={{
            alignItems: "center",
            background: "url(/birthday-balloons.jpg) center center / cover",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Story />
        </div>
      </>
    ),
  ],
  parameters: {
    backgrounds: { disable: true },
  },
  title: "UI/LiquidGlassBox",
};

export default meta;

type Story = StoryObj<typeof LiquidGlassBox>;

export const Default: Story = {
  args: {
    children: (
      <div
        style={{
          color: "black",
          cursor: "pointer",
          fontSize: "2rem",
          fontWeight: "600",
          padding: "1rem 2rem",
        }}
      >
        Liquid Glass
      </div>
    ),
  },
};

export const Menu: Story = {
  args: {
    children: (
      <div
        style={{
          color: "black",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          fontWeight: "600",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
        }}
      >
        <div>New file</div>
        <div>Open file</div>
        <div>Settings</div>
        <div>Repository</div>
      </div>
    ),
  },
};

export const Button: Story = {
  args: {
    children: (
      <div
        style={{
          color: "black",
          cursor: "pointer",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1rem 2rem",
        }}
      >
        Click Me
      </div>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <div
        style={{
          alignItems: "center",
          color: "black",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          fontSize: "2rem",
          fontWeight: "600",
          gap: "1.5rem",
          padding: "3rem 4rem",
        }}
      >
        <div style={{ fontSize: "3rem" }}>✨</div>
        <div style={{ fontWeight: "bold", textAlign: "center" }}>
          Beautiful Glass Effect
        </div>
        <div style={{ fontSize: "1.2rem", textAlign: "center" }}>
          背景の反射がガラス越しに歪んで見えます
        </div>
      </div>
    ),
    className: "",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            borderRadius: "2rem",
            overflow: "hidden",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

export const WithZoomAnimation: Story = {
  args: {
    children: (
      <div
        style={{
          color: "black",
          cursor: "pointer",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1rem 2rem",
        }}
      >
        Zoom Animation
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          @keyframes zoomBackground {
            0% {
              background-size: 100%;
            }
            50% {
              background-size: 150%;
            }
            100% {
              background-size: 100%;
            }
          }
        `}</style>
        <div
          style={{
            alignItems: "center",
            animation: "zoomBackground 15s ease-in-out infinite",
            background: "url(/birthday-balloons.jpg) center center / cover",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Story />
        </div>
      </>
    ),
  ],
};

export const WithSlowPan: Story = {
  args: {
    children: (
      <div
        style={{
          color: "black",
          cursor: "pointer",
          fontSize: "1.5rem",
          fontWeight: "bold",
          padding: "1rem 2rem",
        }}
      >
        Slow Pan
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <>
        <style>{`
          @keyframes slowPan {
            0% {
              background-position: 0% 0%;
            }
            25% {
              background-position: 100% 0%;
            }
            50% {
              background-position: 100% 100%;
            }
            75% {
              background-position: 0% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}</style>
        <div
          style={{
            alignItems: "center",
            animation: "slowPan 30s linear infinite",
            background: "url(/birthday-balloons.jpg) 0% 0% / 150%",
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Story />
        </div>
      </>
    ),
  ],
};
