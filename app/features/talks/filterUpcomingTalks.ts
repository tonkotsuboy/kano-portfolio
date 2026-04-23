const GRACE_PERIOD_MS = 2 * 24 * 60 * 60 * 1000;

type TalkLike = {
  date: string;
  published: boolean;
};

/**
 * Filters talks to show only upcoming ones, including a 2-day grace period
 * after the event date so the card stays visible on the event day and the day after.
 */
export function filterUpcomingTalks<T extends TalkLike>(talks: T[], now: Date): T[] {
  return talks.filter(
    (talk) => talk.published && new Date(talk.date).getTime() + GRACE_PERIOD_MS >= now.getTime(),
  );
}
