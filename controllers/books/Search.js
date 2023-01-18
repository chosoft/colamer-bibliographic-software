//This lives the bussines logic to search any number of users
//This is the function of the model that allows the app to retrieve a list of users
//this function use the filters that the user set in the frontend
//and query the user by a certain mode
const {SearchBooks} = require('../../models/books')
//This function transform the object send by the user
//and structure this into a object that the model can read
const createSearchJSONObject = (params) => {
    return new Promise(async(resolve,reject) => {
        try {
            //First we take the fields sending by the user
            const { mode,query,filters } = params
            //Set the filter in wich the user search by a keyboard input
            let searchJSONObject = `{"${mode}":""}`
            searchJSONObject = JSON.parse(searchJSONObject)
            searchJSONObject[mode] = new RegExp(query)
            for (const filter in filters) {
                searchJSONObject[filter] = filters[filter]
            }
            resolve(searchJSONObject)
        } catch (error) {
            reject(error)
        }
    })
}

const Search = (searchParams) => {
    return new Promise(async(resolve,reject) => {
        try {
            const searchObject = await createSearchJSONObject(searchParams)
            const searchConfigObj = {filter:searchObject,config:{skipSteps:searchParams.skipSteps}}
            const { filter,config } = searchConfigObj
            const modelFoundBooks = await SearchBooks(filter,config)
            resolve(modelFoundBooks)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = Search