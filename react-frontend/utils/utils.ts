export const validateRequired = (fields: string[]) => {
  return fields.every((field) => field.trim() !== "");
};
