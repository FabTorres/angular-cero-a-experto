export interface TopLevel {
  data: Data;
}

export interface Data {
  objects: CountryObject[];
  meta:    Meta;
}

export interface Meta {
  total:      number;
  count:      number;
  limit:      number;
  offset:     number;
  more:       boolean;
  request_id: string;
  duration:   number;
}

export interface CountryObject {
  names:   Names;
  codes:   Codes;
  borders: string[];
  _match:  Match[];
  _meta:   MetaClass;
}

export interface Match {
  path:  Path;
  value: Value;
}

export enum Path {
  Region = "region",
}

export enum Value {
  Americas = "Americas",
}

export interface MetaClass {
  lastUpdatedTimestamp: number;
}

export interface Codes {
  alpha_3: string;
}

export interface Names {
  common: string;
}

export interface Country {
  name: string;
  cca3: string;
  borders: string[];
}
