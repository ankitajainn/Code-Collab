import React from 'react'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


function Home() {

    const [roomId,setRoomId]=useState('');
    const [username,setUsername]=useState('');

    const navigate=useNavigate();


    const createNewRoom=(e)=>{
        e.preventDefault();
        const id =uuidv4();
        console.log(id);
        setRoomId(id);
        toast.success('Created a new room');


    }

    const joinroom=()=>{
        if(!roomId || !username){
            toast.error('Room ID and username is required');
            return;
        }
        //redirect
        navigate(`/editor/${roomId}`,{
            state:{
                username,
            }
        })
    }


        const handleInputEnter=(e)=>{
            // console.log('event',e.code);
            if(e.code==='Enter'){
                joinroom();

            }

        }



  return (
    <>
    <div className="homePageWrapper">
      <div className="formWrapper">
        <h1 className ="mainLabel">Paste invitation room id</h1>
        <div className="inputGroup">
            <input
                type="text"
                className="inputBox"
                placeholder="Room ID"
                onChange={(e)=>setRoomId(e.target.value)}
                value={roomId}
                onKeyUp={handleInputEnter}
            />
            <input
                type="text"
                className="inputBox"
                placeholder="Username"
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
                onKeyUp={handleInputEnter}
            />
            <button className ="btn joinBtn" onClick={joinroom}>Join</button>
            <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a onClick={createNewRoom}href=""  className ="createNewBtn">
                    New Room
                </a>
            </span>
        </div>
        <footer>
            <h4>Built by {" "}
                <a href="https://github.com/ankitajainn">Ankita</a>
            </h4>
        </footer>

      </div>
    </div>
    </>
  )
}

export default Home
