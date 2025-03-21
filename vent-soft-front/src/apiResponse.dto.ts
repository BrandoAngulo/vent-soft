interface PayloadResponse {
  code: string;
  messsage: string;
}
export interface ApiResponse<T> {
  status: number;
  payload: PayloadResponse | null;
}