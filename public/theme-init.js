// 描画前にテーマを確定させ、FOUC（ダーク利用者がライトを一瞬見る）を防ぐ。
// layout.tsx から next/script の beforeInteractive で <head> 内に同期実行される。
// ロジックは ThemeProvider（storageKey="kano-theme" / light|dark|system）と一致させる。
(function () {
  try {
    var saved = localStorage.getItem("kano-theme");
    var mode =
      saved === "light" || saved === "dark" || saved === "system"
        ? saved
        : "system";
    var isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    var theme = isDark ? "dark" : "light";
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  } catch (e) {
    // localStorage 不可（プライベートモード等）でも描画は継続。既定はライト。
  }
})();
