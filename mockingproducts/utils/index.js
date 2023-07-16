import { faker } from '@faker-js/faker'

export const generateProduct = () => ({
    code: faker.string.alphanumeric(),
    title: faker.commerce.productName(),
    image: faker.image.url(),
    stock: parseInt(faker.string.numeric()),
    price: parseFloat(faker.commerce.price()),
    description: faker.lorem.paragraph(),
    id: faker.database.mongodbObjectId(),
    category: faker.commerce.department(),
})