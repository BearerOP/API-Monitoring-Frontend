import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Message from '../Components/Message';
import Path from '../Services/Path';

const Home = () => {
    const navigate = useNavigate();
    const [loader,setLoader]=useState(false);
    const [userData,setUserData]=useState();
    const [loginUser,setLoginUser]=useState()
    useEffect(()=>{
        const fetchUserData= async()=>{
            console.log("working");
            // setLoader(true);
           try {
            const response = await Path.get("/userProfile")
            if (response) {
                setUserData(response.data)
                setLoader(false);
            }
            else{
                setLoader(true)
            }
           } catch (error) {
            navigate('/')
           }
        }
        fetchUserData();
    },[])
    return (
        <>
    {loader==true ? <Message message="Loading..." /> : 
    (
        <>
        <div>
            <h1>Home</h1>
            <Message userName={"userData.name"}/>
            </div>
            <button onClick={()=>{navigate('/')}}>pehla button</button>
            <button onClick={()=>{navigate('list')}}>doosra button</button>
            <button onClick={()=>{navigate('message')}}>message button</button>
            <div className="">
                <Outlet/>
        </div>
        </>
    )
    }
        </>
    );
}

export default Home;
