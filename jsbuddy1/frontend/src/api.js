import axios from 'axios'


let resetHead = () => {
    return { 
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}

const actions = {

    getAllPosts : async() => {
        return await axios.get(`http://localhost:5000/api/getStrings`, resetHead())
    },

    addPosts: async(login) => {
        return await axios.post(`http://localhost:5000/api/login`, {login}, resetHead())
    },

    logIn : async(data) => {
        localStorage.setItem('googleTokenId', data.tokenId)
        let headerObj = resetHead()
        headerObj.headers['X-Google-Token'] = data.tokenId
        
        return await axios.post(`http://localhost:5000/api/logMeIn`, data, headerObj)

    }
}

export default actions