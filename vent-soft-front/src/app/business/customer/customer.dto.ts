export interface CustomerDTO {
  id: number,
  name: string,
  lastName: string,
  docTipe: string,
  document: string,
  city: {
    id: number,
    code: string
    name: string,
  };
  residence: string,
  cellPhone: string,
  email: string,
  status: boolean
}
