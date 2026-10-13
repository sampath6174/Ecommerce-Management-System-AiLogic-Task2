import gql from "graphql-tag";

const typeDefs = gql`
    type Product {
        id: Int
        name: String
        description: String
        price: Float
        stock: Int
    }

    type Query {
        products: [Product]
    }
`;

export default typeDefs;