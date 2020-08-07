const express = require("express");
const app = express();
app.use(express.json());

const products = [
    {
        id: "1",
        productName: "Milk",
        check: "no",
    },
    {
        id: "2",
        productName: "Bread",
        check: "no",
    },
    {
        id: "3",
        productName: "Cheese",
        check: "no",
    },
    {
        id: "4",
        productName: "Water",
        check: "yes",
    },
    {
        id: "5",
        productName: "Oil",
        check: "no",
    },
];

app.get("/products", (req, res) => {
    res.send(products);
});

app.get("/products/:Id", (req, res) =>
    products.forEach((item) => {
        if (item.id === req.params.Id) {
            res.send(item);
        }
    })
);

app.post("/products", (req, res) => {
    products.push(req.body);
    res.send(req.body);
});

app.put("/products/:Id", (req, res) => {
    products.forEach((item) => {
        if (item.id === req.params.Id) {
            products.splice(products.indexOf(item), 1, req.body);
            res.send(products);
        }
    });
});

app.delete("/products/:Id", (req, res) => {
    products.forEach((item) => {
        if (item.id === req.params.Id) {
            products.splice(products.indexOf(item), 1);
            res.send(products);
        }
    });
});

app.listen(3000);
