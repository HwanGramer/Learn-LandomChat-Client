import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client';

let socket = io('http://localhost:8080', { transports: ["websocket"] }); //! 소켓서버 접속

function Socketpage() {
    const [userList , setUserList] = useState([]);
    const [myId , setMyId] = useState('');
    const [chatMsg , setChatMsg] = useState('');
    const [chatList , setChatList] = useState([]);

    useEffect(()=>{
        socket.on('GETuserList' , function(userList){ //? 유저목록을 실시간으로 보내줌.
            setUserList(userList);
        })
        socket.on('GETchat' , function(chat){
            setChatList(chatList => [...chatList , chat]); //? useState배열 이렇게 바꿔야되넹...
        })

        socket.emit('GETmySocketId' , function(socketId){ //? 나의 소켓아이디 가져옴
            setMyId(socketId);
        })
    },[])

    const chatSend = ()=>{
        socket.emit('POSTchat' , ({target : 'DefaultRoom' , msg : chatMsg})); //? 광장전체에 메세지 보냄
    }

  return (
    <div>
        <h1 style={{'color': 'blue'}}>FAKE LIKE 랜덤채팅</h1>
        <h2>내 아이디 <br></br>{myId}</h2>

        <div style={{'fontSize' : '13px'}}>광장대화</div>
        <div style={{'width':'100%' , 'border' : '1px solid black' , 'minHeight' : '200px'}}>
            {
                chatList.map((element , index)=>{
                    return(
                        <div key={index}> {element} </div>
                    )
                })
            }
        </div>


        <label ><input type="text" onChange={(e)=>{setChatMsg(e.target.value)}} placeholder='챗내용' style={{'outline':'none' ,'borderTop': 'solid 1px #D3D3D3' , 'borderLeft': 'solid 1px #D3D3D3', 
        'borderRight': '0px' ,'borderBottom': '0px', 'background':' #F8F8F8' ,'width':'95%','fontSize': '12pt' , 'height': '32px' , 
        'lineHeight':'18px'}}></input></label> 
        <button onClick={chatSend} style={{'height':'37px', 'fontSize' : '12pt'}}>전송</button>

        <div style={{'border':'1px solid black'}}>
            <h1 style={{'color' : 'red'}}>광장 유저목록</h1> 
            {
                userList.map((element , index)=>{
                    return(
                        <div key={index}>{element}</div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default Socketpage