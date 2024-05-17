export const paginate = ({
  current,
  max,
}: {
  current: number;
  max: number;
}): {
  prev: number | null;
  next: number | null;
  items: (number | string)[];
} => {
  const prev = current === 1 ? null : current - 1;
  const next = current === max ? null : current + 1;
  const items: (string | number)[] = [1];

  if (current === 1 && max === 1) return { prev, next, items };
  if (current > 4) items.push('…');

  const r = 2;
  const r1 = current - r;
  const r2 = current + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

  if (r2 + 1 < max) items.push('…');
  if (r2 < max) items.push(max);

  return { prev, next, items };
};
