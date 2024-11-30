import { useTheme } from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  //SafeAreaView,
  Text,
  View,
  FlatList,
} from 'react-native';
import PetCard from '../Cards/PetCards';


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

  const pets = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Mascota 1',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Mascota 2',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Mascota 3',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2zxa',
      name: 'Mascota 4',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f63',
      name: 'Mascota 5',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
      name: 'Mascota 1',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
      name: 'Mascota 2',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      name: 'Mascota 3',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2zx4',
      name: 'Mascota 4',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f65',
      name: 'Mascota 5',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb281a',
      name: 'Mascota 1',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f23',
      name: 'Mascota 2',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d32',
      name: 'Mascota 3',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2z4a',
      name: 'Mascota 4',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f53',
      name: 'Mascota 5',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
  ];


  return (
    <>
			<View style={styles.container}>
      <FlatList
          data={pets}
          renderItem={({item}) =>
            <PetCard name={item.name}
              image={item.petImage}
            />
          }
          numColumns={5}
        />
			</View>
		</>
  );
}

export default PetList;
