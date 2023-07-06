// Type Safe Date Strings
// Reference
// https://javascript.plainenglish.io/type-safe-date-strings-66b6dc58658a

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type ZeroToNine = 0 | OneToNine

/** YYYY */
export type YYYY =
  | `19${ZeroToNine}${ZeroToNine}`
  | `20${ZeroToNine}${ZeroToNine}`
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`
type DD = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`

/** YYYY-MM */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type YYYY_MM = `${YYYY}-${MM}`
/** YYYY-MM-DD */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type YYYY_MM_DD = `${YYYY_MM}-${DD}`
