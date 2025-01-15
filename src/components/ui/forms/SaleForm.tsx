import {useTheme} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  GestureResponderEvent,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {
  clientsList,
  salesList,
  cutsList,
  addSale,
  updateCutState,
  updateCutsList,
  updateSalesList,
  updateSale,
} from '../../../services/firebase/firestore/firestoreService';

const createStyles = () =>
  StyleSheet.create({
    container: {
      paddingTop: 10,
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#628348df',
    },
    textInput: {
      borderColor: '#628348',
      borderRadius: 4,
      paddingTop: 8,
      paddingLeft: 10,
      color: 'white',
      width: 300,
      height: 40,
    },
    inputGroup: {
      height: 'auto',
      paddingBottom: 2,
      marginBottom: 2,
      alignItems: 'flex-start',
    },
    titleText: {
      color: 'white',
      fontSize: 16,
    },
    buttonRow: {
      flexDirection: 'row',
      width: '100%',
      height: 'auto',
    },
  });

const cuts = [
  'Corte tipo Schnauzer',
  'Corte tipo Scottish',
  'Corte completo con 10',
  'Corte completo con 7',
  'Corte completo con 5',
  'Corte completo con 4',
  'Corte completo con 3 1/2',
  'Rebaje con 10',
  'Rebaje con 7',
  'Rebaje con 5',
  'Rebaje con 4',
  'Rebaje con 3 1/2',
];

type SaleFormProps = PropsWithChildren<{
  id?: string;
  isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function SaleForm(props: SaleFormProps): React.JSX.Element {
  const styles = createStyles();
  const sale = props.id ? salesList.find(e => e.id == props.id) : null;
  const [isNew, setIsNew] = useState(props.isNew ?? false);
  const [pickerValue, setPickerValue] = useState(
    sale ? sale.paymentMethod : 'Efectivo',
  );
  const [total, setTotal] = useState(sale ? sale.total.toString() : '');
  const [clientListO, setClientListO] = useState(
    clientsList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [client, setClient] = useState(sale ? sale.clientId : '');
  const [services, setServices] = useState(sale ? sale.services[0] : '');

  useEffect(() => {
    return (cleanUp = () => {});
  }, []);

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath:
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    });
  };

  const onSend = async () => {
    if (!pickerValue) {
          Alert.alert('Error', 'Seleccione un método de pago');
          //alert('Seleccione un método de pago');
          return;
        }
        if (total === undefined || isNaN(+total)) {
          Alert.alert('Error', 'Total no es un número válido');
          //alert('Total no es un número válido');
          return;
        }
    try {
      if (isNew) {
        await addSale(+total, pickerValue, client, '', [services]);
        await updateSalesList();
        printRemotePDF();
      } else {
        await updateSale(sale.id, +total, pickerValue, client, '', [services]);
        await updateSalesList();
      }
    } catch (e) {
      console.log(e);
    }
    console.log('sale close');
    props.onSend?.({} as GestureResponderEvent);
  };

  useEffect(() => {
    return (cleanUp = () => {});
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.inputGroup}>
            <Text>Buscar Cliente</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={isNew}
              prompt="this prompt"
              mode="dialog"
              selectedValue={client}
              onValueChange={setClient}
              itemStyle={{color: 'white'}}>
              {clientListO.map(item => (
                <Picker.Item
                  value={item.id}
                  label={
                    item.name != '' || item.lastname != ''
                      ? item.name + ' ' + item.lastname
                      : item.phone
                  }
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Servicios</Text>
            <TextInput
              style={styles.textInput}
              value={services}
              onChangeText={setServices}
              editable={isNew}
              placeholder="Corte"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Método de pago</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              selectedValue={pickerValue}
              onValueChange={setPickerValue}
              enabled={true}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              <Picker.Item
                label="Efectivo"
                value="Efectivo"
                style={{color: 'white'}}
              />
              <Picker.Item label="Transferencia" value="Transferencia" />
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Total</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => setTotal(e)}
              value={total}
              placeholder="$00.00"
              inputMode="decimal"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.textInput} />
          <Button color="#627489" title={isNew ? 'Crear' : 'Modificar'} onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default SaleForm;
