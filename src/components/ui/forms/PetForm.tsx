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


type PetFormProps = PropsWithChildren<{
  title: string;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PetForm(props: PetFormProps): React.JSX.Element {
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

  const onSend = () => {
    console.log(date.toISOString().split('T')[0]);
    console.log(time.toTimeString());
    const checkIn = new Date(
      date.toISOString().split('T')[0] + 'T' + time.toISOString().split('T')[1],
    );
    console.log(checkIn.toUTCString());
    try {

    } catch (e) {
      console.log(e);
    }
    props.onSend();
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
					<Text>Modificar </Text>
          <View style={styles.inputGroup}>
						<Text>Nombre </Text>
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
						<Text>Especie </Text>
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
						<Text>Raza </Text>
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
						<Text>Sexo </Text>
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
						<Text>Recomendaciones </Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={recs}
              onChangeText={setRecs}
              placeholder="Recomendaciones"
              placeholderTextColor="gray"
            />
          </View>
          <Button color="#03bdbf" title="Agendar Cita" onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default PetForm;
