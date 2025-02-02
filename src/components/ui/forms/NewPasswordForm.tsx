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
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {
  inventory,
  addInventoryItem,
  updateInventory,
  updateInventoryItem,
  userLogged,
  updateUser,
  updateUsers,
} from '../../../services/firebase/firestore/firestoreService';

const createStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#b53a43',
      borderWidth: 6,
      borderColor: '#2e2e2e',
    },
    textInputL: {
      borderColor: '#b53a43',
      borderRadius: 4,
      color: 'white',
      paddingTop: 8,
      paddingLeft: 10,
      width: 300,
      height: 75,
    },
    textInput: {
      borderColor: '#b53a43',
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

const numbers = Array.from({length: 100}, (_, i) => {
  return {
    id: i,
    number: i.toString(),
  };
});

type NewPasswordFormProps = PropsWithChildren<{
  id?: string;
  isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function NewPasswordForm(props: NewPasswordFormProps): React.JSX.Element {
  const styles = createStyles();
  const user = userLogged[0];
  const [isNew, setIsNew] = useState(props.isNew ?? false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

  const onSend = async () => {
    try {
      if ( user.password === password ) {
        if (password !== newPassword) {
          if ( newPassword === newPasswordRepeat) {
            console.log(user.id);
            console.log(newPassword);
            updateUser(user.id, '', newPassword).then(
              () => Alert.alert('Contraseña actualizada correctamente')
              );
            updateUsers();
          } else {
            Alert.alert('Error', 'Confirme correctamente su contraseña');
          }

        } else {
          Alert.alert('Error', 'La contraseña nueva tiene que ser diferente');
        }
      } else {
        Alert.alert('Error', 'Contraseña incorrecta');
      }
    } catch (e) {
      Alert.alert('Error', e.toString());
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
          <View style={styles.inputGroup}>
            <Text>Contraseña</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="Contraseña"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Nueva contraseña</Text>
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Nueva contraseña"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              value={newPasswordRepeat}
              onChangeText={setNewPasswordRepeat}
              placeholder="Confirmar contraseña"
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

export default NewPasswordForm;
