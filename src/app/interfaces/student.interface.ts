export interface Student {
  ID: number;
  Name: string;
  Mobile: string;
  Email: string;
  NationalID: string;
  Age: number;
}
export interface EditStudent extends Student {
  FirstName: string;
  LastName: string;
  NameArabic: string;
  NameEnglish: string;
}
