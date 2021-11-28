import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Rewards from './Rewards/Rewards';

import getSupplyRates from './data/getSupplyRates';

import { TokenRate } from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
});

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
      {supplyRates && <Rewards
        supplyRates={supplyRates}
      /> }
    </View>
  );
}
