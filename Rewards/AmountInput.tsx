import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';

export type Props = {
  setAmount: (num: number) => void;
  amount: number;
};

const AmountInput: React.FC<Props> = ({
    setAmount,
    amount
}) => (
    <View style={styles.container}>
      <Text style={styles.calculateRewards}>Calculate Rewards</Text>
      <TextInput
        style={styles.amountInput}
        keyboardType='numeric'
        onChangeText={(num)=> setAmount(num ? parseFloat(num) : 0)}
        placeholder='Enter USD amount'
      />
    </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  calculateRewards: {
    textTransform: 'uppercase',
    color: '#6D74AE',
    fontWeight: 'bold',
  },
  amountInput: {
    marginTop: 10,
    borderColor: '#6D74AE',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#6D74AE',
    fontWeight: 'bold',
  }
});

export default AmountInput