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
import ServiceCard from '../Cards/ServiceCard';
import LodgingCard from '../Cards/LodgingCard';


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

type LodgingListProps = PropsWithChildren<{
  title: string;
}>;

function LodgingList({ title }: LodgingListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);

  const lodging = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Coffee',
      inDate: '28/12/2024',
      outDate: '02/01/2025',
      time: '12:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Krispy G.',
      inDate: '22/12/2024',
      outDate: '27/12/2024',
      time: '12:00 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Canelo',
      inDate: '27/12/2024',
      outDate: '08/01/2025',
      time: '12:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d73',
      name: 'Coffee',
      inDate: '27/12/2024',
      outDate: '08/01/2025',
      time: '12:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      name: 'Cloe',
      inDate: '27/12/2024',
      outDate: '08/01/2025',
      time: '12:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2zxa',
      name: 'Gala',
      inDate: '29/12/2024',
      outDate: '03/01/2025',
      time: '11:00 AM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f63',
      name: 'Pancho',
      inDate: '28/12/2024',
      outDate: '04/01/2025',
      time: '11:30 AM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
  ];

  return (
    <>
			<View style={styles.container}>
        <FlatList
          data={lodging}
          renderItem={({item}) =>
            <LodgingCard name={item.name}
              inDate={item.inDate}
              outDate={item.outDate}
              time={item.time}
              color={item.color}
              petImage={item.petImage}
            />
          }
          numColumns={4}
        />
			</View>
		</>
  );
}

export default LodgingList;
