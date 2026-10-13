import express from "express";
import userRoutes from "./Routes/userRoutes";
import productRoutes from "./Routes/productRoutes";
import orderRoutes from "./Routes/orderRoutes";
import dashboardRoutes from "./Routes/dashboardRoutes";
import { swaggerSpec, swaggerUi } from "./Config/swagger";
import errorMiddleware from "./Middlewares/errorMiddleware";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import typeDefs from "./GraphQL/schema";
import resolvers from "./GraphQL/resolver";

const app = express();

app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

export async function startApolloServer() {
    await apolloServer.start();

    app.use(
        "/graphql",
        expressMiddleware(apolloServer)
    );
}

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(errorMiddleware);

export default app;