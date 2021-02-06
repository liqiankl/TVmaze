import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Layout, Autocomplete, Icon} from '@ui-kitten/components';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {searchShows} from '../services/TVmazeApi';

export const TVCard = ({show, navigateToDetails}) => (
  <Layout style={{flex: 1, margin: 10, borderRadius: 10}}>
    <TouchableOpacity onPress={navigateToDetails}>
      {/* <Image style={styles.headerImage} source={{uri: show.Poster}} /> */}
      <Text style={styles.headerText} category="h6">
        {show.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 5,
        }}>
        <Text style={{fontWeight: 'bold'}}>TVmaze - {show.season}</Text>
        <Text style={{fontWeight: 'bold'}}> {show.Year}</Text>
      </View>
    </TouchableOpacity>
  </Layout>
);

export default HomeScreen = ({navigation}) => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Set API Data

  async function loadShows(searchText) {
    setLoading(true);
    const showsData = await searchShows(searchText);
    setData(showsData);
    setLoading(false);
  }

  React.useEffect(() => {
    loadShows('They');
    return () => {};
  }, []);

  const renderIcon = (style) => <Icon {...style} name={'search'} />;

  const onChangeText = (query) => {
    setValue(query);
  };

  if (loading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Autocomplete
        value={value}
        placeholder="Search your favourite show!"
        icon={renderIcon}
        onIconPress={() => {
          if (value.length > 3) {
            loadShows(value);
          }
        }}
        style={{borderColor: 'white'}}
        onChangeText={onChangeText}
      />
      <ScrollView>
        {/* Creating a grid */}

        {data.length > 0 &&
          Array(Math.ceil(data.length / 2))
            .fill(0)
            .map((row, i) => (
              <Layout key={i} style={styles.container}>
                <Layout style={styles.layout} level="2">
                  {/* <TVCard show={data[i]} />
                  <TVCard show={data[i + 1]} /> */}
                </Layout>
              </Layout>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  headerImage: {
    flex: 1,
    height: 192,
    borderRadius: 10,
  },
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 2,
    flexDirection: 'row',
  },
});
