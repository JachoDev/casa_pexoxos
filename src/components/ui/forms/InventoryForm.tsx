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
	inventory,
	addInventoryItem,
  updateInventory,
  updateInventoryItem,
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
      backgroundColor: '#b53a43df',
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

type InventoryFormProps = PropsWithChildren<{
  id?: string;
	isNew?: boolean;
  onSend?: null | ((event: GestureResponderEvent) => void) | undefined;
}>;

function InventoryForm(props: InventoryFormProps): React.JSX.Element {
  const styles = createStyles();
	const item = inventory.find(e => e.id == props.id);
	const [isNew, setIsNew] = useState(props.isNew ?? false);
	const [product, setProduct] = useState(item ? item.product : '');
	const [quantity, setQuantity] = useState(item ? item.qty : 0);


  const onSend = async () => {
    try {
			if (isNew) {
				await addInventoryItem(product, quantity);
        await updateInventory();
			} else {
        await updateInventoryItem(item.id, product, quantity);
        await updateInventory();
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
          <View style={styles.inputGroup}>
            <Text>Nombre </Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={product}
              onChangeText={setProduct}
              placeholder="Nombre"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.titleText}>Cantidad</Text>
            <Picker
              accessibilityLabel="Disabled Example"
              style={{height: 50, width: 200, margin: 5, color: 'white'}}
              enabled={true}
              selectedValue={quantity}
              onValueChange={e => setQuantity(+e)}
              prompt="this prompt"
              mode="dialog"
              itemStyle={{color: 'white'}}>
              {numbers.map((e, i) => (
                <Picker.Item key={i} label={e.number} value={e.id} />
              ))}
            </Picker>
          </View>
          <Button color="#627489" title={isNew ? 'Crear' : 'Modificar'} onPress={onSend} />
        </View>
      </View>
    </>
  );
}

export default InventoryForm;
