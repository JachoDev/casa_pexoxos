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
import RNPrint from 'react-native-print';
const { jsPDF } = require("jspdf");

type SalesProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'auto',
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'white',
    },
    imageBackgorund: {
      justifyContent: 'center',
      height: '100%',
    },
    salesListView: {
      width: '90%',
      height: '30%',
      backgroundColor: '#',
      alignSelf: 'center',
    },
    headerView: {
      flex: 1,
    },
    button: {
      width: 300,
      height: 40,
      marginRight: 100,
      fontSize: 16,
      alignSelf: 'flex-end',
      borderRadius: 5,
      marginVertical: 10,
    },
  });

function Sales({title}: SalesProps): React.JSX.Element {
  const styles = createStyles();
  //\Users\javie\OneDrive\Documentos\1.pdf
  //src/views/1.pdf

  const printRemotePDF = async () => {
    const doc = new jsPDF();

    doc.text('Hello world!', 10, 10);
    doc.text('This is client-side Javascript, pumping out a PDF.', 10, 20);

    //.save('a4.pdf');
     console.log('PDF created: ', doc.save());
    // await RNPrint.print({
    //   filePath:
    //     'data:application/pdf',
    // });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />

          <View style={styles.button}>
            <Button
              title="Crear venta"
              color={'#88b764'}
              onPress={() => {
                printRemotePDF();
              }}
            />
          </View>
          <View style={styles.salesListView}>
            <SalesList title="" />
          </View>
          <View style={styles.button}>
            <Button title="Crear egreso" onPress={() => {}} color={'#d35c50'}/>
          </View>
          <View style={styles.salesListView}>
            <ExpensesList title="" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Sales;
