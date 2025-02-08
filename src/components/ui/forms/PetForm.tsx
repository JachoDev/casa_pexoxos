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
  addPet,
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
      backgroundColor: '#9e3c5fdf',
    },
    textInputL: {
      borderColor: '#9e3c5f',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 300,
      height: 75,
    },
    textInput: {
      borderColor: '#9e3c5f',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 250,
      height: 40,
    },
    inputGroup: {
      height: 'auto',
      paddingBottom: 2,
      marginBottom: 2,
      alignItems: 'flex-start',
      marginHorizontal: 10,
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

const species = ['Perro', 'Gato', 'Razas Pequeñas'];
const sexs = ['Macho', 'Hembra'];

type PetFormProps = PropsWithChildren<{
  id?: string;
  isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function PetForm(props: PetFormProps): React.JSX.Element {
  const pet = props.id ? petList.find(e => e.id == props.id) : null;
  const [isNew, setIsNew] = useState(props.isNew ?? false);
  const _client = pet ? clientsList.find(e => e.id == pet.clientId) : null;
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [name, setName] = useState(pet ? pet.name : '');
  const [specie, setSpecie] = useState(pet ? pet.specie : '');
  const [breed, setBreed] = useState(pet ? pet.breed : '');
  const [sex, setSex] = useState(pet ? pet.sex : '');
  const [recs, setRecs] = useState(pet ? pet.recs : '');
  const [clientListO, setClientListO] = useState(
    clientsList.sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [client, setClient] = useState(_client ? _client.id : '');

  const onSend = async () => {
    try {
      if (isNew) {
        await addPet(breed, client, name, recs, sex, specie);
        await updatePetList();
      } else {
        await updatePet(props.id, name, specie, breed, client, recs, sex);
        await updatePetList();
      }
    } catch (e) {
      console.log(e);
    }
    props.onSend?.({} as GestureResponderEvent);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View>
          <View style={styles.rowGroup}>
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
              <Text>Cliente</Text>
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
          </View>
          <View style={styles.rowGroup}>
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
              <Text>Teléfono </Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={_client?.phone || ''}
                onChangeText={setName}
                placeholder="Telefono"
                placeholderTextColor="gray"
              />
            </View>
          </View>
          <View style={styles.rowGroup}>
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
              <Text>Dirección </Text>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={_client?.address || ''}
                onChangeText={setBreed}
                placeholder="Dirección"
                placeholderTextColor="gray"
              />
            </View>
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

export default PetForm;
