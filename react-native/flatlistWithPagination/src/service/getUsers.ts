import axios from "axios"

export const getUsers = async (page: number) => {
    try {
        let response = await axios.get(`https://randomuser.me/api/?page=${page}&results=3&seed=abc`)
        console.log(page)
        return response.data.results
    } catch (error) {

    }
}

