import {useState, createContext} from 'react';
import io from 'socket.io-client';

const UserContext = createContext();

const UserProvider = ({children}) => {
 const socket = io("http://localhost:8000",{
         transports: ['websocket'],
        });
    const [user, setUser] = useState({
        id: 0,
        screenName: "",
        email: "",
        room: "" 
    })

    return (
        <UserContext.Provider value={{user, setUser, socket}}>
            {children}
        </UserContext.Provider>
    )
}

export  {UserProvider, UserContext}
