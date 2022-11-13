import React from 'react'
import { useParams } from 'react-router-dom'

function IndividualChat({socket}) {
    const {socketId} = useParams();
  return (
      
    <div>
        <h1 style={{'color': 'blue'}}>FAKE LIKE 랜덤채팅</h1>
        <h2>내 아이디 <br></br>{socket.id}</h2>
        <h2 style={{'color' : 'red'}} >상대 아이디 <br></br>{socketId}</h2>
        <div style={{'fontSize' : '13px'}}>개인챗</div>
        <div style={{'width':'100%' , 'border' : '1px solid black' , 'minHeight' : '200px'}}>
            챗내용
        </div>

        <input type="text" placeholder='챗내용' style={{'outline':'none' ,'borderTop': 'solid 1px #D3D3D3' , 'borderLeft': 'solid 1px #D3D3D3', 
        'borderRight': '0px' ,'borderBottom': '0px', 'background':' #F8F8F8' ,'width':'95%','fontSize': '12pt' , 'height': '32px' , 
        'lineHeight':'18px'}}></input>
        <button style={{'height':'37px', 'fontSize' : '12pt'}}>전송</button>
    </div>
  )
}

export default IndividualChat
