import { createHttpsImage } from "./index";

describe("createHttpsImage", () => {
  test("プロトコル相対URLにhttpsを付与する", () => {
    const result = createHttpsImage("//example.com/image.png");

    expect(result).toBe("https://example.com/image.png");
  });

  test("既にプロトコルが付いている場合はそのまま返す", () => {
    const httpUrl = "http://example.com/image.png";
    const httpsUrl = "https://example.com/image.png";

    expect(createHttpsImage(httpUrl)).toBe(httpUrl);
    expect(createHttpsImage(httpsUrl)).toBe(httpsUrl);
  });
});
