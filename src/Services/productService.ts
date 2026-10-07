// BUSINESS LOGICS
import Product from "../Models/productModel";
import redisClient from "../Config/redis";

class ProductService {

    // creating a product by admin&user but not customer
    async createProduct(
        name: string,
        description: string,
        price: number,
        stock: number
    ) {
        const product = await Product.create({
            name,
            description,
            price,
            stock
        });

        return product;
    }
    // getting all products info
    async getAllProducts() {
        return await Product.findAll({
            order: [["id", "ASC"]]
        });
    }
    // get product by their id
    async getProductById(productId: number) {

    const cacheKey = `product:${productId}`;

    const cachedProduct = await redisClient.get(cacheKey);

    if (cachedProduct) {
        console.log("Product found in Redis");
        return JSON.parse(cachedProduct);
    }

    console.log("Product not found in Redis");

    const product = await Product.findByPk(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const productData = product.toJSON();

    await redisClient.setEx(
        cacheKey,
        60,
        JSON.stringify(productData)
    );

    console.log("Product stored in Redis");

    return productData;
}

    // updating product info only admin&user
    async updateProduct(
        productId: number,
        name: string,
        description: string,
        price: number,
        stock: number
    ) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        await product.update({
            name,
            description,
            price,
            stock
        });
        await redisClient.del(`product:${productId}`);

        return product;
    }

    // deleting a product
    async deleteProduct(productId: number) {
        const product = await Product.findByPk(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        await product.destroy();
        await redisClient.del(`product:${productId}`);

        return {
            message: "Product deleted successfully"
        };
    }
}

export default ProductService;