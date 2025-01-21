import axios from "axios"

const API_LIST_RESTAURANTS = import.meta.env.VITE_API_RESTAURANT_LIST
const API_DETAIL_RESTAURANT = import.meta.env.VITE_API_RESTAURANT_DETAIL
const API_KEY = import.meta.env.VITE_API_KEY

export const getListRestaurants = async (param?: any): Promise<any> => {
    try {
        const url = `${API_LIST_RESTAURANTS + 'restaurants'}${param ? param : ''}`
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getListCategories = async (): Promise<any> => {
    try {
        const response = await axios.get(API_LIST_RESTAURANTS + 'categories')
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}

export const getDetailRestaurant = async (id: any): Promise<any> => {
    try {
        const url = API_DETAIL_RESTAURANT + 'restaurantsId=' + id
        const response = await axios.get(url, {
            headers: {
                'x-rapidapi-key': API_KEY
            }
        })
        return response
    } catch (error) {
        console.error(error)
        return error
    }
}