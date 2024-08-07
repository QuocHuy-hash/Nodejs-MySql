const { Order, OrdersDetails, Products } = require('../../models');

const findAllOrder = async ({
    limit = 20, page = 1, model, where
}) => {
    const skip = (page - 1) * limit;
    const response = await model.findAll(
        {
            ...where,
            skip: skip,
            limit: limit,
            include: [{ 
                model: OrdersDetails, 
                as: "orderDetails",
                // include: [{ model: Products, as: "product", attributes: ['product_name'] }]
            }],
            nest: true,
            raw: true,

        });
    return response;
}
const findOneOrder = async ({ model, where }) => {
    return await model.findAll({
        ...where,
            include: [{ model: Products, as: "products", attributes: ['product_name'] 
        }],
        nest: true,
        raw: true,
    });
   
}
module.exports = {
    findAllOrder,
    findOneOrder
}
