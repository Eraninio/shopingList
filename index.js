const express = require('express');
const app = express();

app.use(express.json());

const products = [
    {id: "1", productName: "milk"},
    {id: "2", productName: "bread"},
    {id: "3", productName:"cheese"},
    {id: "4", productName: "water"},
    {id: "5", productName: "oil"}
];

app.get("/products", (req, res) => {
    res.send(myList);
});

















app.listen(3000);
