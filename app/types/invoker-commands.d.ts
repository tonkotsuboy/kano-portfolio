// Invoker Commands API (`command` / `commandfor`) の型拡張。
// @types/react 19.x 時点ではまだ未対応のため、ButtonHTMLAttributes に
// プロパティを追加宣言する。仕様が安定し @types/react が追従したら削除可。
// react-dom は camelCase の `commandFor` を DOM へ渡せず実行時に警告を出すため、
// 属性は HTML 仕様どおり小文字 `commandfor` で宣言・使用する。
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
    commandfor?: string;
  }
}
