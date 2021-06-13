import firebase from 'firebase';

const onDel = () => {
        
    let item = prompt("Enter recipe to delete")
    var q = firebase.firestore().collection("user_recipes").where("name", "==", item);
    q.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
    
        });
    });
  }

  export default onDel;