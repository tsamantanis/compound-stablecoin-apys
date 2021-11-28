import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native';

import SupplyRateCard from './SupplyRateCard';

import { Dict, SupplyRatesProps } from '../types';

const { width, height } = Dimensions.get('window');

const tokenInfo: Dict = {
  'DAI': {
    color: "#FDC134",
    img: require("../assets/icons/dai.png")
  },
  'USDC': {
    color: "#2775CA",
    img: require("../assets/icons/usdc.png")
  },
  'USDT': {
    color: "#50AE94",
    img: require("../assets/icons/usdt.png")
  }
}

const SupplyRateList: React.FC<SupplyRatesProps> = ({
  supplyRates
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  setTimeout(() => {scrollViewRef.current && scrollViewRef.current.scrollTo({x: -30}) }, 1)

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      horizontal={true}
      decelerationRate={0}
      snapToInterval={width * 0.8}
      snapToAlignment={"center"}
    >
      {
        supplyRates && Object.keys(supplyRates).map((key) => (
          <SupplyRateCard
            key={key + supplyRates[key]}
            supplyRate={supplyRates[key]}
            tokenName={key}
            backgroundColor={tokenInfo[key].color}
            img={tokenInfo[key].img}
          />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  }
});

export default SupplyRateList;