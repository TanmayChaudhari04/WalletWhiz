import React from 'react'
import { useState } from 'react';
import Header from '../components/Header';
import Inputs from '../components/Inputs';
import Buttons from '../components/Buttons'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc, doc, getDoc } from 'firebase/firestore';

function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function signUpWithEmail() {
    setLoading(true);
    //Authenticate User or create new Account
    if (name != "" && email != "" && password != "" && confirmPassword != "")
    {
      if (password == confirmPassword)
      {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          toast.success("User Created!");
          setLoading(false);
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          createDoc(user)
          navigate("/dashboard")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
      }
      else{
        toast.error("Password and Confirm Password do not match!");
        setLoading(false);
      }
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
        setLoading(false);
        createDoc(user);
        toast.success("User authenticated!");
        navigate("/dashboard");
      }).catch((error) => {
        setLoading(false);
        // Handle Errors here.
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
      <div className='flex justify-center items-center w-screen h-32 mt-60'>
        <div className='w-96 max-w-screen-sm h-auto shadow-xl rounded-2xl px-8'>
        <h2 className='font-medium text-lg text-center mt-1 mb-8'>Sign Up on <span className='text-blue-500'>Wallet Whiz</span></h2> 
        <form>
            <Inputs label={"Full Name"} state={name} setState={setName} placeholder={"John Doe"}>
            </Inputs>
            <Inputs type='email' label={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe@gmail.com"}>
            </Inputs>
            <Inputs type='password' label={"Password"} state={password} setState={setPassword} placeholder={""}>
            </Inputs>
            <Inputs type='password' label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={""}>
            </Inputs>
            <Buttons disabled={loading} text={loading ? "Loading..." : "Sign Up using Email and Password"} onClick={signUpWithEmail}></Buttons>
            <p className='text-center m-0'>or</p>
            <Buttons onClick={googleAuth} text={loading ? "Loading..." : "Sign Up using Google"} blue={true}></Buttons>
            <p className='mb-4 mt-2 font-light'><a href='/signin'>Or Already Have An Account? Click here</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default SignUp