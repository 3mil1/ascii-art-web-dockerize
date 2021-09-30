import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:8080/`,
})

export const ascii = (input, banner) => {
    return instance.post(`post`, {input, banner})
}

