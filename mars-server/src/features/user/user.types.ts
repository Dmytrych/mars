export type UserRegistrationResult = {
  id: number,
  email: string,
  name: string,
}

export type UserLoginResult = {
  user: {
    id: string,
    email: string,
    name: string,
  },
  accessToken: string
}
