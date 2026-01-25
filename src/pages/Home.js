import React from 'react'

function Home() {
  return (
    <div className="homePageWrapper">
      <div classNAme="formWrapper">
        <h1 classNAme ="mainLabel">Paste invitation room id</h1>
        <div className="inputGroup">
            <input
                type="text"
                className="inputBox"
                placeholder="Room ID"
            />
            <input
                type="text"
                className="inputBox"
                placeholder="Username"
            />
            <button className ="btn joinBtn">Join</button>
            <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a href=""  className ="createNewBtn">
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
  )
}

export default Home
