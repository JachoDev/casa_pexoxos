import {
  collection,
  doc,
  setDoc,
  getDocs,
  Timestamp,
  addDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import {db} from '../../../../firebaseConfig';

export const petList = [];
export const clientsList = [];
export const expensesList = [];
export const salesList = [];
export const lodgingList = [];
export const cutsList = [];
export const inventory = [];
export const dogBoxes = [];
export const catBoxes = [];

//Firebase Firestore fast functions
//Read data from Firestore Section

export const getPets = async () => {
  if (petList.length === 0) {
    const queryPets = collection(db, 'mascotas');
    const querySnapshotPets = await getDocs(queryPets);
    querySnapshotPets.forEach(doc => {
      if (!petList.find(e => e.id === doc.id)) {
        const _doc = {
          id: doc.id,
          name: doc.data().Name,
          breed: doc.data().Breed,
          clientId: doc.data().ClientID,
          recomenations: doc.data().recomenations,
          sex: doc.data().Sex,
          specie: doc.data().Specie,
          petImage: '../../../assets/images/pexoxo1.jpg',
        };
        petList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getClients = async () => {
  if (clientsList.length === 0) {
    const queryClients = collection(db, 'clientes');
    const querySnapshotClients = await getDocs(queryClients);
    querySnapshotClients.forEach(doc => {
      if (!clientsList.find(e => e.id === doc.id)) {
        const _doc = {
          id: doc.id,
          name: doc.data().Name,
          lastname: doc.data().Lastname,
          address: doc.data().Address,
          phone: doc.data().Phone,
          suburb: doc.data().Suburb,
          pets: doc.data().PetID,
        };
        clientsList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getExpenses = async () => {
  if (expensesList.length === 0) {
    const queryExpenses = collection(db, 'egresos');
    const querySnapshotExpenses = await getDocs(queryExpenses);
    querySnapshotExpenses.forEach(doc => {
      if (!expensesList.find(e => e.id == doc.id)) {
        const _doc = {
          id: doc.id,
          date: doc.data().Createdat,
          expenditure: doc.data().Expenditure,
          paymentMethod: doc.data().PaymentMethod,
          total: doc.data().Total,
        };
        expensesList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getSales = async () => {
  if (salesList.length === 0) {
    const querySales = collection(db, 'ventas');
    const querySnapshotSales = await getDocs(querySales);
    querySnapshotSales.forEach(doc => {
      if (!salesList.find(e => e.id === doc.id)) {
        const _doc = {
          id: doc.id,
          name: doc.data().Name,
          hospedajeId: doc.data().HospedajeID,
          clientId: doc.data().ClientID,
          date: doc.data().Createdat,
          paymentMethod: doc.data().PaymentMethod,
          services: doc.data().Services,
          total: doc.data().Total,
        };
        salesList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getLodging = async () => {
  if (lodgingList.length === 0) {
    const queryLodging = collection(db, 'hospedaje');
    const querySnapshotLodging = await getDocs(queryLodging);
    querySnapshotLodging.forEach(doc => {
      if (!lodgingList.find(e => e.id === doc.id)) {
        const _doc = {
          id: doc.id,
          clientId: doc.data().ClientID,
          checkIn: doc.data().CheckIn,
          checkOut: doc.data().CheckOut,
          state: doc.data().Estado,
          size: doc.data().Size,
          petId: doc.data().PetID,
          specie: doc.data().Specie,
        };
        lodgingList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getCuts = async () => {
  if (cutsList.length === 0) {
    const querycuts = collection(db, 'cortes');
    const querySnapshotcuts = await getDocs(querycuts);
    querySnapshotcuts.forEach(doc => {
      if (!cutsList.find(e => e.id === doc.id)) {
        const _doc = {
          id: doc.id,
          groomming: doc.data().Grooming,
          recomendations: doc.data().Recomendations,
          state: doc.data().State,
          petId: doc.data().PetID,
          checkIn: doc.data().CheckIn,
        };
        cutsList.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getDogBoxes = async () => {
  if (dogBoxes.length === 0) {
    const querydog = collection(db, 'cuartos');
    const querySnapshotdog = await getDocs(querydog);
    querySnapshotdog.forEach(doc => {
      if (!dogBoxes.find(e => e.id == doc.id)) {
        const _doc = {
          id: doc.id,
          box: doc.data().Size,
          qty: doc.data().Quantity,
        };
        dogBoxes.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getCatBoxes = async () => {
  if (catBoxes.length === 0) {
    const querycat = collection(db, 'gateros');
    const querySnapshotcat = await getDocs(querycat);
    querySnapshotcat.forEach(doc => {
      if (!catBoxes.find(e => e.id == doc.id)) {
        const _doc = {
          id: doc.id,
          box: doc.data().Size,
          qty: doc.data().Quantity,
        };
        catBoxes.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getInventory = async () => {
  if (inventory.length === 0) {
    const queryinv = collection(db, 'inventario');
    const querySnapshotinv = await getDocs(queryinv);
    querySnapshotinv.forEach(doc => {
      if (!inventory.find(e => e.id == doc.id)) {
        const _doc = {
          id: doc.id,
          product: doc.data().Product,
          qty: doc.data().Quantity,
        };
        inventory.push(_doc);
      }
      //console.log(doc.id, '=>', doc.data());
    });
  }
};

export const getAll = async () => {
  await getPets();
  await getClients();
  await getExpenses();
  await getSales();
  await getLodging();
  await getCuts();
  await getDogBoxes();
  await getCatBoxes();
  await getInventory();
};

//Addition functions to Firestore Section

export const addPet = async (
  _breed: string,
  _clientId: string,
  _name: string,
  _recs?: string,
  _sex?: string,
  _specie?: string,
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'mascotas'), {
    Breed: _breed,
    ClientID: _clientId,
    Createdat: Timestamp.fromDate(now),
    Name: _name,
    Recomenations: _recs ?? '',
    Sex: _sex ?? '',
    Specie: _specie ?? '',
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addClient = async (
  _phone: string,
  _name?: string,
  _lastname?: string,
  _address?: string,
  _suburb?: string,
  _pets?: string[],
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'clientes'), {
    Address: _address ? _address : '',
    Createdat: Timestamp.fromDate(now),
    Lastname: _lastname ? _lastname : '',
    Name: _name ? _name : '',
    Phone: _phone,
    PetID: _pets ? _pets : [],
    Suburb: _suburb ? _suburb : '',
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addExpense = async (
  _expenditure: string,
  _total: number,
  _paymentMethod: string,
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'egresos'), {
    Createdat: Timestamp.fromDate(now),
    Expenditure: _expenditure,
    PaymentMethod: _paymentMethod,
    Total: _total,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addSale = async (
  _total: number,
  _paymentMethod: string,
  _clientId?: string,
  _lodgingId?: string,
  _services?: string[],
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'ventas'), {
    ClientID: _clientId ?? '',
    Createdat: Timestamp.fromDate(now),
    HospedajeID: _lodgingId ?? '',
    PaymentMethod: _paymentMethod,
    Services: _services ?? [],
    Total: _total,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addLodging = async (
  _checkIn: Date,
  _checkOut: Date,
  _clientId: string,
  _petId: string,
  _size: string,
  _specie: string
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'hospedaje'), {
    CheckIn: Timestamp.fromDate(_checkIn),
    CheckOut: Timestamp.fromDate(_checkOut),
    ClientID: _clientId,
    Createdat: Timestamp.fromDate(now),
    Estado: 'Creado',
    PetID: [_petId],
    Size: _size,
    Specie: _specie,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addDogBox = async (_size: string, _qty: number) => {
  const newDoc = await addDoc(collection(db, 'dogBoxes'), {
    Quantity: _qty,
    Size: _size,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addCatBox = async (_size: string, _qty: number) => {
  const newDoc = await addDoc(collection(db, 'gateros'), {
    Quantity: _qty,
    Size: _size,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addInventoryItem = async (_product: string, _qty: number) => {
  const newDoc = await addDoc(collection(db, 'inventario'), {
    Product: _product,
    Quantity: _qty,
  });
  console.log('Document written with ID: ', newDoc.id);
};

export const addCut = async (
  _checkIn: Date,
  _grooming: string,
  _petId: string,
  _recs: string,
) => {
  const now = new Date();
  const newDoc = await addDoc(collection(db, 'cortes'), {
    CheckIn: Timestamp.fromDate(_checkIn),
    Createdat: Timestamp.fromDate(now),
    Grooming: _grooming,
    PetID: _petId,
    Recomendations: _recs,
    State: 'Creado',
  });
  console.log('Document written with ID: ', newDoc.id);
};

//Update functions to Firestore Section

export const updateCutState = async (_id: string, _state: string) => {
  const docRef = doc(db, 'cortes', _id);
  const newDoc = await updateDoc(docRef, {
    State: _state,
  });
};

export const updateLodgingState = async (_id: string, _state: string) => {
  const docRef = doc(db, 'hospedaje', _id);
  const newDoc = await updateDoc(docRef, {
    Estado: _state,
  });
};

//Delete functions to Firestore Section

export const clearPetList = () => {
  petList.splice(0, petList.length);
};

export const clearClientsList = () => {
  clientsList.splice(0, clientsList.length);
};

export const clearExpensesList = () => {
  expensesList.splice(0, expensesList.length);
};

export const clearSalesList = () => {
  salesList.splice(0, salesList.length);
};

export const clearLodgingList = () => {
  lodgingList.splice(0, lodgingList.length);
};

export const clearCutsList = () => {
  cutsList.splice(0, cutsList.length);
};

export const clearDogBoxes = () => {
  dogBoxes.splice(0, dogBoxes.length);
};

export const clearCatBoxes = () => {
  catBoxes.splice(0, catBoxes.length);
};

export const clearInventory = () => {
  inventory.splice(0, inventory.length);
};

export const clearAll = () => {
  clearPetList();
  clearClientsList();
  clearExpensesList();
  clearSalesList();
  clearLodgingList();
  clearCutsList();
  clearDogBoxes();
  clearCatBoxes();
  clearInventory();
};

//Update functions to Firestore Section

export const updatePetList = async () => {
  clearPetList();
  getPets();
};

export const updateClientsList = async () => {
  clearClientsList();
  getClients();
};

export const updateExpensesList = async () => {
  clearExpensesList();
  getExpenses();
};

export const updateSalesList = async () => {
  clearSalesList();
  getSales();
};

export const updateLodgingList = async () => {
  clearLodgingList();
  getLodging();
};

export const updateCutsList = async () => {
  clearCutsList();
  getCuts();
};

export const updateDogBoxes = async () => {
  clearDogBoxes();
  getDogBoxes();
};

export const updateCatBoxes = async () => {
  clearCatBoxes();
  getCatBoxes();
};

export const updateInventory = async () => {
  clearInventory();
  getInventory();
};

export const updateLists = async () => {
  clearAll();
  getAll();
};

//Replace functions Firestore

export const setPet = async (
  _id: string,
  _name?: string,
  _specie?: string,
  _breed?: string,
  _clientId?: string,
  _recs?: string,
  _sex?: string,
) => {
  const docRef = doc(db, 'mascotas', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    updateData.Name = _name;
    updateData.Specie = _specie;
    updateData.Breed = _breed;
    updateData.ClientID = _clientId;
    updateData.Recomenations = _recs;
    updateData.Sex = _sex;

    if (Object.keys(updateData).length > 0) {
      await setDoc(docRef, updateData);
    }
  }
};


//Update functions to Firestore Section

export const updateCut = async (
  _id: string,
  _state?: string,
  _checkIn?: Date,
  _petId?: string,
  _groomming?: string,
  _recomendations?: string,
) => {
  const docRef = doc(db, 'cortes', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_state && data.State !== _state) updateData.State = _state;
    if (_checkIn && data.CheckIn.toDate().getTime() !== _checkIn.getTime()) updateData.CheckIn = Timestamp.fromDate(_checkIn);
    if (_petId && data.PetID !== _petId) updateData.PetID = _petId;
    if (_groomming && data.Grooming !== _groomming) updateData.Grooming = _groomming;
    if (_recomendations && data.Recomendations !== _recomendations) updateData.Recomendations = _recomendations;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updatePet = async (
  _id: string,
  _name?: string,
  _specie?: string,
  _breed?: string,
  _clientId?: string,
  _recs?: string,
  _sex?: string,
) => {
  const docRef = doc(db, 'mascotas', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_name && data.Name !== _name) updateData.Name = _name;
    if (_specie) updateData.Specie = _specie;
    if (_breed && data.Breed !== _breed) updateData.Breed = _breed;
    if (_clientId && data.ClientID !== _clientId) updateData.ClientID = _clientId;
    if (_recs && data.Recomenations !== _recs) updateData.Recomenations = _recs;
    if (_sex && data.Sex !== _sex) updateData.Sex = _sex;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
      console.log('Document written with ID: ', docRef.id);
    }
  }
};


export const updateClient = async (
  _id: string,
  _name?: string,
  _lastname?: string,
  _address?: string,
  _phone?: string,
  _suburb?: string,
  _pets?: string[],
) => {
  const docRef = doc(db, 'clientes', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_name && data.Name !== _name) updateData.Name = _name;
    if (_lastname && data.Lastname !== _lastname) updateData.Lastname = _lastname;
    if (_address && data.Address !== _address) updateData.Address = _address;
    if (_phone && data.Phone !== _phone) updateData.Phone = _phone;
    if (_suburb && data.Suburb !== _suburb) updateData.Suburb = _suburb;
    if (_pets && JSON.stringify(data.PetID) !== JSON.stringify(_pets)) updateData.PetID = _pets;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updateExpense = async (
  _id: string,
  _expenditure?: string,
  _total?: number,
  _paymentMethod?: string,
) => {
  const docRef = doc(db, 'egresos', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_expenditure && data.Expenditure !== _expenditure) updateData.Expenditure = _expenditure;
    if (_total && data.Total !== _total) updateData.Total = _total;
    if (_paymentMethod && data.PaymentMethod !== _paymentMethod) updateData.PaymentMethod = _paymentMethod;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updateSale = async (
  _id: string,
  _total?: number,
  _paymentMethod?: string,
  _clientId?: string,
  _lodgingId?: string,
  _services?: string[],
) => {
  const docRef = doc(db, 'ventas', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_total && data.Total !== _total) updateData.Total = _total;
    if (_paymentMethod && data.PaymentMethod !== _paymentMethod) updateData.PaymentMethod = _paymentMethod;
    if (_clientId && data.ClientID !== _clientId) updateData.ClientID = _clientId;
    if (_lodgingId && data.HospedajeID !== _lodgingId) updateData.HospedajeID = _lodgingId;
    if (_services && JSON.stringify(data.Services) !== JSON.stringify(_services)) updateData.Services = _services;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updateDogBox = async (
  _id: string,
  _size?: string,
  _qty?: number,
) => {
  const docRef = doc(db, 'dogBoxes', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_size && data.Size !== _size) updateData.Size = _size;
    if (_qty && data.Quantity !== _qty) updateData.Quantity = _qty;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updateCatBox = async (
  _id: string,
  _size?: string,
  _qty?: number,
) => {
  const docRef = doc(db, 'gateros', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_size && data.Size !== _size) updateData.Size = _size;
    if (_qty && data.Quantity !== _qty) updateData.Quantity = _qty;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};

export const updateInventoryItem = async (
  _id: string,
  _product?: string,
  _qty?: number,
) => {
  const docRef = doc(db, 'inventario', _id);
  const docSnap = await getDoc(docRef);
  const updateData: any = {};

  if (docSnap.exists()) {
    const data = docSnap.data();

    if (_product && data.Product !== _product) updateData.Product = _product;
    if (_qty && data.Quantity !== _qty) updateData.Quantity = _qty;

    if (Object.keys(updateData).length > 0) {
      await updateDoc(docRef, updateData);
    }
  }
};
