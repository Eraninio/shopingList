const express = require('express');
const app = express();
app.use(express.json());

const products = [
    {
        id: "1", 
        productName: "Milk"
    },
    {
        id: "2", 
        productName: "Bread"
    },
    {
        id: "3", 
        productName:"Cheese"
    },
    {
        id: "4", 
        productName: "Water"
    },
    {
        id: "5", 
        productName: "Oil"
    }
];

app.get("/products", (req, res) => {
    res.send(products);
});

app.get("/products/:Id", (req, res) =>
    products.forEach((item => {
        if (item.id === req.params.Id){
            res.send(item);
        }
    })
));

app.post("/products", (req, res) => {
    products.push(req.body);
    res.send(req.body);
});

app.put("/products/:Id", (req, res) =>{
    products.forEach((item) => {
        if (item.id === req.params.Id) {
            products.splice(products.indexOf(item), 1, req.body)
            res.send(products);
        }
    });
});

app.delete("/products/:Id", (req, res) =>{
    products.forEach((item) => {
        if (item.id === req.params.Id) {
            products.splice(products.indexOf(item), 1)
            res.send(products);
        }
    });
});

app.listen(3000);
