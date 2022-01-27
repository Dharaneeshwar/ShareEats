import { db } from "../firebase-config";
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

export function addPost(title, type, quantity, freshFor, address, delivery) {
  let latitude = 0, longitude = 0;
  
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });

  setTimeout(() => {
    let date = new Date();
    let freshtill = new Date(); 
    freshtill.setHours(freshtill.getHours() + parseInt(freshFor));
    setDoc(doc(db, "simpleposts", date.toISOString()), {
      userid:1,
      title: title,
      foodType: type,
      quantity: quantity,
      quantityleft: quantity,
      freshTill: freshtill,
      address: address,
      delivery: delivery,
      createdAt: date,
      latitude: latitude,
      longitude: longitude,
      clusterid: 1,
      bucketid: 1
      });
  },500)
  
  console.log("added");
}

export let getPosts = async () => {
  let posts = [];
  const q = query(collection(db,"simpleposts"), where("freshTill", ">", new Date()));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data.key = doc.id;
    posts.push(data);
  });
  console.log(posts);
  return posts;
}

