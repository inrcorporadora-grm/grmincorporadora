export function getRealValue(value: string | undefined) {
  if (!value) return null;
  if (value.trim().length <= 0) return null;
  return value;
}
