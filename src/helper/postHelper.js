import { db } from "../firebase-config";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

let shortList = [];
let latitudeFor5 = 0,
  longitudeFor5 = 0;
let latitudeFor25 = 0,
  longitudeFor25 = 0;

export function addPost(
  title,
  type,
  quantity,
  freshFor,
  address,
  delivery,
  uid
) {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = 37.893995 - position.coords.latitude;
    let longitude = position.coords.longitude - 66.804471;
    // console.log(
    //   position.coords.latitude,
    //   latitude,
    //   latitude / 0.04521858664,
    //   latitude % 0.04521858664
    // );
    // console.log(
    //   position.coords.longitude,
    //   longitude,
    //   longitude / 0.04521858664,
    //   longitude % 0.04521858664
    // );
    latitudeFor5 = Math.floor(latitude / 0.04521858664);
    longitudeFor5 = Math.floor(longitude / 0.04491515527);
    latitudeFor25 = Math.floor(latitude / (0.04521858664 * 5));
    longitudeFor25 = Math.floor(longitude / (0.04491515527 * 5));
  });

  setTimeout(() => {
    let date = new Date();
    let freshtill = new Date();
    freshtill.setHours(freshtill.getHours() + parseInt(freshFor));
    setDoc(doc(db, "posts", date.toISOString()), {
      userid: uid,
      title: title,
      foodType: type,
      quantity: quantity,
      quantityleft: quantity,
      freshTill: freshtill,
      address: address,
      delivery: delivery,
      createdAt: date,
      latitudeFor5: latitudeFor5,
      latitudeFor25: latitudeFor25,
      longitudeFor5: longitudeFor5,
      longitudeFor25: longitudeFor25,
      id: date.toISOString(), 
    });

    setDoc(doc(db, "logs", date.toISOString()), {
      message: `Food is available for ${quantity} people.`,
      type: 'add',
      notificationType: 'mini',
      time: date.toISOString(),
    });

  }, 500);
  
  console.log("added");
}

export let getPosts = async (page = "donar") => {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = 37.893995 - position.coords.latitude;
    let longitude = position.coords.longitude - 66.804471;
    console.log(
      position.coords.latitude,
      latitude,
      latitude / 0.04521858664,
      latitude % 0.04521858664
    );
    console.log(
      position.coords.longitude,
      longitude,
      longitude / 0.04521858664,
      longitude % 0.04521858664
    );
    latitudeFor5 = Math.floor(latitude / 0.04521858664);
    longitudeFor5 = Math.floor(longitude / 0.04491515527);
    latitudeFor25 = Math.floor(latitude / (0.04521858664 * 5));
    longitudeFor25 = Math.floor(longitude / (0.04491515527 * 5));
  });

  var promise = new Promise(function (resolve, reject) {
    setTimeout(async () => {
      let posts = [];
      console.log(latitudeFor5, longitudeFor5);
      let q;
      if (page === "donar") {
      q = query(
        collection(db, "posts"),
        where("latitudeFor5", "==", latitudeFor5),
        where("longitudeFor5", "==", longitudeFor5)
      ); 
      } else {
      q = query(
        collection(db, "posts"),
        where("latitudeFor5", "==", latitudeFor5),
        where("longitudeFor5", "==", longitudeFor5)
        // where("quantityleft", ">", 0)
      );
      }
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        console.log("data ",data);
        data.key = doc.id;
        posts.push(data);
        shortList.push(data);
      });
      console.log("posts there... ",posts);
      resolve(posts);
    }, 1000); 
  });
  return promise;
};

export let getExtendedPosts = async () => {
  // let posts = [];
  // const q = query(
  //   collection(db, "posts"),
  //   where("freshTill", ">", new Date()),
  //   where("quantityleft", ">", 0),
  //   where("latitudeFor25", "==", latitudeFor25),
  //   where("longitudeFor25", "==", longitudeFor25)
  // );
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   let data = doc.data();
  //   data.key = doc.id;
  //   if (!shortList.includes(data)) {
  //     posts.push(data);
  //   }
  // });
  // console.log(posts);
  // return posts;
};

export let getMyPosts = async (uid) => {
  let posts = [];
  const q = query(collection(db, "posts"), where("userid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    data.key = doc.id;
    posts.push(data);
  });
  console.log("get posts",posts);
  return posts;
};

export let updateQuantityOnDB = async (id,quantityleft) => {
  console.log("q ",id,quantityleft);
  updateDoc(doc(db, "posts", id), {
    quantityleft: quantityleft,
  }); 
};

export let addlog = async (type, quantity, name) => {
  // TODO
  let date = new Date();
  console.log("claimed");
   if (type === "claimed") {
    setDoc(doc(db, "logs", new Date().toISOString()), {
      message: `${name} has claimed ${quantity} plates.`,
      type: 'claim',
      notificationType: 'mini',
      time: date.toISOString(),
    });
  } else {
    setDoc(doc(db, "logs", new Date().toISOString()), {
      message: `${name} has claimed ${quantity} plates.`,
      type: 'claim',
      notificationType: 'highlight',
      time: date.toISOString(),
    });
  }
};
