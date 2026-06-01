import { Pickup } from "./Pickup";

import type { PickupItem } from "./PickupItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const SAMPLE_ITEMS: PickupItem[] = [
  {
    ctaLabel: "詳しく見る",
    date: "2026-05-25T00:00+09:00",
    external: false,
    href: "/entry/ts-code-recipe",
    slug: "ts-code-recipe",
    thumbnail: "/images/og/ts-code-recipe.jpg",
    title: "『TypeScriptコードレシピ集』を執筆しました。TypeScript/JavaScript逆引き入門書",
  },
  {
    ctaLabel: "参加申し込み",
    date: "2026-06-03T21:00:00+09:00",
    external: true,
    href: "https://cssnite.doorkeeper.jp/events/197436",
    slug: "cssnite-20260603",
    thumbnail: "/images/og/cssnite-20260603.png",
    title: "『TypeScriptコードレシピ集』で始める、2026年のTypeScript・JavaScript",
  },
];

const meta = {
  component: Pickup,
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  title: "Features/Pickup",
} satisfies Meta<typeof Pickup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
  },
};
