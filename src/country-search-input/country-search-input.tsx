import * as React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {
  COUNTRY_SEARCH_INPUT_PLACEHOLDER,
  countrySearchUrl,
  debounce,
  WAIT_TIME,
} from '../constants';
import {ICountryData} from '../types';
import {SelectedCountryCard} from '../selected-country/selected-country';

export const CountrySearch: React.FC<React.PropsWithChildren> = () => {
  const [searchText, setSearchText] = React.useState<string | undefined>();
  const [filteredCountries, setFilteredCountries] = React.useState<
    ICountryData[] | undefined
  >();
  const [selectedCountry, setSelectedCountry] = React.useState<
    ICountryData | undefined
  >();
  const [menuVisible, setIsMenuVisible] = React.useState<boolean>(false);

  const requestCountries = debounce(async (query: string) => {
    if (!!query) {
      console.log('Sending request for', query);
      const results = await fetch(`${countrySearchUrl}${query}`);
      const countryResults: ICountryData[] = [];
      results.json().then(
        countries => {
          countries?.forEach((country: any) => {
            countryResults.push({
              officialName: country.name.official,
              commonName: country.name.common,
              capital: Array.isArray(country.capital)
                ? country.capital[0]
                : undefined,
              flag: country.flags.png,
              currency: country.currencies,
            });
          });

          setIsMenuVisible(true);
          setFilteredCountries(countryResults);
        },
        error => {
          setFilteredCountries(undefined);
          setIsMenuVisible(false);
        },
      );
    }
  }, WAIT_TIME);

  const onSearchTextChange = React.useCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setSearchText(event.nativeEvent.text);
      void requestCountries(event.nativeEvent.text);
    },
    [setSearchText],
  );

  const onCountrySelected = React.useCallback(
    (selectedCountry: ICountryData) => (_event: GestureResponderEvent) => {
      console.log('Selected country is ', selectedCountry);
      setSelectedCountry(selectedCountry);
      setIsMenuVisible(false);
      setSearchText(selectedCountry.officialName);
    },
    [setSelectedCountry, setIsMenuVisible],
  );

  const onInputBlur = React.useCallback(() => {
    setIsMenuVisible(false);
  }, [setIsMenuVisible]);

  return (
    <View style={styles.countrySearchContainer}>
      <TextInput
        style={styles.countrySearchInput}
        placeholder={COUNTRY_SEARCH_INPUT_PLACEHOLDER}
        value={searchText}
        onChange={onSearchTextChange}
      />
      {menuVisible ? (
        <ScrollView style={styles.buttonContainer}>
          {filteredCountries?.map((country, idx) => {
            return (
              <Pressable
                onPress={onCountrySelected(country)}
                style={styles.menuItem}
                key={`${country.officialName} ${idx}`}>
                <Text onPress={onCountrySelected(country)}>
                  {country.officialName}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      ) : (
        !!selectedCountry && <SelectedCountryCard country={selectedCountry} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  countrySearchContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 20,
  },
  countrySearchInput: {
    borderRadius: 10,
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    padding: 8,
    elevation: 1,
    borderRadius: 0.5,
  },
  menuItem: {
    minHeight: 30,
  },
});
