export const generatorProductError = (user) => {
    return `One or more of the following fields are invalid or incomplete.
    List of required fields:
      - tilte : ${product.title}
      - code : ${product.code}
      - price : ${product.price}
      - description : ${product.description}
      - category : ${product.category}
      `
}