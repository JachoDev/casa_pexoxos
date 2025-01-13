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
  updateCut,
  updatePet,
  setPet,
  updatePetList,
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
    textInputL: {
      borderColor: '#762776',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 300,
      height: 75,
    },
    textInput: {
      borderColor: '#762776',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
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
  });

const species = ['Perro', 'Gato', 'Razas Pequeñas'];
const sexs = ['Macho', 'Hembra'];

type PetFormProps = PropsWithChildren<{
  id?: string;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PetForm(props: PetFormProps): React.JSX.Element {
  const pet = petList.find(e => e.id == props.id);
  const client = clientsList.find(e => e.id == pet.clientId);
  const clientName = client ? client.name + ' ' + client.lastname : 'No asignado';
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date(Date.now() - 18000000);
  const [clientId, setClientId] = useState(pet.clientId ?? '');
  const [name, setName] = useState(pet.name ?? '');
  const [specie, setSpecie] = useState(pet.specie ?? '');
  const [breed, setBreed] = useState(pet.breed ?? '');
  const [sex, setSex] = useState(pet.sex ?? '');
  const [recs, setRecs] = useState(pet.recs ?? '');
  const [owner, setOwner] = useState(clientName ?? '');

  const onSend = () => {
    try {
      updatePet(props.id, name, specie, breed, clientId, recs, sex);
      updatePetList();
    } catch (e) {
      console.log(e);
    }
    props.onSend();
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>Dueño: {owner}</Text>
          <Button color="#03bdbf" title="Agregar imagen" onPress={onSend} />
          <View style={styles.inputGroup}>
            <Text>Nombre </Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Especie</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              selectedValue={specie}
              onValueChange={setSpecie}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              {species.map((e, i) => (
                <Picker.Item key={i} label={e} value={e} />
              ))}
            </Picker>
          </View>

          <View style={styles.inputGroup}>
            <Text>Raza </Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={breed}
              onChangeText={setBreed}
              placeholder="Raza"
              placeholderTextColor="gray"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Sexo</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              selectedValue={sex}
              onValueChange={setSex}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              {sexs.map((e, i) => (
                <Picker.Item key={i} label={e} value={e} />
              ))}
            </Picker>
          </View>
          <View style={styles.inputGroup}>
            <Text>Recomendaciones </Text>
            <TextInput
              style={styles.textInputL}
              multiline={true}
              value={recs}
              onChangeText={setRecs}
              placeholder="Recomendaciones"
              placeholderTextColor="gray"
            />
          </View>
          <Button color="#03bdbf" title="Modificar" onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default PetForm;
