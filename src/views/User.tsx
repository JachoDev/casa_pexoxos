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
import background from '../assets/images/Red_Background.png';
import ExpensesList from '../components/ui/Lists/ExpensesList';
import InventoryList from '../components/ui/Lists/InventoryList';

type UserProps = PropsWithChildren<{
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
      width: 500,
      height: 400,
      marginTop: 15,
      backgroundColor: '#',
      alignSelf: 'center',
    },
  });

function User({ title }: UserProps): React.JSX.Element {
  const styles = createStyles();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={background} resizeMode='cover' style={styles.imageBackgorund}>
          <Navbar title='' />
          <View style={styles.salesListView}>
            <InventoryList title=''/>
          </View>
          
        </ImageBackground>
      </SafeAreaView>
		</>
  );
}

export default User;
