import ReactDOM from 'react-dom'
import App from 'components/App'
import './base.css'
import { initializeApp } from "firebase/app";
import firebaseConfig from 'secrets/firebaseConfig';

const app = initializeApp(firebaseConfig);
console.log(app);

ReactDOM.render(<App />, document.getElementById('root'))
