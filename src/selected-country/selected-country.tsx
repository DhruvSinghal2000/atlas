import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ICountryData } from '../types';

interface ISelectedCountryCardProps {
  country: ICountryData;
}

export const SelectedCountryCard: React.FC<
  React.PropsWithChildren<ISelectedCountryCardProps>
> = ({country}: ISelectedCountryCardProps) => {
  const {officialName, commonName, flag, capital, currency} = country;
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Image style={styles.flag} src={flag} />
        <Text style={styles.officialName}>{officialName}</Text>
      </View>
      <Text>{commonName}</Text>
      <View style={styles.detailContainer}>
        <Text>
          <Text style={{fontWeight: '500', color: 'black'}}>{'Capital: '}</Text>
          <Text style={{fontWeight: '400', color: 'gray'}}>{capital}</Text>
        </Text>
        <Text>
          <Text style={{fontWeight: '500', color: 'black'}}>
            {'Currency: '}
          </Text>
          {Object.keys(currency).map((key, idx) => {
            return (
              <Text
                key={`${currency[key].name} ${currency[key].symbol}`}
                style={{
                  fontWeight: '400',
                  color: 'gray',
                }}>{`${currency[key].name} (${currency[key].symbol})`}</Text>
            );
          })}
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
  },
  flag: {
    elevation: 2,
    width: 20,
    height: 20,
    marginRight: 15,
  },
  officialName: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
  },
  commonName: {
    color: 'lightGray',
  },
  detailContainer: {
    marginTop: 20,
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
