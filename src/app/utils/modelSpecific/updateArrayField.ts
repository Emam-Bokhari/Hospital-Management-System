/* eslint-disable @typescript-eslint/no-explicit-any */

import { flattenAndUpdate } from './flattenAndUpdate';

export const updateArrayField = (
  field: string,
  data: any[],
  updateObject: Record<string, unknown>,
) => {
  data.forEach((item, index) =>
    flattenAndUpdate(`${field}.${index}`, item, updateObject),
  );
};
