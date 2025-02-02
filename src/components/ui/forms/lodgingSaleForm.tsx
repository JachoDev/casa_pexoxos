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
  addSale,
  updateSalesList,
  updateLodgingState,
  updateLodgingList,
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
      backgroundColor: '#028a8cdf',
    },
    textInput: {
      borderColor: '#028a8c',
      marginRight: 10,
      borderRadius: 4,
      paddingTop: 8,
      paddingLeft: 10,
      color: 'white',
      width: 250,
      height: 40,
    },
    textInputB: {
      borderColor: '#028a8c',
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
      backgroundColor: '#028a8c',
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

type LodgingSaleFormProps = PropsWithChildren<{
  title: string;
  clientId: string;
  services: string;
  pets: string;
  serviceId: string;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

type itemProps = {
  name: string;
  price: string;
};

function LodgingSaleForm(props: LodgingSaleFormProps): React.JSX.Element {
  const styles = createStyles();
  const [pickerValue, setPickerValue] = useState();
  const [total, setTotal] = useState();
  const client = clientsList.find(item => item.id == props.clientId);
  const [inputs, setInputs] = useState<itemProps[]>([]);
  const [finalSum, setFinalSum] = useState(0);
  const [onlyFirst, setOnlyFirst] = useState(true);
  const [services, setServices] = useState('');
  const [subtotal, setSubtotal] = useState('');

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
      date: now.toLocaleDateString(),
      user: userLogged[0].username,
      time: now.toTimeString().split(' ')[0],
      client: client.name + ' ' + client.lastname,
      items: onlyFirst
        ? [{name: props.services, price: (+total!).toFixed(2).toString()}]
        : [
            {name: props.services, price: (+total!).toFixed(2).toString()},
            ...inputs,
          ],
      total: (onlyFirst ? +total! : finalSum + +total!).toFixed(2).toString(),
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
    const _total = onlyFirst ? +total : finalSum + +total;
    const list = onlyFirst
      ? [props.services]
      : [{name: props.services, price: total}, ...inputs].map(i => i.name);
    try {
      await addSale(_total, pickerValue, client.id, props.serviceId, list);
      await updateLodgingState(props.serviceId, 'Cobrado');
      await updateLodgingList();
      await updateSalesList();
      await printRec();
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
          <View style={styles.rowGroup}>
            <View style={styles.inputGroup}>
              <Text>Cliente</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={client.name + ' ' + client.lastname}
                placeholder="Nombre"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Número de teléfono</Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={client.phone}
                placeholder="000-000-0000"
                dataDetectorTypes={'phoneNumber'}
                inputMode="tel"
                keyboardType="number-pad"
                keyboardAppearance="dark"
                placeholderTextColor="gray"
              />
            </View>
          </View>
          <Text>Mascotas: {props.pets}</Text>
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
          <View style={styles.rowGroup}>
            <View style={styles.inputGroup}>
              <Text>Servicios</Text>
              <TextInput
                style={styles.textInput}
                value={props.services}
                editable={false}
                placeholder="Corte"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text>Precio</Text>
              <TextInput
                style={styles.textInputB}
                onChangeText={e => setTotal(e)}
                value={total}
                placeholder="$00.00"
                inputMode="decimal"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.addButton}>
              <Button
                color="#627489"
                title={'Adicionales'}
                onPress={() => {
                  setOnlyFirst(!onlyFirst);
                }}
              />
            </View>
          </View>

          {!onlyFirst ? (
            <>
              <Text>Adicionales:</Text>
              <View style={styles.rowGroup}>
                <View style={styles.inputGroup}>
                  <Text>Concepto:</Text>
                  <TextInput
                    style={styles.textInput}
                    value={services}
                    onChangeText={setServices}
                    placeholder="Corte"
                    placeholderTextColor="gray"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text>Precio:</Text>
                  <TextInput
                    style={styles.textInputB}
                    onChangeText={setSubtotal}
                    value={subtotal}
                    placeholder="$00.00"
                    inputMode="decimal"
                    placeholderTextColor="gray"
                  />
                </View>
                <View style={styles.addButton}>
                  <Button
                    color="#627489"
                    title={'Agregar'}
                    onPress={() =>
                      addTextInput(services, (+subtotal).toFixed(2).toString())
                    }
                  />
                </View>
              </View>
              <View style={styles.itemList}>
                <FlatList data={inputs} renderItem={renderItem} />
              </View>
            </>
          ) : null}
          <View style={styles.textInput} />
          <Button color="#762776" title="Cobrar" onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default LodgingSaleForm;
