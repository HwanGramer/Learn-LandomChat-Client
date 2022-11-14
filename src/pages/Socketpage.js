import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Socketpage({socket}) {
    const navi = useNavigate();
    const [userList , setUserList] = useState([]);
    const [myId , setMyId] = useState('');
    const [chatMsg , setChatMsg] = useState('');
    const [chatList , setChatList] = useState([]);
    const [callerId , setCallerId] = useState([]);

    useEffect(()=>{
        socket.emit('GETmySocketId' , function(socketId){ //? 나의 소켓아이디 가져옴
            setMyId(socketId);
            socket.on('GETchat' , function(chatInfo){
                if(chatInfo.id === socketId){
                    chatInfo.id = '나';
                }
                setChatList(chatList => [...chatList ,`${chatInfo.id}님 : ${chatInfo.msg}`]); //? useState배열 이렇게 바꿔야되넹...
            })
        })

        socket.on('GETuserList' , function(userList){ //? 유저목록을 실시간으로 보내줌.
            setUserList(userList);
        })

        socket.on('chatCall' , function(callId){
            setCallerId(callerId => [...callerId,callId]);
        })
    },[])

    const chatSend = ()=>{
        socket.emit('POSTchat' , ({target : 'DefaultRoom' , msg : chatMsg})); //? 광장전체에 메세지 보냄
    }

    const individualChat = (id)=>{
        //? 개인챗으로 넘어가면 기본방에서 나가져야됨.
        socket.emit('POSTleave' , 'DefaultRoom' , ()=>{
            navi('/individualChat/'+id); //? 나가졌다면 개인톡페이지로 넘어감.
            socket.emit('POSTcall' , id)
        })
    }

    const callMsg = (callId)=>{
        socket.emit('POSTuserCheck' ,callId , (noFindId)=>{ //? 메세지를 받을때 그 유저가 접속중인가 확인하기.
            if(!noFindId){
                alert('상대가 접속을 해제하였습니다.');
                setCallerId(callerId => callerId.filter((e)=> e!==callId)) //? 신청건 사람이 접속해재하면 아이콘 하나 사라짐.
            }else{
                console.log(callId);
            }
        })
    }

  return (
    <div>
        <h1 style={{'color': 'blue'}}>FAKE LIKE 랜덤채팅</h1>
        <h2>내 아이디 <br></br>{myId}</h2>
        
        <div style={{'width' : '100%' , 'border':'1px solid black' , 'display':'flex' ,'flexDirection':'row','flexWrap':'wrap'}}>
        {
            callerId.map((element , index)=>{
                return(
                    <div key={index} onClick={()=>{callMsg(element)}} style={{'textAlign':'center','width':'40px','height':'40px',
                    'border':'1px solid pink','borderRadius':'50%','background':'red',color:'white'
                    ,fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center'}}>NM</div>
                )
            })
        }
        </div>
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
                    if(element === socket.id) return //? 자신 아이디는 출력안됨.
                    return(
                        <div onClick={()=>{individualChat(element)}} className='userList' key={index}>{element}    
                            <span style={{'color':'red' , 'float' : 'right' ,}}>채팅하기</span> {/* 개인챗 버튼 */}
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default Socketpage
