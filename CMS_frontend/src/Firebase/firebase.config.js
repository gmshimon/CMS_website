import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDlpUS2CE8TaEfOGMSGR55_OKqL6RB98qA',
  authDomain: 'cms-website-efbff.firebaseapp.com',
  projectId: 'cms-website-efbff',
  storageBucket: 'cms-website-efbff.firebasestorage.app',
  messagingSenderId: '634730323748',
  appId: '1:634730323748:web:f822e0df8df97885071db1'
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth
