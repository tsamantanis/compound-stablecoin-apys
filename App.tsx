import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SupplyRateList from './SupplyRates/SupplyRateList'
import Rewards from './Rewards/Rewards'

import getSupplyRates from './data/getSupplyRates';

import { TokenRate } from './types'

export default function App() {
  const [supplyRates, setSupplyRates] = useState<TokenRate>({});
  
  const loadSupplyRates = async () => {
    try {
      const supplyRates: TokenRate = await getSupplyRates();
      setSupplyRates(supplyRates);
    } catch (error) {}
  };

  useEffect(() => {
    loadSupplyRates();
  }, []);

  return (
    <View style={styles.container}>
      {supplyRates && <SupplyRateList 
        supplyRates={supplyRates}
      />}
      <View
        style={{
          borderBottomColor: '#E6E8FA',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      {supplyRates && <Rewards 
        supplyRates={supplyRates}
      /> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});
