import { getStorage, ref, getDownloadURL,   } from "firebase/storage";
import { app } from '../../../../firebaseConfig';

const storage = getStorage(app);

const imagePetRef = ref(storage, 'images/pets');

export const testRef = ref(storage, 'Test/Peoxoxo4.jpg');

export const getUrl = (path: string) => {
  const _ref = ref(storage, path);

  getDownloadURL(_ref)
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'
    console.log(url);
    // This can be downloaded directly:
    // const xhr = new XMLHttpRequest();
    // xhr.responseType = 'blob';
    // xhr.onload = (event) => {
    //   const blob = xhr.response;
    // };
    // xhr.open('GET', url);
    // xhr.send();
    return url;
    // Or inserted into an <img> element
    // const img = document.getElementById('myimg');
    // img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
    console.log(error);
  });
};

export const uploadImage = async (id: string) => {
  const _ref = ref(storage, 'images/pets/' + id);

  

};
