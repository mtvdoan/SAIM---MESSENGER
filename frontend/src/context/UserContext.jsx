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
    // const [socket] = useState(() => io.connect("http://localhost:8000")); //new
    // const [socket] = useState(() => io(process.env.PORT || 8000))
    // const [socket] = useState(() => io("http://localhost:8000")) // new
    return (
        <UserContext.Provider value={{user, setUser, socket}}>
            {children}
        </UserContext.Provider>
    )
}

export  {UserProvider, UserContext}
