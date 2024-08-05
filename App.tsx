import React, {StrictMode} from 'react';
import {ScrollView, useColorScheme} from 'react-native';

import {CountrySearch} from './src/country-search-input/country-search-input';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const appStyle = {
    overflow: 'visible',
    padding: 12,
  };

  return (
    <StrictMode>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={appStyle}>
        <CountrySearch />
      </ScrollView>
    </StrictMode>
  );
}

export default App;
