/**
 * lerps a value
 * where
 * from -> mappedFrom
 * to -> mappedTo
 *
 * This means that:
 *
 * lerp(scrollY, 0, 100, 0, 1);
 *
 * would return a mapped Value between 0 and 1. Depending on the relationship of 0 and 100.
 */
export function lerp(
	value: number,
	from: number,
	to: number,
	mappedFrom: number,
	mappedTo: number
) {
	// First, normalize the current value to a 0-1 range based on its position between from and end
	const normalized = (value - from) / (to - from);

	// Then, map this normalized value to the new range (mapedFrom to mappedEnd)
	const lerped = normalized * (mappedTo - mappedFrom) + mappedFrom;

	const min = Math.min(mappedFrom, mappedTo);
	const max = Math.max(mappedFrom, mappedTo);
	const clamped = Math.min(Math.max(lerped, min), max);

	return clamped;
}
