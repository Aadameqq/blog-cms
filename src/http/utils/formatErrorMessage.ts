import { capitalize } from '@helpers/other';

export type ErrorMessage = { errorMessage: string };

export const formatErrorMessage = (errorMessage: string) => ({
  errorMessage: capitalize(errorMessage),
});
