import React,{useState, useRef, useEffect} from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import {initSocket} from '../socket';
import ACTIONS from '../Actions';
import {useLocation, useNavigate, Navigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast';

const  EditorPage=()=> {


  const socketRef=useRef(null);//chng hone pe rerender na ho
  //kyuki useeffect pe agr cahnge hota h to rerender hota h
  const location = useLocation();
  // const {roomId}=useParams();//to grt from url
  // const reactNavigator=useNavigate();
  
  
  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();

            // socketRef.current.on('connect_error', (err) => handleErrors(err));
            // socketRef.current.on('connect_failed', (err) => handleErrors(err));

            // function handleErrors(e) {
            //     console.log('socket error', e);
            //     toast.error('Socket connection failed, try again later.');
            //     reactNavigator('/');
            // }

        // socketRef.current.emit(ACTIONS.JOIN,{
        // roomId, 
        // username: location.state?.username,
        // });

      //listening from join event
      // socketRef.current.on(ACTIONS.JOINED,
      //   ({clients,username,socketId})=>{
      //       if(username!==location.state?.username){
      //           toast.success('${username} joined has joined');
      //       }
      //       setClients(clients);


      // })



    };
    init();

  },[]);




  const [clients,setClients]=useState([
    {socketId:1,username:'Ankita'}
  ]);

  // if(!location.state){
  //   return <Navigate to="/" />;

  // }




  return (
    
      <div className='mainWrap'>
        <div className='aside'>
          <div className='asideInner'>
            <h3>Connected</h3>
            <div className ="clientsList">
              {clients.map((client)=>(
                <Client 
                  key={client.socketId}
                  username={client.username}

                />
              ))}

            </div>
          
          
          
          </div>
          <button className="btn copyBtn">Copy Room ID</button>
          <button className ="btn leaveBtn">Leave</button>
        </div>
        <div className='editorWrap'>
          {/* <Editor/> */}
          <Editor 
                socketRef={socketRef}
                roomId="someRoomId"
                onCodeChange={(code) => {
                    console.log(code);
                }}
          />
        </div>
      </div>
    
  ) 
}

export default EditorPage
