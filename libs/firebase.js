import firebase from 'firebase';
import { sleep } from './function';
const firebaseService  = function (options, projectName) {
    this.options = options;
    this.projectName = projectName;

    this.initializeApp = async () => {
        let options = this.options;
        let projectName = this.projectName;

        let firebaseConfig = {
            apiKey: options && options.apiKey ? options.apiKey: "AIzaSyClE-xrIGSl_-vKYtRFRFBM-JZ5YuoIjJo",
            authDomain: options && options.authDomain ? options.authDomain: "fbchat-3a4de.firebaseapp.com",
            databaseURL: options && options.databaseURL ? options.databaseURL: "https://fbchat-3a4de.firebaseio.com",
            projectId: options && options.projectId ? options.projectId: "fbchat-3a4de",
            storageBucket: options && options.storageBucket ? options.storageBucket: "fbchat-3a4de.appspot.com",
            messagingSenderId: options && options.messagingSenderId ? options.messagingSenderId: "212851134272",
            appId: options && options.appId ? options.appId: "1:212851134272:web:9ddd6bf5ab3f1eb55334a5",
            measurementId: options && options.measurementId ? options.measurementId: "G-ZQC2MXESTB"
        };

        let app = projectName ? await firebase.initializeApp(firebaseConfig, projectName): await firebase.initializeApp(firebaseConfig);
        await app.auth().signInWithEmailAndPassword('thien1988@gmail.com', '123456');
        this.firebaseApp = app;
    }

    this.writeData = (path, data) => {
        this.firebaseApp.database().ref(path).set(data);
    }

    this.generateId = async (path) => {
       return await this.firebaseApp.database().ref().child(path).push().key;
    }

    this.readOnce = async (path) => {
        let ref = this.firebaseApp.database().ref(path);
        let snapshot  = await ref.once('value');
        return snapshot.val();
    }

    this.update = async (data) => {
        await this.firebaseApp.database().ref().update(data);
    }

    this.getFilter = async(path, orderField, orderValue) => {
        let ref = this.firebaseApp.database().ref(path);
        let snapshot = await ref.orderByChild(orderField).equalTo(orderValue).once('value');
        return snapshot.val();
    }

    return this;
}

export default firebaseService;
