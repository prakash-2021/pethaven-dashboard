import { MetaDataDTO, TopSellingProductDto } from "@/_api/gen/apiSchemas";

export interface IconProps {
  size?: number;
  color?: string;
}

export interface ThProps {
  reversed?: boolean;
  sorted?: boolean;
  onSort?: () => void;
}

export interface BestSellingProductTableProps {
  initialData?: TopSellingProductDto[];
  metaData: MetaDataDTO;
}

export type FeaturedProductSlug =
  | "new-arrivals"
  | "top-trending"
  | "best-sellers"
  | "sunglasses"
  | "eyeglasses";
