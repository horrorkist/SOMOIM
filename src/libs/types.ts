export interface InterestWithDetails {
  name: string;
  detail: string[];
}

export interface LoginResponse {
  ok: true;
  data: {
    accessToken: string;
    accessTokenExpirationDateTime: string;
    refreshToken: string;
    refreshTokenExpirationDateTime: string;
  };
}

export interface User {
  id: number;
  name: string;
  area: string;
  birth: string;
  favorites: string[];
  gender: string;
  introduction: string;
  profileUrl?: string;
}

export interface Member {
  userId: number;
  name: string;
  profileUrl?: string;
  introduction?: string;
}
