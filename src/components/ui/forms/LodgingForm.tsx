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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ServiceCard from '../Cards/ServiceCard';
import { cutsList, petList } from '../../../../App';
import {Picker} from '@react-native-picker/picker';



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
      backgroundColor: '#ff66c4df'
    },
    textInput: {
      borderColor: '#ff66c4',
      borderRadius: 4,
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
    }
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

type LodgingFormProps = PropsWithChildren<{
  title: string;
}>;

function Picks() {
  return cuts.forEach((item) => {return <Picker.Item label={item} value={item} />});
}

function LodgingForm({ title }: LodgingFormProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [time, setTime] = useState(new Date(0));
  const [pickerValue, setPickerValue] = useState();
  const today = new Date();

  useEffect(() => {
  
    return cleanUp = () => {
      
    }
  }, []);

  return (
    <>
			<View style={styles.container}>
        <View>
          <View style={styles.inputGroup}>
            <Text>Buscar Pexoxo</Text>
            <TextInput style={styles.textInput}
                                            placeholder='Nombre'
                                            placeholderTextColor='gray' />
            <Text>Cliente:</Text>
          </View>
          <View style={styles.inputGroup}>
                      <Text>Escribir Anotaciones</Text>
                      <TextInput style={styles.textInput}
                                                      placeholder='Anotaciones'
                                                      placeholderTextColor='gray' />
                    </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Tamaño</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              prompt='this prompt'
              mode='dialog'
              itemStyle={{color: 'white'}}>
              <Picker.Item label='ExtraSmall' value='ExtraSmall' style={{color: 'white'}}/>
              <Picker.Item label='Small' value='Small' />
              <Picker.Item label='Medium' value='Medium' />
              <Picker.Item label='ExtraLarge' value='ExtraLarge' />
              <Picker.Item label='XXL' value='XXL' />
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Entrada</Text>
            <Text style={styles.titleText}>Fecha</Text>
            <DateTimePicker
              accessibilityLabel="Simple Example"
              value={today}
              onChange={() => {}}
              mode="date"
              style={{width: 200, opacity: 1, height: 50}}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Hora</Text>
            <DateTimePicker mode='time' value={time} style={{width: 300, opacity: 1, height: 50, }} />
          </View>
          <View style={styles.inputGroup}>
          <Text style={styles.titleText}>Salida</Text>
            <Text style={styles.titleText}>Fecha</Text>
            <DateTimePicker
              accessibilityLabel="Simple Example"
              value={today}
              onChange={() => {}}
              mode="date"
              style={{width: 200, opacity: 1, height: 50}}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Hora</Text>
            <DateTimePicker mode='time' value={time} style={{width: 300, opacity: 1, height: 50, }} />
          </View>
          
          <Button  color='#3ab549' title='Agendar Cita' onPress={() => {}}/>
        </View>
			</View>
		</>
  );
}

export default LodgingForm;
