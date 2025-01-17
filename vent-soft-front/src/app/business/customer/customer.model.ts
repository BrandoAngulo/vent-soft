export interface Customer {
  id: number,
  name: string,
  lastName: string,
  docType: string,
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
