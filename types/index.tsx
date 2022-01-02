import { ImageSourcePropType } from 'react-native';

export type TokenRate = {
  [key: string]: number
}

export type Token = {
  name: string, 
  percentage: number
}

export type SupplyRatesProps = {
  supplyRates: TokenRate
}

export type SupplyRateCardProps = {
  supplyRate: number;
  tokenName: string;
  backgroundColor: string;
  img: ImageSourcePropType;
};

export type Dict = {
  [key: string]: {
    color: string;
    img: ImageSourcePropType;
  }
}
