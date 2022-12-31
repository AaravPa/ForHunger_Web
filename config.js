import * as firebase from 'firebase';
//require('@firebase/storage')
import '@firebase/storage';

  const firebaseConfig = {
  apiKey: "AIzaSyADllxPTbKXRH4xIgYuq-1YjmezRe2RcMc",
  authDomain: "forhunger-e20ff.firebaseapp.com",
  databaseURL: "https://forhunger-e20ff-default-rtdb.firebaseio.com",
  projectId: "forhunger-e20ff",
  storageBucket: "forhunger-e20ff.appspot.com",
  messagingSenderId: "788785769807",
  appId: "1:788785769807:web:71b8fd43184e534b11293a",
  measurementId: "G-84TPQYE5KL"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export default firebase.storage();
export { firebase };