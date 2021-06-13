import React,{useState} from 'react'
import "./App.css"
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import Recipe from './components/Recipe'
import Alert from './components/Alert'
import MyRecipes from './display.js';
import MyForm from './Form.js'


import firebase from 'firebase'

const onDel = () => {
        
  let item = prompt("Enter recipe to delete")
  var q = firebase.firestore().collection("user_recipes").where("name", "==", item);
  q.get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
          doc.ref.delete();
  
      });
  });
}

const App = () => {

    let[query,setQuery]=useState("");
    const[recipes,setRecipes]=useState([]);
    const [alert,setAlert]=useState("");
    const [form,setForm]=useState(false);
    const [you,yourRecipe]=useState(false);
    const [view,viewRecipe]=useState(false);
    const APP_ID="4d538145";
    const APP_KEY="5a76249eef0f00a13042bedb74687c3f	";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    
    const getData=async()=>{
        if(query!==""){
            const result = await Axios.get(url);
            if(!result.data.more){
                return setAlert("No food with that name");
            }
            setRecipes(result.data.hits)
            console.log(result);
            setAlert("");
            setQuery=("");
        } else {
            setAlert("Please fill in the form")
        }

    };

    const onChange = (e) => {
        setQuery(e.target.value);
    };
     
    const onSubmit = (e) =>{
        e.preventDefault()
        getData();
    };

    const search =(e)=>{
        return(
            
            <form id ="abc" className="search-form" onSubmit={onSubmit}>
                {alert!=="" && <Alert alert={alert}/>}
                <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query} />
                <input type="submit" value="search"/>
            </form>

        )
    }

    
const addRecipe =(e)=>{
    return(
        <div className = "container-1">
        <h1>Please enter your recipe <br></br> </h1>
        {/*<h3 id="message">Please enter your recipe </h3>*/}
        <MyForm/>
        </div>
        
    );
}

    const v_Recipe=(e)=>{
        return(
            <div className = "container-1">
                <h1 className="recipeslist">Your recipes</h1>
                <MyRecipes></MyRecipes>
                <br></br>
                <div className="bt">
                    <h2>Click here to delete any recipe</h2>
                    <button type="submit" className="delete" type="submit" onClick={onDel}>Delete</button>
                </div>
            </div>
        )
    }
    
    return (

        
        <div className="App" >

            <div className="heading"  ><h1>S I M M E R</h1></div>
            <div className="quote">
                 <p></p>
            </div>

            <button className="b1" type="submit" onClick={()=>setForm(!form)}>Search Recipes</button>
            {form && search()}
            <div className="recipes">
                {recipes !==[] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}

            </div>
            <br></br>
            <br></br>
            <button className="b2" type="submit" onClick={()=>yourRecipe(!you)}>Add Recipes</button>
            {you && addRecipe()}
            <button className="b3" type="submit" onClick={()=>viewRecipe(!view)}>View Recipes</button>
            {view && v_Recipe()}
           <br></br>
           <br></br>
        </div>
        
        
    );
};

export default App
