export const GameList = ({id,name,author,price,rating,tags,kids})=>{
    return (
        <>
         <tbody>
            <tr className="gamerow">
               <td>{name}</td>
               <td>{author}</td>
               <td>{tags}</td>
               <td>{price}</td>
               <td>{kids?"YES":"NO"}</td>
               <td>{rating}</td>
            </tr>
         </tbody>
        </>
    );
};