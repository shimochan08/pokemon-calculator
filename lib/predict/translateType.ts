import { typeMap } from '../data/typeMaps';

export function translateType(type: string) {
  return typeMap.find((t) => t.english === type)?.japanese ?? type;
}
