import { useState } from 'react';
import {app} from '../credenciales';

import { getAuth,onAuthStateChanged } from 'firebase/auth';

const auth=getAuth(app);

export default function homePage() {

    const [user,setUser]= useState(null);
    onAuthStateChanged(auth, (userConnected)=> {
        console.Log(userConnected)
        if(userConnected){
            setUser(userConnected);

        }else{
            setUser(null);
        }
        
    })
  return (
    <div>
        {user ? <h1> Usuario connected</h1>: <h1>No hay usuario</h1>}

    </div>
  )
}
