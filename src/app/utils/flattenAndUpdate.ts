export const flattenAndUpdate = (fieldName: string, data: any, updateObj: Record<string, unknown>) => {
    if (data && Object.keys(data).length) {
        for (const [key, value] of Object.entries(data)) {
            updateObj[`${fieldName}.${key}`] = value;
        }
    }
};