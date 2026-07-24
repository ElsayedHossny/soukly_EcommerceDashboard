import { IPagenation } from "./pagenation.interface";

// Route Api
export interface ICatrgoryResponse {
  results: number;
  metadata: IPagenation;
  data: ICatrgory[];
}

export interface ICatrgory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

// Dummy Api
export type ICateroyyDummyResponse = ICateroyyDummy[];

export interface ICateroyyDummy {
  slug: string;
  name: string;
  url: string;
}
