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
import { cutsList, petList } from '../../../../App';



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

type ServiceListProps = PropsWithChildren<{
  title: string;
}>;

function ServiceList({ title }: ServiceListProps): React.JSX.Element {
  const {colors} = useTheme();
  const styles = createStyles(colors);
  const today = new Date();
  const filteredData = cutsList.filter((e) => e.checkIn.toDate().toDateString() == today.toDateString());
  const [services, setServices] = useState(filteredData);



  const list = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Mascota 1',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '01:00 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      name: 'Mascota 2',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '01:30 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Mascota 3',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '02:00 PM',
      color: 'blue',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb2zxa',
      name: 'Mascota 4',
      service: 'Corte',
      date: '15/11/2024',
      time: '03:00 PM',
      color: 'yellow',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa17f63',
      name: 'Mascota 5',
      service: 'Baño',
      date: '15/11/2024',
      time: '03:30 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d12',
      name: 'Mascota 6',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '04:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab328ba',
      name: 'Mascota 7',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '04:30 PM',
      color: 'purple',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa47f63',
      name: 'Mascota 8',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '05:00 PM',
      color: 'yellow',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e59d72',
      name: 'Mascota 9',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '06:00 PM',
      color: 'red',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53ab728ba',
      name: 'Mascota 10',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '06:30 PM',
      color: 'purple',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa67f63',
      name: 'Mascota 11',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '07:00 PM',
      color: 'blue',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e62d72',
      name: 'Mascota 12',
      service: 'Corte y Baño',
      date: '15/11/2024',
      time: '07:30 PM',
      color: 'green',
      petImage: '../../../assets/images/pexoxo1.jpg',
    },
  ];

  useEffect(() => {
    setServices(filteredData);
  
    return cleanUp = () => {
      
    }
  }, [services]);

  return (
    <>
			<View style={styles.container}>
        <FlatList
          data={services}
          renderItem={({item}) =>
            <ServiceCard name={petList.find((e) => e.id == item.petId).name}
              service={item.groomming}
              recomendations={item.recomendations}
              date={item.checkIn.toDate().toDateString()}
              time={item.checkIn.toDate().toLocaleTimeString()}
              color={item.color}
              petImage={item.petImage}
            />
          }
          numColumns={3}
        />
			</View>
		</>
  );
}

export default ServiceList;
