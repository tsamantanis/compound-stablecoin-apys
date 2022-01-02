import React, { useRef } from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native';

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
    <View
      style={styles.container}
    >
      <Text style={styles.currentSupplyRates}>Current Supply Rates</Text>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.listContainer}
        horizontal={true}
        decelerationRate={0}
        snapToInterval={width * 0.65}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingVertical: 20,
  },
  currentSupplyRates: {
    padding: 10,

    textTransform: 'uppercase',
    color: '#6D74AE',
    fontWeight: 'bold',
  },
});

export default SupplyRateList;