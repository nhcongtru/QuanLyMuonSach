const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// exports.create = async(req, res, next) => {
    
//     if (!req.body?.name) {
//         return next(new ApiError(400, "Name can not be empty"));
//     }

//     try {
//         const BookService = new BookService(MongoDB.client);
//         const document = await BookService.create(req.body);
//         return res.send(document);
//     } catch (error) {
//         console.error("Error creating book:", error);
//         return next(
//             new ApiError(500, `An error occurred: ${error.message}`)
//         );
//     }
    
    
// };

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const bookService = new BookService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        }else {
            documents = await bookService.find({});
        }
    } catch (error) {
        console.error("Error creating book:", error);
        return next(
            new ApiError(500, `An error occurred: ${error.message}`)
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {   
    try {
        const bookService = new BookService(MongoDB.client);
        const document =  await bookService.findById(req.params.id);
        if (!document) {
            return next (new ApiError(404, "book not found"));
        }
        return res.send(document);
    } catch (error){
        return next(
            new ApiError(500, `Error retrieving book with id=${req.params.id}`)
        );
    }
};

// exports.update = async(req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next (new ApiError(400, "Data to update can not be empty"));
//     }

//     try {
//         const BookService = new BookService(MongoDB.client);
//         const document = await BookService.update(req.params.id, req.body);
//         if (!document) {
//             return next(new ApiError(404, "book not found"));
//         }
//         return res.send({message: "book was updated successfully!"});
//     } catch (error) {
//         return next(
//             new ApiError(500, `An error updating book with id=${req.params.id}`)
//         );
//     }
// };

// exports.delete = async (req, res, next) => {
//     try {
//         const BookService = new BookService(MongoDB.client);
//         const document = await BookService.delete(req.params.id);
//         if (!document) {
//             return next(new ApiError(404, "book not found"));
//         }

//         return res.send({message: "book was deleted successfully!"});
//     } catch (error) {
//         return next(
//             new ApiError(500, `Count not delete book with id=${req.params.id}`)
//         );
//     }
// };

// exports.deleteAll = async (req, res, next) => {
//     try {
//         const BookService = new BookService(MongoDB.client);
//         const document = await BookService.deleteAll();
//         return res.send({message: `${deleteCount} books were deleted successfully!`,});
//     } catch (error) {
//         console.error("Error creating book:", error);
//         return next(
//             new ApiError(500, `An error occurred: ${error.message}`)
//         );
//     }
// };

// exports.findAllFavorites = async(req, res, next) => {
//     try {
//         const BookService = new BookService(MongoDB.client);
//         const documents = await BookService.findAllFavorites();
//         return res.send(documents);
//     } catch (error) {
//         console.error("Error creating book:", error);
//         return next(
//             new ApiError(500, `An error occurred: ${error.message}`)
//         );
//     }
// };