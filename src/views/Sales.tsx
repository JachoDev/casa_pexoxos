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
import background from '../assets/images/background_yellow.png';
import SalesList from '../components/ui/Lists/SalesList';
import Searchbar from '../components/sections/SearchBar';
import ExpensesList from '../components/ui/Lists/ExpensesList';
import RNPrint from 'react-native-print';
import {Flyout} from 'react-native-windows';
import SaleForm from '../components/ui/forms/SaleForm';
import ExpenseForm from '../components/ui/forms/ExpenseForm';
const {jsPDF} = require('jspdf');

type SalesProps = PropsWithChildren<{
  title: string;
}>;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'auto',
      width: '100%',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    imageBackgorund: {
      justifyContent: 'flex-start',
      height: '100%',
      width: '100%',
    },
    salesListView: {
      width: '90%',
      height: '50%',
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
    },
    selectionButton: {
      width: 150,
      height: 40,
      marginLeft: 180,
      fontSize: 24,
      alignSelf: 'flex-start',
      borderRadius: 5,
      marginTop: 15,
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

function Sales({title}: SalesProps): React.JSX.Element {
  const styles = createStyles();
  const [showSaleFlyout, setShowSaleFlyout] = useState(false);
  const [showExpenseFlyout, setShowExpenseFlyout] = useState(false);
  const [isSales, setIsSales] = useState(true);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Flyout
          isOpen={showSaleFlyout}
          onDismiss={() => setShowSaleFlyout(false)}
          showMode="transient"
          isLightDismissEnabled={true}
          isOverlayEnabled={true}
          placement="bottom">
          <View style={[styles.flyer]}>
            <Text style={styles.textStyle}>Modificar información</Text>
            <SaleForm onSend={() => setShowSaleFlyout(false)} isNew={true} />
          </View>
        </Flyout>
        <Flyout
          isOpen={showExpenseFlyout}
          onDismiss={() => setShowExpenseFlyout(false)}
          showMode="transient"
          isLightDismissEnabled={true}
          isOverlayEnabled={true}
          placement="bottom">
          <View style={[styles.flyer]}>
            <Text style={styles.textStyle}>Modificar información</Text>
            <ExpenseForm
              onSend={() => setShowExpenseFlyout(false)}
              isNew={true}
            />
          </View>
        </Flyout>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={styles.imageBackgorund}>
          <Navbar title="" />
          <View style={styles.selectionButton}>
                <Button
                  title={isSales ? 'Ver Egresos' : 'Ver Ingresos'}
                  color={'#2e2e2e'}
                  onPress={() => {
                    setIsSales(!isSales);
                  }}
                />
              </View>
          {isSales ? (
            <>
              <View style={styles.button}>
                <Button
                  title="Crear venta"
                  color={'#88b764'}
                  onPress={() => {
                    setShowSaleFlyout(true);
                  }}
                />
              </View>
              <View style={styles.salesListView}>
                <SalesList title="" />
              </View>
            </>
          ) : (
            <>
              <View style={styles.button}>
                <Button
                  title="Crear egreso"
                  onPress={() => {
                    setShowExpenseFlyout(true);
                  }}
                  color={'#d35c50'}
                />
              </View>
              <View style={styles.salesListView}>
                <ExpensesList title="" />
              </View>
            </>
          )}
        </ImageBackground>
      </SafeAreaView>
    </>
  );
}

export default Sales;
