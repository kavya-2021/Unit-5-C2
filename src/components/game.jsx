import {useState,useEffect} from 'react';

import {GameInput} from './gameInput'

import {GameList} from './gameList'

export const Game = ()=>{
    const [dataN,setData] = useState([]);
    const [page,setPage] = useState(1);

    const getData =()=>{
        fetch(`http://localhost:3001/games`).then(response=>response.json()).then(data=>setData(data));
    }

    useEffect(()=>{
        getData()
    },[page]);

    const setDataFunc = (data)=>{
        fetch('http://localhost:3001/games', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
             getData();
            })
            .catch((error) => {
            console.error('Error:', error);
            });
     }

     const getSortedData =(term,val)=>{
            fetch(`http://localhost:3001/games?_sort=${term}&_order=desc`)
            .then(response=>response.json())
            .then(data=>setData(data));
          
     }

     const getSortedDatareverse =(term)=>{
          fetch(`http://localhost:3001/games?_sort=${term}&_order=asc`).then(response=>response.json()).then(data=>setData(data));
   }

    return (
    <div className="gameDiv" >
          <h1>Game app and List</h1> 
          <input id="searchbox" onChange={(e)=>{
              ///comments?author.name=typicode
              let val = e.target.value;
              fetch(`http://localhost:3001/games?gamename=${val}`)
              .then(response=>response.json())
              .then(data=>setData(data));

          }}type="text" placeholder="Search for the Game" />
        <GameInput handleData={setDataFunc}/>
        <table id="table">
            <thead>
                <tr>
                    <td>
                        <span> <span> game name </span>
                        <button onClick={()=>{
                            getSortedData("gamename")
                        }} onDoubleClick={()=>{
                            getSortedDatareverse("gamename")
                        }} id="sortbyname">sort</button> </span>
                    </td>
                    <td> game author</td>
                    <td>game tags</td>
                    <td>
                        <span> game price </span>
                        <button onClick={()=>{
                            getSortedData("gameprice")
                        }} onDoubleClick={()=>{
                            getSortedDatareverse("gameprice")
                        }} id="sortbyprice">sort</button>
                    </td>
                    <td>is for kids</td>
                    <td>
                        <span> rating </span>
                        <button onClick={()=>{
                            getSortedData("gamerating")
                        }} onDoubleClick={()=>{
                            getSortedDatareverse("gamerating")
                        }} id="sortbyrating">sort</button>
                    </td>
                </tr>
            </thead>
            {
                dataN.map((e)=>{
                    return (
                        <GameList key={e.id} name={e.gamename} author={e.gameauthor} price={e.gameprice} rating={e.gamerating} tags={e.gametags} kids={e.forkids}/>
                    )
                })
            }
        </table>

        <button disabled ={page==1?true:false} onClick={()=>{
            setPage(page-1)
        }}>Prev</button>
        <button  onClick={()=>{
            setPage(page+1)
        }}>Next</button>
    </div>
    );
}