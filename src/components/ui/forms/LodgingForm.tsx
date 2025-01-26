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
  dogBoxes,
  catBoxes,
  clientsList,
  addLodging,
  updateLodgingList,
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
      backgroundColor: '#cc519cdf',
    },
    textInput: {
      borderColor: '#cc519c',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 450,
      height: 70,
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
      fontSize: 16,
    },
    rowGroup: {
      flexDirection: 'row',
      height: 'auto',
      paddingBottom: 2,
      marginBottom: 2,
      alignItems: 'flex-start',
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

const species = ['Perro', 'Gato', 'Razas Pequeñas'];

type LodgingFormProps = PropsWithChildren<{
  title: string;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function LodgingForm(props: LodgingFormProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date(Date.now() - 18000000);
  const [time, setTime] = useState(today);
  const [date, setDate] = useState(today);
  const [timeF, setTimeF] = useState(today);
  const [dateF, setDateF] = useState(today);
  const [spec, setSpec] = useState();
  const [size, setSize] = useState();
  const [annotations, setAnnotations] = useState();
  const [petListO, setPetListO] = useState(
    petList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [clientListO, setClientListO] = useState(
    clientsList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [pet, setPet] = useState();
  const [client, setClient] = useState();
  const [isSpecieSelected, setIsSpecieSelected] = useState(false);
  const [sizeList, setSizeList] = useState([]);

  const onSend = async () => {
    const checkIn = new Date(
      date.toISOString().split('T')[0] + 'T' + time.toISOString().split('T')[1],
    );
    const checkOut = new Date(
      dateF.toISOString().split('T')[0] +
        'T' +
        timeF.toISOString().split('T')[1],
    );

    try {
      await addLodging(new Date(checkIn.getTime() + 18000000), new Date(checkOut.getTime() + 18000000), client, pet, size, spec);
      await updateLodgingList();
    } catch (e) {
      console.log(e);
    }
    props.onSend?.({} as GestureResponderEvent);
  };

  const onSpecieSelect = e => {
    setSpec(e);
    if (e == 'Perro') {
      setSizeList(dogBoxes);
      setIsSpecieSelected(true);
    } else if (e === 'Gato') {
      setSizeList(catBoxes);
      setIsSpecieSelected(true);
    } else {
      setSize('');
      setIsSpecieSelected(false);
      setSizeList([]);
    }
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
          <View style={styles.rowGroup}>
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
                    setSpec(_pet.specie);
                    onSpecieSelect(_pet.specie);
                    setPet(e);
                    console.log(pet);
                  }}
                  prompt="this prompt"
                  mode="dialog"
                  itemStyle={{color: 'white'}}>
                  {petListO.map(item => (
                    <Picker.Item
                      value={item.id}
                      label={item.name}
                      key={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View>
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
            </View>
          </View>
          <View style={styles.rowGroup}>
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.titleText}>Especie</Text>
                <Picker
                  accessibilityLabel="Disabled Example"
                  style={{height: 50, width: 200, margin: 5, color: 'white'}}
                  enabled={false}
                  selectedValue={spec}
                  onValueChange={e => {
                    setSpec(e);
                    if (e == 'Perro') {
                      setSizeList(dogBoxes);
                      setIsSpecieSelected(true);
                    } else if (e === 'Gato') {
                      setSizeList(catBoxes);
                      setIsSpecieSelected(true);
                    } else {
                      setSize('');
                      setIsSpecieSelected(false);
                      setSizeList([]);
                    }
                  }}
                  prompt="this prompt"
                  mode="dialog"
                  itemStyle={{color: 'white'}}>
                  {species.map((e, i) => (
                    <Picker.Item key={i} label={e} value={e} />
                  ))}
                </Picker>
              </View>
            </View>
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.titleText}>Tamaño</Text>
                <Picker
                  accessibilityLabel="Disabled Example"
                  style={{height: 50, width: 200, margin: 5, color: 'white'}}
                  enabled={isSpecieSelected}
                  selectedValue={size}
                  onValueChange={setSize}
                  prompt="this prompt"
                  mode="dialog"
                  itemStyle={{color: 'white'}}>
                  {sizeList.map(item => (
                    <Picker.Item
                      value={item.box}
                      label={item.box}
                      key={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text>Escribir Anotaciones</Text>
            <TextInput
              style={styles.textInput}
              value={annotations}
              onChangeText={setAnnotations}
              placeholder="Anotaciones"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.rowGroup}>
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.titleText}>Entrada:</Text>
                <Text style={styles.titleText}>Fecha</Text>
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
                <Text style={styles.titleText}>Hora</Text>
                <DateTimePicker
                  is24Hour={false}
                  mode="time"
                  value={time}
                  minuteInterval={15}
                  onChange={e => setTime(new Date(e.nativeEvent.timestamp))}
                  style={{width: 300, opacity: 1, height: 50}}
                />
              </View>
            </View>
            <View>
              <View style={styles.inputGroup}>
                <Text style={styles.titleText}>Salida:</Text>
                <Text style={styles.titleText}>Fecha</Text>
                <DateTimePicker
                  accessibilityLabel="Simple Example"
                  value={dateF}
                  minimumDate={today}
                  onChange={e => {
                    setDateF(new Date(e.nativeEvent.timestamp));
                  }}
                  mode="date"
                  style={{width: 200, opacity: 1, height: 50}}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.titleText}>Hora</Text>
                <DateTimePicker
                  is24Hour={false}
                  mode="time"
                  value={timeF}
                  minuteInterval={15}
                  onChange={e => setTimeF(new Date(e.nativeEvent.timestamp))}
                  style={{width: 300, opacity: 1, height: 50}}
                />
              </View>
            </View>
          </View>

          <Button color="#3ab549" title="Agendar Cita" onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default LodgingForm;
