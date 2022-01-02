import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Token, TokenRate } from '../types';

import AmountInput from './AmountInput'
import FundAllocation from './FundAllocation';

type LoadSupplyRatesProps = {
  supplyRates: TokenRate;
  loadSupplyRates: () => void;
}

const Rewards: React.FC<LoadSupplyRatesProps> = ({
  supplyRates,
  loadSupplyRates
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);
  const [blendedInterestRate, setBlendedInterestRate] = useState<number>(0);
  const [tokens, setTokens] = useState<Array<Token>>([
    {
      name: "DAI",
      percentage: 100
    },
    {
      name: "USDC",
      percentage: 0,
    },
    {
      name: "USDT",
      percentage: 0,
    },
  ]);

  const setPercentage = (percentage: number, index: number) => {
    const newTokens = [...tokens];
    newTokens[index].percentage = percentage;
    setTokens(newTokens);
  }

  const reAllocateFunds = (percentage: number, index: number) => {
    const newTokens = [...tokens];
    newTokens[index].percentage = Math.round(percentage);
    let sum = newTokens.reduce((acc, curr) => acc + curr.percentage, 0);
    const difference = sum - 100;
    let updatedTokens: Array<Token> = [...newTokens]

    function updatePercentages(updatedTokens: Array<Token>, difference: number) {
      updatedTokens.forEach((token, i) => {
        if (token.name !== newTokens[index].name) {
          const newPercentage = difference > 0 ? 
            token.percentage - Math.abs(difference) / (newTokens.length - 1)
            :
            token.percentage + Math.abs(difference) / (newTokens.length - 1)
          if (difference > 0 && newPercentage >= 0
            || difference < 0 && newPercentage <= 100) {
              const percentageToString = newPercentage.toString()
              const dotIndex = percentageToString.indexOf(".");
              token.percentage = percentageToString.length - dotIndex - 1 > 1 ? Math.round(newPercentage) : newPercentage
          }
        }
      })
      if (updatedTokens.reduce((acc, curr) => acc + curr.percentage, 0) !== 100) {
        updatePercentages(updatedTokens, difference)
      }
    }

    if (difference !== 0) {
      updatePercentages(updatedTokens, difference)
      setTokens([...updatedTokens])
    }
  };

  const calculateRewards = () => {
    const totalInterestEarnings = tokens
      .map(token => (token.percentage / 100) * (amount * supplyRates[token.name]))
      .reduce((acc, curr) => acc + curr, 0)
    setEarnings(totalInterestEarnings);
    setBlendedInterestRate((totalInterestEarnings / amount ) || 0);
  };

  useEffect(() => {
    const load = async () => {
      await loadSupplyRates();
      calculateRewards();
    }
    load();
  }, [amount, setTokens, tokens, supplyRates]);

  return (
    <View style={styles.container}>
      <AmountInput 
        setAmount={(num) => setAmount(num)}
        amount={amount}
      />
      {tokens.map((token, i) => (
        <FundAllocation
          key={token.name + i} 
          token={token}
          index={i}
          setPercentage={(percentage, index) => setPercentage(percentage, index)}
          reAllocateFunds={(percentage, index) => reAllocateFunds(percentage, index)}
        />
      ))}
      <View
        style={{
          borderBottomColor: '#E6E8FA',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View>
        <View style={styles.row}>
          <Text style={styles.totals}>Blended Interest Rate</Text>
          <Text style={styles.totals}>{(blendedInterestRate * 100).toFixed(2)}%</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totals}>Projected Annual Earnings</Text>
          <Text style={styles.totals}> ${earnings.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totals: {
    textTransform: 'uppercase',
    color: '#6D74AE',
    fontWeight: 'bold',
  }
});

export default Rewards;