import { describe, expect, it } from 'vitest';
import { describeCount, findTrips, trips } from './trips';

describe('findTrips', () => {
  it('returns every trip for empty criteria', () => {
    expect(findTrips(trips, {})).toHaveLength(trips.length);
  });

  it('combines filters with AND', () => {
    const result = findTrips(trips, { region: 'Asia', activity: 'Hiking' });
    expect(result.map((t) => t.place)).toEqual(['Fanjingshan, China']);
  });

  it('matches departure months given as select values', () => {
    const result = findTrips(trips, { region: 'Europe', month: '7' });
    expect(result.every((t) => t.region === 'Europe' && t.months.includes(7))).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns nothing when no trip fits', () => {
    expect(findTrips(trips, { region: 'Africa', activity: 'Surfing' })).toEqual([]);
  });
});

describe('describeCount', () => {
  it('handles zero, one and many', () => {
    expect(describeCount(0)).toMatch(/No trips/);
    expect(describeCount(1)).toBe('1 trip matches your search.');
    expect(describeCount(5)).toBe('5 trips match your search.');
  });
});
