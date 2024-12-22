import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import Navbar from '../components/sections/Navbar';
import background from '../assets/images/background_yellow.png';
import SalesList from '../components/ui/Lists/SalesList';
import Searchbar from '../components/sections/SearchBar';
import ExpensesList from '../components/ui/Lists/ExpensesList';

type SalesProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'auto',
      width: '100%',
      alignContent: 'stretch',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
    },
    imageBackgorund: {
      justifyContent: 'center',
      height: '100%',
    },
    salesListView: {
      width: 1100,
      height: 200,
      marginTop: 15,
      backgroundColor: '#',
      alignSelf: 'center',
    },
    headerView: {
      flex: 1,
    },
    button: {
      width: 300,
      height: 40,
      marginRight: 30,
      backgroundColor: '#29aad9',
      fontSize: 16,
      alignSelf: 'flex-end',
      borderRadius: 5,
    },
  });

function Sales({ title }: SalesProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund}>
          <Navbar title='' />
          <Searchbar title=''/>
          <View style={styles.button}>
            <Button title='Crear venta' onPress={() => {}}/>
          </View>
          <View style={styles.salesListView}>
            <SalesList title=''/>
          </View>
          <View style={styles.button}>
            <Button title='Crear egreso' onPress={() => {}}/>
          </View>
          <View style={styles.salesListView}>
            <ExpensesList title=''/>
          </View>
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default Sales;
