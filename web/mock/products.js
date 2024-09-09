let products = [
    { id: '1', name: 'Umi' },
    { id: '2', name: 'Ant Design' },
    { id: '3', name: 'Ant Design Pro' },
    { id: '4', name: 'Dva' },
];

export default {
    'GET /api/products': (req, res) => {
        res.send({
            status: 'ok',
            data: products,
        });
    },
    'DELETE /api/products/:id': (req, res) => {
        products = products.filter((item) => item.id !== req.params.id);
        res.send({ status: 'ok' });
    }
};