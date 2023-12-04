

const getProductsStatic = async (req, res) => {
    res.status(200).json({msg:'Products testing'})
}
const getProducts = async (req, res) => {
    res.status(200).json({msg:'Products'})
}

module.exports = {
    getProducts,
    getProductsStatic,
}
