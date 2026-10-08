import express from "express";

const app = express();

const cities = [
    { id: 1, name: "Hyderabad" },
    { id: 2, name: "Mumbai" },
    { id: 3, name: "Bangalore" }
];

app.get("/api/cities/:id", (req, res) => {
    const cityId = Number(req.params.id);

    const city = cities.find((city) => city.id === cityId);

    if (!city) {
        return res.status(404).json({
            message: "City not found"
        });
    }

    return res.json(city);
});

app.listen(6000, () => {
    console.log("Custom Service is running on 6000");
});