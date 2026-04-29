const GRACE_PERIOD = Temporal.Duration.from({ hours: 48 });

type TalkLike = {
  date: string;
  published: boolean;
};

/**
 * Filters talks to show only upcoming ones, including a 2-day grace period
 * after the event date so the card stays visible on the event day and the day after.
 */
export function filterUpcomingTalks<T extends TalkLike>(
  talks: T[],
  now: Temporal.Instant,
): T[] {
  return talks.filter((talk) => {
    if (!talk.published) {
      return false;
    }
    const eventDeadline = Temporal.Instant.from(talk.date).add(GRACE_PERIOD);
    return Temporal.Instant.compare(eventDeadline, now) >= 0;
  });
}
