import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';


function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef()

  let [profilePic,setProfilePic] = useState("https://cdn-icons-png.flaticon.com/512/3135/3135715.png")


  let onSignupUsingJSON = async ()=>{
    let dataToSendJSO ={
      firstName : firstNameInputRef.current.value,
      lastName : lastNameInputRef.current.value,
      age : ageInputRef.current.value,
      email: emailInputRef.current.value,
      Password: passwordInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value
    }
    let dataToSendJSON = JSON.stringify(dataToSendJSO);
    console.log(dataToSendJSO);
    console.log(dataToSendJSON);
    
    let myHeaders = new Headers();
      myHeaders.append("content-type","application/json");
    
    let reqOptions = {
      method:"POST",
      body:dataToSendJSON,
      headers:myHeaders
    };

    let JSONData = await fetch("/signup",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData)
  }

  let onSignupUsingURLE =async()=>{
    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value)

    let myHeaders = new Headers();
    myHeaders.append("content-type","application/x-www-form-urlencoded")

    let reqOptions = {
      method:"POST",
      body:dataToSend,
      headers:myHeaders
    };

    let JSONData = await fetch("/signup",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
   
  }

   let onSignupUsingFD =async()=>{
    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value);
    dataToSend.append("lastName",lastNameInputRef.current.value);
    dataToSend.append("age",ageInputRef.current.value);
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);
    dataToSend.append("mobileNo",mobileNoInputRef.current.value);

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
   dataToSend.append("profilePic",profilePicInputRef.current.files[i])
    }
   
    let reqOptions = {
      method:"POST",
      body:dataToSend,
    };

    let JSONData = await fetch("/signup",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
    alert(JSOData.msg);
   
  }
  
  return (
    <div className="App">
      <h1>SignUp Form</h1>
      <form>
        <div>
          <label>First Name</label>
          <input type ="text" ref={firstNameInputRef}></input>
        </div>
          <div>
          <label>Last Name</label>
          <input type='text' ref={lastNameInputRef}></input>
        </div>
          <div>
          <label>Age</label>
          <input type='number' ref={ageInputRef}></input>
        </div>
          <div>
          <label>Email</label>
          <input type='email' ref={emailInputRef}></input>
        </div>
          <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
          <div>
          <label>Mobile no.</label>
          <input type='number' ref={mobileNoInputRef}></input>
        </div>
          <div>
          <label>Profile Pic</label>
          <input type='file' ref={profilePicInputRef} onChange={(eo)=>{
             let selectedPath = URL.createObjectURL(eo.target.files[0]);
             setProfilePic(selectedPath)
          }}></input>
        </div>
        <div>
          <img className='profilePic'  src={profilePic}alt=''></img>
        </div>
        <div>
          <button type='button' onClick={()=>{
            onSignupUsingFD();
          }}>Signup(FD)</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to={'/'}>Login</Link>
    </div>
  );
}

export default Signup;
