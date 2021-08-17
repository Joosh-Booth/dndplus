import { RegularText } from "./texts"


const PlayersList = ({players=[], owner=false}) => {
  console.log(owner)
  return(
    <div style={{border:'1px solid black', maxHeight:"100%",overflowY:'hidden'}}>
      {players.map(player=>(
        <div style={{textAlign:'center', padding:20, borderBottom:'solid'}} key={player.username}> 
          <RegularText> {player.username} </RegularText>
        </div>
      ))}
      
    </div>
  )
}

export default PlayersList