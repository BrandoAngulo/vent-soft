export interface JwtResponseDTO {
  status: number;
  payload: {
    id: number;
    login: string;
    name: string | null;
    rol: Array<{ authority: string }>;
    token: string;
  };
}