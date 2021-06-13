import React, {useState} from 'react';
import './form.css'
import {db} from './firebase.js';
import './App';



const MyForm = () => {

    const [r_name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [tools, setTools] = useState("");
    const [recipe, setRecipe] = useState("");

    const [loader, setLoader] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        event.target.reset(); //clear the form inputs after submitted
        setLoader(true);

        db.collection('user_recipes').add({
            name: r_name,
            ingredients: ingredients,
            tools: tools,
            recipe: recipe,
        })
        .then(()=>{
            alert("Your recipe has been submitted");
            setLoader(false);
        })
        .catch((error)=>{
            alert(error.message);
            setLoader(false);
        });

    {/*setName("");
    setIngredients("");
    setTools("");
    setRecipe("");*/}

    };
    
      
      return (
        <div className="form">
            <form id ="recipe_form" onSubmit = {handleSubmit}>
                <p>Enter name of the Recipe:</p>
                <input id = "R_name" type="text" required name="r_name" onChange={(event) => setName(event.target.value)} />
               
                <p>Enter ingredients</p>
                <textarea id="Ingredients" required name="ingredients"  onChange={(event) => setIngredients(event.target.value)}/>

                <p>Enter the tools required</p>
                <textarea id ="tools" required name="tools"  onChange={(event) => setTools(event.target.value)}/>


                <p>Enter the recipe</p>
                <textarea id="recipe" required name="recipe" onChange={(event) => setRecipe(event.target.value)}/>

                <br></br>
                <button type="submit" className="submit-bt" style ={{background: loader? "#00cc66" : "rgb(51,153,255))"}} >Submit</button>
            </form>
            
        </div>
        );
    
  };
  


export default MyForm;