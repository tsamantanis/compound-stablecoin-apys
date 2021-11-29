import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, SafeAreaView, StatusBar } from 'react-native';

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
    <SafeAreaView>
      <ScrollView style={styles.container}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    backgroundColor: '#fff',
  },
});
