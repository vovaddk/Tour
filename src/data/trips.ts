export const regions = ['Africa', 'Americas', 'Asia', 'Europe'] as const;
export const activities = [
  'Culture',
  'Diving',
  'Food and drink',
  'Hiking',
  'Paddling',
  'Surfing',
  'Wellness',
] as const;
export const grades = ['Easy', 'Moderate', 'Challenging'] as const;
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export type Region = (typeof regions)[number];
export type Activity = (typeof activities)[number];
export type Grade = (typeof grades)[number];

export interface Trip {
  name: string;
  place: string;
  region: Region;
  activity: Activity;
  grade: Grade;
  nights: number;
  /** Departure months, 1–12. */
  months: number[];
}

export const trips: Trip[] = [
  {
    name: 'Liveaboard reef safari',
    place: 'Raja Ampat, Indonesia',
    region: 'Asia',
    activity: 'Diving',
    grade: 'Moderate',
    nights: 9,
    months: [10, 11, 12, 1, 2, 3, 4],
  },
  {
    name: 'Red Clouds temple trek',
    place: 'Fanjingshan, China',
    region: 'Asia',
    activity: 'Hiking',
    grade: 'Challenging',
    nights: 6,
    months: [4, 5, 9, 10],
  },
  {
    name: 'Lavaux vineyard terraces',
    place: 'Vevey, Switzerland',
    region: 'Europe',
    activity: 'Food and drink',
    grade: 'Easy',
    nights: 4,
    months: [5, 6, 7, 8, 9, 10],
  },
  {
    name: 'Lake Skadar by kayak',
    place: 'Skadar, Montenegro',
    region: 'Europe',
    activity: 'Paddling',
    grade: 'Easy',
    nights: 5,
    months: [5, 6, 7, 8, 9],
  },
  {
    name: 'Kyoto kitchens and teahouses',
    place: 'Kyoto, Japan',
    region: 'Asia',
    activity: 'Food and drink',
    grade: 'Easy',
    nights: 7,
    months: [3, 4, 5, 10, 11],
  },
  {
    name: 'Hidden cities of the Yucatán',
    place: 'Calakmul, Mexico',
    region: 'Americas',
    activity: 'Culture',
    grade: 'Moderate',
    nights: 8,
    months: [11, 12, 1, 2, 3],
  },
  {
    name: 'First waves surf camp',
    place: 'Ericeira, Portugal',
    region: 'Europe',
    activity: 'Surfing',
    grade: 'Easy',
    nights: 6,
    months: [4, 5, 6, 7, 8, 9, 10],
  },
  {
    name: 'Ubud slow-living retreat',
    place: 'Bali, Indonesia',
    region: 'Asia',
    activity: 'Wellness',
    grade: 'Easy',
    nights: 7,
    months: [4, 5, 6, 7, 8, 9],
  },
  {
    name: 'Torres del Paine W trek',
    place: 'Patagonia, Chile',
    region: 'Americas',
    activity: 'Hiking',
    grade: 'Challenging',
    nights: 8,
    months: [11, 12, 1, 2, 3],
  },
  {
    name: 'High Atlas village walk',
    place: 'Imlil, Morocco',
    region: 'Africa',
    activity: 'Hiking',
    grade: 'Moderate',
    nights: 6,
    months: [3, 4, 5, 9, 10, 11],
  },
  {
    name: 'Zanzibar spice coast',
    place: 'Stone Town, Tanzania',
    region: 'Africa',
    activity: 'Food and drink',
    grade: 'Easy',
    nights: 5,
    months: [6, 7, 8, 9, 12, 1, 2],
  },
  {
    name: 'Costa Rica Pacific breaks',
    place: 'Nosara, Costa Rica',
    region: 'Americas',
    activity: 'Surfing',
    grade: 'Moderate',
    nights: 7,
    months: [12, 1, 2, 3, 4],
  },
];

export interface Criteria {
  region?: string;
  activity?: string;
  grade?: string;
  /** Month number 1–12 as a string, as it comes from a <select>. */
  month?: string;
}

/** Empty criteria match everything, so an untouched form lists every trip. */
export function findTrips(list: readonly Trip[], criteria: Criteria): Trip[] {
  const month = criteria.month ? Number(criteria.month) : undefined;
  return list.filter(
    (trip) =>
      (!criteria.region || trip.region === criteria.region) &&
      (!criteria.activity || trip.activity === criteria.activity) &&
      (!criteria.grade || trip.grade === criteria.grade) &&
      (month === undefined || trip.months.includes(month)),
  );
}

export function describeCount(count: number): string {
  if (count === 0) return 'No trips match yet. Try a different month or any activity.';
  return count === 1 ? '1 trip matches your search.' : `${count} trips match your search.`;
}
