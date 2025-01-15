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
  expensesList,
	addClient,
	updateClientsList,
	updateClient,
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
      backgroundColor: '#3385b7df',
    },
    textInput: {
      borderColor: '#3385b7',
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

type ClientFormProps = PropsWithChildren<{
  id?: string;
  isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function ClientForm(props: ClientFormProps): React.JSX.Element {
  const styles = createStyles();
  const expense = props.id ? expensesList.find(e => e.id == props.id) : null;
  const [isNew, setIsNew] = useState(props.isNew ?? false);
  const [name, setName] = useState();
	const [lastName, setLastName] = useState();
	const [phone, setPhone] = useState();
	const [location, setLocation] = useState();
	const [address, setAddress] = useState();

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
    try {
      if (isNew) {
				await addClient(phone, name, lastName, location, address);
				await updateClientsList();
      } else {
				await updateClient(props.id, name, lastName, address, phone, location);
				await updateClientsList();
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
            <Text>Nombre</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              editable={isNew}
              placeholder="Nombre"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Apellido</Text>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
              editable={isNew}
              placeholder="Apellido"
              placeholderTextColor="gray"
            />
          </View>
					<View style={styles.inputGroup}>
            <Text>Teléfono</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              editable={isNew}
              placeholder="Teléfono"
              placeholderTextColor="gray"
            />
          </View>
					<View style={styles.inputGroup}>
            <Text>Localidad</Text>
            <TextInput
              style={styles.textInput}
              value={location}
              onChangeText={setLocation}
              editable={isNew}
              placeholder="Localidad"
              placeholderTextColor="gray"
            />
          </View>
					<View style={styles.inputGroup}>
            <Text>Dirección</Text>
            <TextInput
              style={styles.textInput}
              value={address}
              onChangeText={setAddress}
              editable={isNew}
              placeholder="Dirección"
              placeholderTextColor="gray"
            />
          </View>
          <Button color="#627489" title={isNew ? 'Crear' : 'Modificar'} onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default ClientForm;
