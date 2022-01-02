import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageSourcePropType } from 'react-native';
import { SupplyRateCardProps } from '../types';

const { width } = Dimensions.get('window');

const SupplyRateCard: React.FC<SupplyRateCardProps> = ({
    supplyRate,
    tokenName,
    backgroundColor,
    img
}) => (
      <View style={[styles.container, 
        {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowOpacity: 0.25,
          shadowRadius: 20
        }
      ]}>
        <View style={[styles.tokenImgContainer, { backgroundColor }]}>
          <Image source={img} style={styles.tokenImg} />
        </View>
        <View style={styles.supplyRatePill}>
          <Text style={styles.supplyRatePillText}>{(supplyRate * 100).toFixed(4)}%</Text>
        </View>
        <Text style={styles.supplyRateCardText}>{tokenName}</Text>
      </View>
)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      height: width * 0.6,
      width: width * 0.6,
      alignItems: 'center',
      marginHorizontal: 10,
    },
    supplyRatePill: {
      marginTop: -15,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      borderColor: '#6D74AE',
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 10
    },
    supplyRatePillText: {
      color: '#6D74AE',
      fontWeight: 'bold',
    },
    tokenImgContainer: {
      width: '100%',
      height: '80%',
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tokenImg: {
      tintColor: 'black',
    },
    supplyRateCardText: {
      margin: 'auto',
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    }
});

export default SupplyRateCard