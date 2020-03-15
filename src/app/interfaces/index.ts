export interface day {
  name: string;
  open: string;
  gesloten: string;
}

export interface Photo {
  name?: string;
  url?: string;
  id?: any;
}

export interface Textblock {
  text?: string;
  id?: any;
}

export interface Vacature {
  description: string;
  title: string;
  picture_url: string;
}
