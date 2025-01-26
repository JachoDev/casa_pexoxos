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
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {
  petList,
  clientsList,
  addCut,
  updateCutsList,
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
      backgroundColor: '#762776df',
    },
    textInput: {
      borderColor: '#762776',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 300,
      height: 75,
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
  });

const cuts = [
  'Baño',
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

type DateFormProps = PropsWithChildren<{
  title: string;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function DateForm( props : DateFormProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date(Date.now() - 18000000);
  const [time, setTime] = useState(today);
  const [date, setDate] = useState(today);
  const [petListO, setPetListO] = useState(
    petList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [clientListO, setClientListO] = useState(
    clientsList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [pet, setPet] = useState();
  const [client, setClient] = useState();
  const [recs, setRecs] = useState('');
  const [cut, setCut] = useState();

  const onSend = async () => {
    
    console.log(date.toISOString().split('T')[0]);
    console.log(time.toTimeString());
    const checkIn = new Date(date.toISOString().split('T')[0] + 'T' + time.toISOString().split('T')[1]);
    console.log(checkIn.toUTCString());
    try {
      await addCut(new Date(checkIn.getTime() + 18000000), cut, pet, recs);
      await updateCutsList();
    } catch (e) {
      console.log(e);
    }
    props.onSend?.({} as GestureResponderEvent);
  };

  useEffect(() => {
    setPetListO(petList.sort((a, b) => a.name.localeCompare(b.name)));
    setClientListO(clientsList.sort((a, b) => a.name.localeCompare(b.name)));
    return () => {};
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.inputGroup}>
            <Text>Buscar Mascota</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              selectedValue={pet}
              onValueChange={e => {
                console.log(e + ' this id');
                const _pet = petList.find(_e => _e.id == e);
                setClient(_pet.clientId);
                setPet(e);
                console.log(pet);
              }}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              {petListO.map(item => (
                <Picker.Item value={item.id} label={item.name} key={item.id} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Buscar Cliente</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={false}
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
            <Text>Escribir recomendaciones</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={recs}
              onChangeText={setRecs}
              placeholder="Recomendaciones"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Tipo de corte</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              selectedValue={cut}
              onValueChange={setCut}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              {cuts.map(item => (
                <Picker.Item value={item} label={item} key={item} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Seleccionar Fecha</Text>
            <DateTimePicker
              accessibilityLabel="Simple Example"
              value={date}
              minimumDate={today}
              onChange={e => {
                setDate(new Date(e.nativeEvent.timestamp));
              }}
              mode="date"
              style={{width: 200, opacity: 1, height: 50}}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Seleccionar Horario</Text>
            <DateTimePicker
              mode="time"
              value={time}
              minuteInterval={15}
              onChange={e => setTime(new Date(e.nativeEvent.timestamp))}
              style={{width: 300, opacity: 1, height: 50}}
            />
          </View>
          <Button color="#03bdbf" title="Agendar Cita" onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default DateForm;
