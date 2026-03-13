import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): string {
  const err = error as AxiosError<{ message?: string }>;

  if (err.response) {
    return err.response.data?.message || "Serverio klaida";
  }

  if (err.request) {
    return "Serveris neatsako";
  }

  return "Nežinoma klaida";
}
