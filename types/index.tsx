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


