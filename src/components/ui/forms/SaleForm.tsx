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
import {
  clientsList,
  salesList,
  addSale,
  updateSalesList,
  updateSale,
  userLogged,
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
    textInputB: {
      borderColor: '#628348',
      borderRadius: 4,
      paddingTop: 8,
      paddingLeft: 10,
      color: 'white',
      width: 150,
      height: 40,
    },
    inputGroup: {
      height: 'auto',
      paddingBottom: 2,
      paddingHorizontal: 4,
      marginBottom: 2,
      alignItems: 'flex-start',
    },
    titleText: {
      color: 'white',
      fontSize: 18,
    },
    buttonRow: {
      flexDirection: 'row',
      width: '100%',
      height: 'auto',
    },
    rowGroup: {
      flexDirection: 'row',
      height: 'auto',
      paddingBottom: 2,
      marginBottom: 2,
      alignItems: 'flex-end',
    },
    container2: {
      flex: 1,
      padding: 16,
    },
    textInput2: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    listItem: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 5,
      borderBottomWidth: 1,
      paddingHorizontal: 50,
      borderBottomColor: '#ddd',
    },
    itemList: {
      width: 400,
      height: 150,
      backgroundColor: '#628348',
      alignItems: 'flex-start',
      alignContent: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    addButton: {
      width: 70,
      height: 40,
      marginLeft: 10,
      marginBottom: 3,
    },
  });

type SaleFormProps = PropsWithChildren<{
  id?: string;
  isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

type itemProps = {
  name: string;
  price: string;
};

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
  const [clientName, setClientName] = useState('');
  const [inputs, setInputs] = useState<itemProps[]>([]);
  const [finalSum, setFinalSum] = useState(0);

  const cleanInputs = () => {
    setInputs([]);
    setFinalSum(0);
  };

  const addTextInput = (title: string, price: string) => {
    setInputs([...inputs, {name: title, price: price}]);
    setFinalSum(finalSum + +price);

    console.log(title);
    console.log(price);
  };

  const printRec = async () => {
    const now = new Date();
    await RNPrint.printTicket({
      name: 'Casa Pexoxos',
      user: userLogged[0].username,
      date: now.toLocaleDateString(),
      time: now.toTimeString().split(' ')[0],
      client: clientName,
      items: inputs,
      total: finalSum.toFixed(2).toString(),
      paymentMethod: pickerValue,
    });
  };

  const renderItem = (item: {id: string; item: itemProps}) => {
    console.log(item.item);
    return (
      <View style={styles.listItem}>
        <Text style={styles.titleText}>{item.item.name}</Text>
        <Text style={styles.titleText}>{'$' + item.item.price}</Text>
      </View>
    );
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
        const list = inputs.map(i => i.name);
        await addSale(finalSum, pickerValue, client, '', list);
        await updateSalesList();
        await printRec();
      } else {
        await updateSale(sale.id, finalSum, pickerValue, client, '', [
          services,
        ]);
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
              onValueChange={(itemValue, itemIndex) => {
                setClient(itemValue);
                setClientName(
                  clientListO.find(e => e.id === itemValue)?.name +
                    ' ' +
                    clientListO.find(e => e.id === itemValue)?.lastname,
                );
              }}
              itemStyle={{color: 'white'}}>
              {clientListO.map(item => (
                <Picker.Item
                  value={item.id}
                  label={
                    item.name !== '' || item.lastname !== ''
                      ? item.name + ' ' + item.lastname
                      : item.phone
                  }
                  key={item.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Método de pago</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              selectedValue={pickerValue}
              onValueChange={setPickerValue}
              enabled={true}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              <Picker.Item label="Efectivo" value="Efectivo" />
              <Picker.Item label="Transferencia" value="Transferencia" />
            </Picker>
          </View>
          <View style={styles.rowGroup}>
            <View style={styles.inputGroup}>
              <Text>Concepto:</Text>
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
              <Text>Precio:</Text>
              <TextInput
                style={styles.textInputB}
                onChangeText={setTotal}
                value={total}
                placeholder="$00.00"
                inputMode="decimal"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.addButton}>
              <Button
                color="#627489"
                title={'Agregar'}
                onPress={() => addTextInput(services, (+total).toFixed(2).toString())}
              />
            </View>
          </View>
          <View style={styles.itemList}>
            <FlatList data={inputs} renderItem={renderItem} />
          </View>
          <View style={styles.textInput} />
          <Button
            color="#627489"
            title={isNew ? 'Crear' : 'Modificar'}
            onPress={onSend}
          />
        </View>
      </View>
    </>
  );
}

export default SaleForm;
