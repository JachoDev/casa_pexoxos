
import React, { useEffect } from 'react';


import AppRouter from './src/router/RouterNavigator';
import { db, firebaseOptions } from './firebaseConfig';
import { collection, doc, setDoc, getDocs, Timestamp  } from "firebase/firestore"; 

export const petList = [];
export const clientsList = [];
export const salesList = [];
export const lodgingList = [];
export const cutsList = [];


function App(): React.JSX.Element  {
  const appdb = db;
  // firebase.initializeApp(firebaseOptions);
  // const usersCollection = firestore().collection('Users');
  // // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  const getStore = async () => {
    try {

      console.log('Firestore connected')
      const queryPets = collection(db, "mascotas");  
      const querySnapshotPets = await getDocs(queryPets);
      querySnapshotPets.forEach((doc) => {
        if (!(petList.find((e) => e.id == doc.id))) {
                  const _doc = {
                    id: doc.id,
                    name: doc.data().Name,
                    breed: doc.data().Breed,
                    clientId: doc.data().ClientID,
                    recomenations: doc.data().recomenations,
                    sex: doc.data().Sex,
                    petImage: '../../../assets/images/pexoxo1.jpg',
                  }
                  petList.push(_doc)
                }
        //console.log(doc.id, '=>', doc.data());
      });
      const queryClients = collection(db, "clientes");  
      const querySnapshotClients = await getDocs(queryClients);
      querySnapshotClients.forEach((doc) => {
        if (!(clientsList.find((e) => e.id == doc.id))) {
                  const _doc = {
                    id: doc.id,
                    name: doc.data().Name,
                    lastname: doc.data().Lastname,
                    address: doc.data().Address,
                    phone: doc.data().Phone,
                    suburb: doc.data().Suburb,
                    pets: doc.data().PetID
                  }
                  clientsList.push(_doc)
                }
        //console.log(doc.id, '=>', doc.data());
      });
      const querySales = collection(db, "ventas");  
      const querySnapshotSales = await getDocs(querySales);
      querySnapshotSales.forEach((doc) => {
        if (!(salesList.find((e) => e.id == doc.id))) {
                  const _doc = {
                    id: doc.id,
                    name: doc.data().Name,
                    hospedajeId: doc.data().HospedajeID,
                    clientId: doc.data().ClientID,
                    date: doc.data().Createdat,
                    paymentMethod: doc.data().PaymentMethod,
                    services: doc.data().Services,
                    total: doc.data().Total,
                  }
                  salesList.push(_doc)
                }
        //console.log(doc.id, '=>', doc.data());
      });
      const queryLodging = collection(db, "hospedaje");  
      const querySnapshotLodging = await getDocs(queryLodging);
      querySnapshotLodging.forEach((doc) => {
        if (!(lodgingList.find((e) => e.id == doc.id))) {
                  const _doc = {
                    id: doc.id,
                    clientId: doc.data().ClientID,
                    checkIn: doc.data().CheckIn,
                    checkOut: doc.data().CheckOut,
                    state: doc.data().Estado,
                    size: doc.data().Size,
                    petId: doc.data().PetID,
                  }
                  lodgingList.push(_doc)
                }
        //console.log(doc.id, '=>', doc.data());
      });
      const querycuts = collection(db, "cortes");  
      const querySnapshotcuts = await getDocs(querycuts);
      querySnapshotcuts.forEach((doc) => {
        if (!(cutsList.find((e) => e.id == doc.id))) {
                  const _doc = {
                    id: doc.id,
                    groomming: doc.data().Grooming,
                    recomendations: doc.data().Recomendations,
                    state: doc.data().State,
                    petId: doc.data().PetID,
                    checkIn: doc.data().CheckIn,
                  }
                  cutsList.push(_doc)
                }
        //console.log(doc.id, '=>', doc.data());
      });
    }
    catch(e) { console.log(e) }
  }


  useEffect(() => {
    getStore();

      
    return cleanUp = () => {
      
    }
  }, []);

  const backgroundStyle = "bg-neutral-300";
  return (
    <>
      <AppRouter/>
    </>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
