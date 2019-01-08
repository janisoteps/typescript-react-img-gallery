const faker = require('faker');

module.exports = () => {
    const products = [...new Array(15)]
        .map(() => Math.round(Math.random() * 1000))
        .map(id => {
            return {
                id: id,
                itemGroupId: faker.lorem.slug(),
                title: faker.commerce.productName(),
                description: faker.lorem.sentence(),
                imageLink: faker.image.imageUrl()
            }
        });
    return {products: products}
};
