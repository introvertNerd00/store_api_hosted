const Product = require("../models/products")


const getProducts = async (req, res) => {
    const {name,company,featured,sort,select} = req.query
    const queryObject = {}
    if(name){  
        queryObject.name = {$regex:name,$options:'i'}
    }

   

    if(company){
        queryObject.company = company
    }  
    if(featured){
        queryObject.featured = featured

    }
    let apiData = Product.find(queryObject)

    if(sort){
        let sortList = sort.split(',').join(' ')
        apiData = apiData.sort(sortList)

    }

    if(select){
        let selectList = select.split(',').join(' ')
        apiData = apiData.select(selectList)

    }

    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 10
    let skip = (page-1)*limit
    apiData = apiData.skip(skip).limit(limit)

    const products = await apiData
    res.status(200).json({products})
}

const getProductsTesting = async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).json({products, nbHits:products.length})
}

module.exports = {getProducts, getProductsTesting}