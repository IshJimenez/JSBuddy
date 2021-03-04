import React, {useState, useEffect} from 'react';

import actions from '../api'


function Strings(props) {
   const[strings, setStrings] = useState([])
   
    useEffect(() => {
        // axios.get(`http://localhost:5000/api/getStrings`)
        actions.getAllPosts().then((Strings) => {
            console.log(Strings)
            setStrings(Strings.data)
        }).catch(console.error)
    }, [])


    
    
        return (
        <>
            <h1> Strings</h1>
            {/* <p>{strings?.[6]?.post}</p> */}
            <ul>{strings.map(post => {
                return  (
                    <li key={post._id}>{post.post}</li>
                )
            })} </ul>

        </>
    );
}

export default Strings;