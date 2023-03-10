import { capitalize } from '../../utils/capitalize';

export type ErrorMessage = { errorMessage: string };

export const formatErrorMessage = (errorMessage: string) => {
  return { errorMessage: capitalize(errorMessage) };
};
