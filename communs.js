class communsUtils{
    static busResponds(data){
        return{
            status:"success",
            payload: data.docs,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: !data.hasPrevPage ? null : `http://localhost:8080/mongo/get?limit=${data.limit}&page=${data.prevPage}`,
            nextLink: !data.hasNextPage ? null : `http://localhost:8080/mongo/get?limit=${data.limit}&page=${data.nextPage}`,


        }
    }
}

export default communsUtils