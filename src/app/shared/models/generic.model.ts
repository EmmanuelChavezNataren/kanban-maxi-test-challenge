export interface ObjectKey {
  prop: string;
  name: string;
  displayFormat?: string;
  flexGrow?: number;
}

export type ObjectKeys = ObjectKey[];

export interface ObjectKeySort {
  prop: string;
  dir: string;
}

export type ObjectKeySorts = ObjectKeySort[];
