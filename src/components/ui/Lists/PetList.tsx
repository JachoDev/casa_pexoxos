import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import PetCard from '../Cards/PetCards';
import { petList } from '../../../../App';


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
    },
  });

type PetListProps = PropsWithChildren<{
  title: string;
}>;

function PetList(props: PetListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const [pets, setPets] = useState(petList);

  useEffect(() => {
    setPets(petList);
    console.log(pets)
  
    return cleanUp = () => {
      
    }
  }, [pets]);


  return (
    <>
			<View style={styles.container}>
      <FlatList
          data={pets}
          renderItem={({item}) =>
            <PetCard name={item.name}
              image={''}
            />
          }
          numColumns={5}
        />
			</View>
		</>
  );
}

export default PetList;
