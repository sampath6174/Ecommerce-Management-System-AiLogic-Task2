import Product from "../Models/productModel";

const resolvers = {
    Query: {
        products: async () => {
            const products = await Product.findAll();

            return products;
        }
    }
};

export default resolvers;