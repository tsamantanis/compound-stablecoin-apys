import Slider from '@react-native-community/slider';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Token } from '../types';

type Props = {
  token: Token,
  index: number,
  setPercentage: (percentage: number, index: number) => void;
  reAllocateFunds: (percentage: number, index: number) => void;
};

const FundAllocation: React.FC<Props> = ({
    token,
    index,
    setPercentage,
    reAllocateFunds,
}) => (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text>{token.name}</Text>
        <Text>{token.percentage}%</Text>
      </View>
      <Slider
        style={{width: '100%', height: 40}}
        value={token.percentage}
        step={1}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#F79F4F"
        maximumTrackTintColor="#FFD8A9"
        onValueChange={(percentage) => setPercentage(percentage, index)}
        onSlidingComplete={(percentage) => reAllocateFunds(percentage, index)}
      />
    </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default FundAllocation