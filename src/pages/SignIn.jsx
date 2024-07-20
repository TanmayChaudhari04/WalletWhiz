import React from 'react'
import Header from '../components/Header';
import { useState } from 'react';
import Inputs from '../components/Inputs';
import Buttons from '../components/Buttons'
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function signInUsingEmail()
  {
    setLoading(true);
    if(email != "" && password != "")
    {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Signed In!");
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage)
      });
    }
    else{
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  const createDoc = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  function googleAuth(){

    setLoading(true);

    try{
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createDoc(user);
        setLoading(false);
        toast.success("User authenticated!");
        navigate("/dashboard");
      }).catch((error) => {
        // Handle Errors here.
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
    catch(e){
      setLoading(false);
      toast.error(e.message);
    }
  }

  return (
    <div>
      <Header></Header>
      <div className='flex justify-center items-center w-screen h-32 mt-52'>
        <div className='w-96 max-w-screen-sm h-auto shadow-xl rounded-2xl px-8'>
          <h2 className='font-medium text-lg text-center mt-1 mb-4'>Sign In on <span className='text-blue-500'>Wallet Whiz</span></h2> 
          <form>
            <Inputs type='email' label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"}>
            </Inputs>
            <Inputs type='password' label={"Password"} state={password} setState={setPassword} placeholder={""}>
            </Inputs>
            <Buttons disabled={loading} text={loading ? "Loading..." : "Sign In using Email and Password"} onClick={signInUsingEmail}></Buttons>
            <p className='text-center m-0'>or</p>
            <Buttons onClick={googleAuth} text={loading ? "Loading..." : "Sign In using Google"} blue={true}></Buttons>
            <p className='mb-4 mt-2 font-light'><a href='/signup'>Or Don't Have An Account? Click Here</a></p>
          </form>
        </div>
        </div>
    </div>
  )
}

export default SignIn