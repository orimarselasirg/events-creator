export interface FormEventModel {
  id:             string; 
  name:           string;
  date:           string;
  time:           string;
  url:            string;
  desktopImage:   string | File | null;
  tableImage:     string | File | null;
  mobileImage:    string | File | null;
  [key: string]:  string | File | null;
}