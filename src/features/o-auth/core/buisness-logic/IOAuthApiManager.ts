export interface IOAuthApiManager {
  requestAccessToken<T>(code: string): Promise<T>;
  requestUserData<T>(accessToken: string): Promise<T>;
}
