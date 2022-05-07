import { db } from "../firebase-config";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export let getLogs = async () => {
  var promise = new Promise(function (resolve, reject) {
    setTimeout(async () => {
        let logs = [];
        const q = query(
        collection(db, "logs"),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.key = doc.id;
        logs.push(data);
      });
      resolve(logs);
    }, 100);
  });
  return promise;
};
