const {ObjectId} = require("mongodb");

class BookService {
    constructor(client){
        this.Book = client.db().collection("Sach");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractBookData(payload) {
        const book = {
            name: payload.TenSach,
            price: payload.DonGia,
            quality: payload.SoQuyen,
            year: payload.NamXuatBan,
            MaNXB: payload.MaNXB,
            NguonGocOrTacGia: payload.NguonGocOrTacGia,
        };
        // Remove undefined fields
        Object.keys(book).forEach(
            (key) => book[key] === undefined && delete book[key]
        );
        return book;
    }

    // async create(payload) {
    //     const book = this.extractbookData(payload);
    //     const result = await this.book.findOneAndUpdate(
    //         book,
    //         { $set: { favorite: book.favorite === true } },
    //         { returnDocument: "after", upsert: true }
    //     );
    //     return result.value;
    // }
    
    async find(filter) {
        const cursor = await this.Book.find(filter);
        return await cursor.toArray();
    }
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }
    async findById(id) {
        return await this.Book.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    // async update(id, payload) {
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     };
    //     const update = this.extractbookData(payload);
    
    //     console.log('Filter:', filter);
    //     console.log('Update:', update);
    
    //     const result = await this.book.findOneAndUpdate(
    //         filter,
    //         { $set: update },
    //         { returnDocument: "after" }
    //     );
    
    //     console.log('Result:', result);
    
    //     return result.value;
    // }
    

    // async delete(id) {
    //     const result = await this.book.findOneAndDelete({
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     });
    //     return result.value;
    // }

    // async findFavorite() {
    //     return await this.find({ favorite: true });
    // }

    // async deleteAll() {
    //     const result = await this.book.deleteMany({});
    //     return result.deletedCount;
    // }
}

module.exports = BookService;