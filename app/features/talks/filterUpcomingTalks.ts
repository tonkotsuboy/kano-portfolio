import { Temporal } from "temporal-polyfill-lite";

type TalkLike = {
  date: string;
  published: boolean;
};

/**
 * 公開済みの登壇のうち、開催日（日本時間）が終わっていないものだけを返す。
 * 開催当日は申し込み導線を残すため、開始時刻ではなく日付の変わり目で区切る。
 */
export function filterUpcomingTalks<T extends TalkLike>(
  talks: T[],
  now: Temporal.Instant,
): T[] {
  return talks.filter((talk) => {
    if (!talk.published) {
      return false;
    }
    const endOfEventDay = Temporal.Instant.from(talk.date)
      .toZonedDateTimeISO("Asia/Tokyo")
      .startOfDay()
      .add({ days: 1 })
      .toInstant();
    return Temporal.Instant.compare(now, endOfEventDay) < 0;
  });
}
