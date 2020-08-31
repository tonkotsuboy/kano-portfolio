import { fetchOgInfo } from "../../logics/scraping/fetchOgInfo";

describe("fetchOgInfo", () => {
  test("should ", async (done) => {
    const ogInfo = await fetchOgInfo("https://dist.connpass.com/event/181737/");
    expect(ogInfo.ogImage).toBe(
      "https://connpass-tokyo.s3.amazonaws.com/thumbs/73/15/73152d3c645f1643c301e971e7cf0ae7.png"
    );

    done();
  });
});
