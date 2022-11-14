import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function IndividualChat({socket}) {
    const {socketId} = useParams();
    const [chatList , setChatList] = useState([]);
    const [inputMsg , setInputMsg] = useState('');

    useEffect(()=>{
        socket.on('POSTindividualChatMsg' , function(callerId , msg){ //? 상대방 채팅메세지 받기
            setChatList(chatList => [...chatList , `${callerId}님 : ${msg}`]);
        })
    },[])

    //* 채팅메세지 보내기
    const sendMsg = ()=>{
        setChatList(chatList => [...chatList , `나 : ${inputMsg}`]);
        socket.emit('POSTindividualChatMsg' , socketId , inputMsg , function(){
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
            //! 상대방이 새로고침하거나 페이지를 벗어낫을때 연결끊겼다는 메세지가 있으면 될거같다 
        })
    }
  return (
      
    <div>
        <h1 style={{'color': 'blue'}}>FAKE LIKE 랜덤채팅</h1>
        <h2>내 아이디 <br></br>{socket.id}</h2>
        <h2 style={{'color' : 'red'}} >상대 아이디 <br></br>{socketId}</h2>
        <div style={{'fontSize' : '13px'}}>개인챗</div>
        <div style={{'width':'100%' , 'border' : '1px solid black' , 'minHeight' : '200px'}}>
            {
                chatList.map((element , index)=>{
                    return (<div key={index}>{element}</div>)
                })
            }
        </div>

        <input type="text" placeholder='챗내용' style={{'outline':'none' ,'borderTop': 'solid 1px #D3D3D3' , 'borderLeft': 'solid 1px #D3D3D3', 
        'borderRight': '0px' ,'borderBottom': '0px', 'background':' #F8F8F8' ,'width':'95%','fontSize': '12pt' , 'height': '32px' , 
        'lineHeight':'18px'}} value={inputMsg} onChange={(e)=>{setInputMsg(e.target.value)}} ></input>
        <button style={{'height':'37px', 'fontSize' : '12pt'}} onClick={sendMsg}>전송</button>
    </div>
  )
}

export default IndividualChat
