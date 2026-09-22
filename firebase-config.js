// Configuração pública do Firebase Web App.
// A API key do Firebase Web não é uma credencial Admin; a proteção é feita pelas Firestore Security Rules.
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBt-Fd6T7sUFi4Bn2-l6iJExwpduOYgVDc',
  authDomain: 'casamento-elisa-sergio.firebaseapp.com',
  projectId: 'casamento-elisa-sergio',
  storageBucket: 'casamento-elisa-sergio.firebasestorage.app',
  messagingSenderId: '724234017314',
  appId: '1:724234017314:web:eb1ff0a212eb593b9c487b'
};

firebase.initializeApp(FIREBASE_CONFIG);
const firestore = firebase.firestore();
