import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {RestaurantsScreen} from './src/features/screens/restaurants.screen';

const App = () => {
  // const [searchQuery, setSearchQuery] = useState('');

  // const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <RestaurantsScreen />
      <StatusBar style="auto" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  search: {padding: 16, backgroundColor: 'green'},
  list: {flex: 1, padding: 16, backgroundColor: 'blue'},
});

export default App;
