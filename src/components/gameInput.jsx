import {useState,useEffect} from 'react';

export const GameInput = ({handleData})=>{
    const [isChecked, setIsChecked] = useState(false);
    const [formData,setFormData] = useState({
        "gamename": "",
        "gameauthor": "",
        "gameprice": "",
         "gametags": "",
         "forkids": "",
         "gamedesc": "",
        "gamerating": ""
    });

    const handleForm =(e)=>{
        const {name} = e.target;
        setIsChecked(!isChecked);
        if([name] == "forkids"){
            {isChecked ? e.target.value= true : e.target.value = false};
        } 
        if(e.target.value != null){
            setFormData({
                ...formData , [name]:e.target.value
            })
        }
    };

    function clearFields(event) {
        Array.from(event.target).forEach((e) => (e.value = ""));
      }

    return (
        <form id="addgame" onSubmit={(e)=>{
                e.preventDefault();
                handleData(formData);
                clearFields(e);
        }}>
            <input onChange={handleForm} name="gamename" className="gamename" type="text" placeholder='Enter name of the game'/>
            <input onChange={handleForm} name="gameauthor" className="gameauthor" type="text" placeholder='Enter name of author'/>
            <input onChange={handleForm} name="gametags" className="gametags" type="text" placeholder='Enter tags '/>
            <input onChange={handleForm} name="gameprice" className="gameprice" type="number" placeholder='Enter price'/>
            <input onChange={handleForm} name="forkids" className="forkids" type="checkbox" placeholder='Is this for kids?'/>
            <textarea onChange={handleForm} name="gamedesc" > </textarea>
            <select onChange={handleForm} name="gamerating" className="gamerating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input type="submit" />
        </form>
        // <textarea name="comment" form="addgame">Enter text here...</textarea>
       
    )
}