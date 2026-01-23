import { parseDate } from "./parseDate";

describe("parseDate", () => {
  test("ISO文字列をYYYY/MM/DD形式に整形する", () => {
    expect(parseDate("2024-12-31")).toBe("2024/12/31");
  });

  test("タイムスタンプ付きでも日付のみを整形する", () => {
    expect(parseDate("2024-07-15T12:00:00Z")).toBe("2024/07/15");
  });
});
