import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import ServiceCard from '../Cards/ServiceCard';
import { cutsList, petList, clientsList, salesList } from '../../../../App';
import {Picker} from '@react-native-picker/picker';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { doc, collection, addDoc, Timestamp, updateDoc, getDocs } from "firebase/firestore"; 
import { db } from '../../../../firebaseConfig';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';



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
      backgroundColor: '#03bdbfdf'
    },
    textInput: {
      borderColor: '#03bdbf',
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
      alignItems: 'flex-start'
    },
    titleText: {
      color: 'white',
      fontSize: 16
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

type CutSaleFormProps = PropsWithChildren<{
  title: string;
  clientId: string;
  services: string;
  pets: string;
  serviceId: string;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function CutSaleForm( props : CutSaleFormProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  //const client = clientsList.find();
  const [time, setTime] = useState(new Date(0));
  const [pickerValue, setPickerValue] = useState();
  const [total, setTotal] = useState();
  const today = new Date();
  const client = clientsList.find((item) => item.id == props.clientId);
  console.log(props.serviceId + ' service Id')

  useEffect(() => {
  
    return cleanUp = () => {
      
    }
  }, []);

  const printRemotePDF = async () => {
    await RNPrint.print({
      filePath: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    });
  };

  const addSale = async (clientId: string, createdAt: Date, lodgingId: string, paymentMethod: string, services: string[], total: Float ) => {
    const docRef = await addDoc(collection(db, "ventas"), {
      ClientID: clientId,
      Createdat: Timestamp.fromDate(createdAt),
      HospedajeID: lodgingId,
      PaymentMethod: paymentMethod,
      Services: services,
      Total: total,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const updateService = async (id) => {
    const docRef = doc(db, "cortes", id);
    const newDoc = updateDoc(docRef, {
      "State": "Cobrado"
    })
  };

  const updateLists = async () => {
    const querySales = collection(db, "ventas");  
    const querySnapshotSales = await getDocs(querySales);
          querySnapshotSales.forEach((doc) => {
            if (!(salesList.find((e) => e.id == doc.id))) {
                      const _doc = {
                        id: doc.id,
                        name: doc.data().Name,
                        hospedajeId: doc.data().HospedajeID,
                        clientId: doc.data().ClientID,
                        date: doc.data().Createdat,
                        paymentMethod: doc.data().PaymentMethod,
                        services: doc.data().Services,
                        total: doc.data().Total,
                      }
                      salesList.push(_doc)
                    }
            //console.log(doc.id, '=>', doc.data());
          });
    cutsList.splice(0, cutsList.length);
    console.log(cutsList.length)
  };

  const getList = async () => {
    const querycuts = collection(db, "cortes");  
          const querySnapshotcuts = await getDocs(querycuts);
          querySnapshotcuts.forEach((doc) => {
            if (!(cutsList.find((e) => e.id == doc.id))) {
                      const _doc = {
                        id: doc.id,
                        groomming: doc.data().Grooming,
                        recomendations: doc.data().Recomendations,
                        state: doc.data().State,
                        petId: doc.data().PetID,
                        checkIn: doc.data().CheckIn,
                      }
                      cutsList.push(_doc)
                    }
            //console.log(doc.id, '=>', doc.data());
          });
  };

  const onSend = async () => {
    
    try {
      addSale(client.id, new Date(), '', pickerValue, [props.services], +(total));
      updateService(props.serviceId);
      updateLists()
      printRemotePDF()
    } catch(e) {
      console.log(e)
    }
    console.log('sale close')
    props.onPress();
    console.log(cutsList.length)
  };

  useEffect(() => {
  
    return cleanUp = () => {
    
    }
  }, []);

  return (
    <>
			<View style={styles.container}>
        <View>
          <View style={styles.inputGroup}>
            <Text>Cliente</Text>
            <TextInput style={styles.textInput}
              editable={false}
              value={client.name + ' ' + client.lastname}
              placeholder='Nombre'
              placeholderTextColor='gray' />
            <Text>Mascotas: {props.pets}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text>Número de teléfono</Text>
            <TextInput style={styles.textInput}
              editable={false}
              value={client.phone}
              placeholder='000-000-0000'
							dataDetectorTypes={'phoneNumber'}
							inputMode='tel'
							keyboardType='number-pad'
							keyboardAppearance='dark'
              placeholderTextColor='gray' />
          </View>
					<View style={styles.inputGroup}>
            <Text>Servicios</Text>
            <TextInput style={styles.textInput}
            value={props.services}
              editable={false}
              placeholder='Corte'
              placeholderTextColor='gray' />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Método de pago</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              selectedValue={pickerValue}
              onValueChange={setPickerValue}
              enabled={true}
              prompt='this prompt'
              mode='dialog'
              itemStyle={{color: 'white'}}>
              <Picker.Item label='Efectivo' value='Efectivo' style={{color: 'white'}}/>
              <Picker.Item label='Transferencia' value='Transferencia' />
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Total</Text>
            <TextInput style={styles.textInput}
              onChangeText={(e) => setTotal(e)}
              value={total}
              placeholder='$00.00'
							inputMode='decimal'
              placeholderTextColor='gray' />
          </View>
					<View style={styles.textInput}/>
          <Button  color='#762776' title='Cobrar' onPress={onSend}/>
        </View>
			</View>
		</>
  );
}

export default CutSaleForm;
