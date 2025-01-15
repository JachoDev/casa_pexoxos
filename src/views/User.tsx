import React, {useState} from 'react';
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
import RNPrint from 'react-native-print';
import {Flyout} from 'react-native-windows';
import InventoryForm from '../components/ui/forms/InventoryForm';

const {jsPDF} = require('jspdf');
var RNFS = require('react-native-fs');

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
      alignContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    salesListView: {
      width: 500,
      height: 400,
      marginTop: 15,
      backgroundColor: '#',
      alignSelf: 'center',
    },
    addButton: {
      marginTop: 40,
      width: 250,
    },
    flyer: {
      width: 700,
      height: 650,
      backgroundColor: '#ffffffe0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
      alignContent: 'center',
      alignSelf: 'center',
      verticalAlign: 'middle',
    },
    textStyle: {
      color: 'black',
    },
  });

function User({title}: UserProps): React.JSX.Element {
  const styles = createStyles();
  const [showFlyout, setShowFlyout] = useState(false);

  const printRemotePDF = async () => {
    // const doc = new jsPDF();

    // doc.text('Hello world!', 10, 10);
    // doc.text('This is client-side Javascript, pumping out a PDF.', 10, 20);

    //.save('a4.pdf');
    //console.log('PDF created: ', doc.save());
    // const doc = new jsPDF();
    // doc.text('Hello world!', 10, 10);
    // doc.text('This is client-side Javascript, pumping out a PDF.', 10, 20);
    // const pdfOutput = doc.output('blob');
    // const filePath = `${RNFS.DocumentDirectoryPath}/example.pdf`;
    // await RNFS.writeFile(filePath, pdfOutput, 'base64');
    // await RNPrint.print({ filePath });
    RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then(statResult => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log(contents);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout
          isOpen={showFlyout}
          onDismiss={() => setShowFlyout(false)}
          showMode="transient"
          isLightDismissEnabled={true}
          isOverlayEnabled={true}
          placement="bottom">
          <View style={[styles.flyer]}>
            <Text style={styles.textStyle}>Modificar información</Text>
            <InventoryForm onSend={() => setShowFlyout(false)} isNew={true} />
          </View>
        </Flyout>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />

          <View style={styles.addButton}>
            <Button
              title="Agregar producto"
              onPress={() => {
                setShowFlyout(true);
              }}
              color={'#e94b57'}
            />
          </View>
          <View style={styles.salesListView}>
            <InventoryList title="" />
          </View>
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default User;
