export type LoginResponseDto = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}
