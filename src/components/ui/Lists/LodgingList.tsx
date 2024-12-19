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
import ServiceCard from '../Cards/ServiceCard';
import LodgingCard from '../Cards/LodgingCard';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { petList, lodgingList } from '../../../../App';


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
  const [lodging, setLodging] = useState(lodgingList);
  const [pets, setPets] = useState(petList);

  useEffect(() => {
    //const _lodging = getLodging();
    setLodging(lodgingList);
    setPets(petList);
    console.log(pets)
    console.log(lodging)
  
    return cleanUp = () => {
      
    }
  }, [lodging, pets]);



  return (
    <>
			<View style={styles.container}>
        <FlatList
          data={lodging}
          renderItem={({item}) =>
            <LodgingCard name={petList.find((e) => e.id == item.petId[0]).name}
              inDate={item.checkIn.toDate().toDateString()}
              outDate={item.checkOut.toDate().toDateString()}
              time={item.checkOut.toDate().toTimeString()}
              color={''}
              petImage={''}
            />
          }
          numColumns={4}
        />
			</View>
		</>
  );
}

export default LodgingList;
