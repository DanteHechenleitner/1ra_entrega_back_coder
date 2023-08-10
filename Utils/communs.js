class communsUtils{
    static busResponds(data){
        let paramSort= ""
        if(data.sort){
            paramSort= `&sort=${data.sort}`

        }
        return{
            status:"success",
            payload: JSON.parse(JSON.stringify(data.docs)),
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: !data.hasPrevPage ? null : `http://localhost:8080/apiP/get?limit=${data.limit}&page=${data.prevPage}${paramSort}`,
            nextLink: !data.hasNextPage ? null : `http://localhost:8080/apiP/get?limit=${data.limit}&page=${data.nextPage}${paramSort}`,

            
        }
       
    }
}

export default communsUtils