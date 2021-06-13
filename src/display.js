import {React, useEffect, useState} from 'react';
import './form.css';
import firebase from 'firebase'

function MyRecipes  () {

    const [recipes, setRecipes] = useState([]);
    

    useEffect(()=>{
        const fetchData = async () => {
        const db = firebase.firestore()
        const data = await db.collection('user_recipes').get()
        setRecipes(data.docs.map(doc => ({...doc.data(), id:doc.id})))
        }
        fetchData()
    },[])
    

    

    
    return(
        <div className="rc">
            <scrollbars>
            {
                recipes.map((recipe, index) =>{
                    return(
                        <div key = {index} className="recipe-container">
                        <h2> {recipe.name} </h2>
                        <br></br>
                        <p > <p className="food">Tools required:</p> 
                            {recipe.tools} </p>
                            <br></br>
                            <p ><p className="food"> Ingredients:</p> 
                            {recipe.ingredients} </p>
                            <br></br>
                            <p ><p className="food"> Recipe: </p>
                            {recipe.recipe} </p>
                            
                        {/*<p><button onClick={()=>setShowT(!showt)}>Tools Required</button>
                            {showt && recipe.tools}</p>
                        <p><button onClick={()=>setShowI(!showi)}>Ingredients</button>
                            {showi && recipe.ingredients}</p>
                        <p><button onClick={()=>setShowR(!showr)}>Recipe</button>
                        {showr && recipe.recipe}</p>*/}
                        
                        
                        

                        </div>

                        
                    )
                })
            }
            </scrollbars>
        </div>
    )
  
};

export default MyRecipes;