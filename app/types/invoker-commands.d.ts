// Invoker Commands API (`command` / `commandFor`) の型拡張。
// @types/react 19.x 時点ではまだ未対応のため、ButtonHTMLAttributes に
// プロパティを追加宣言する。仕様が安定し @types/react が追従したら削除可。
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command
import "react";

declare module "react" {
  interface ButtonHTMLAttributes<T> {
    command?:
      | "show-popover"
      | "hide-popover"
      | "toggle-popover"
      | "show-modal"
      | "close"
      | "request-close"
      | `--${string}`;
    commandFor?: string;
  }
}
