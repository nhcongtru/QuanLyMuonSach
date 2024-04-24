<script>
import ProductService from '../services/Product.service';
import StoreService from '../services/Store.service';
import PublisherService from '../services/Publisher.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';

export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageBooks: [],
            ManagePublisher: [],
            BookDataInput: {
                img_url: [],
                title: "",
                publisher: "",
                description: "",
                price: "",
            },
            StoreData: [],
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            id_book: '',
            data_edit: '',
            inputSearch: "",
        }
    },
    methods: {
        toast,
        async changeOptionTG() {
            this.BookDataInput.publisher = document.querySelector("#chooseTG").value;
        },
        async getBookData() {
            try {
                this.ManageBooks = await ProductService.getAllProduct();
                this.ManagePublisher = await PublisherService.getAllPublisher();
            } catch (error) {
                console.log(error)
            }
        },
        async getStoreData() {
            try {
                this.StoreData = await StoreService.getAllStore();
                console.log(this.StoreData)

            } catch (err) {
                console.log(err)
            }
        },
        addBook() {
            document.querySelector("#table_manageBook").style.display = 'none'
            document.querySelector("#form_addBook").style.display = 'block'
            document.querySelector("#btn_addBook").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        backPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        async handleAddBook() {
            try {
                await ProductService.create(this.BookDataInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Thêm sách mới thành công !"
                this.toasts.type = "success",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 2000)
            }
            catch (err) {
                console.log(this.BookDataInput)
                this.toasts.title = "Failed",
                    this.toasts.msg = "Thêm sách thất bại!"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async deleteBook(Id_Book) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await ProductService.delete(Id_Book);
                    this.toasts.title = "Success",
                        this.toasts.msg = "Xóa sách thành công !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                        window.location.reload();
                    }, 2000)
                } catch (err) {
                    console.log(this.BookDataInput)
                    this.toasts.title = "Failed",
                        this.toasts.msg = "Xóa sách thất bại!"
                    this.toasts.type = "error",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast()
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 700)
                }
            } else {
                return
            }
        },
        async FindBook(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageBooks = await ProductService.getAllProduct();
            } else {
                try {
                    this.ManageBooks = await ProductService.findproductwithName(inputKeyWord);
                    if (this.ManageBooks.length == 0) {
                        alert('Không có sách tương ứng với khóa tìm kiếm !');
                        this.ManageBooks = await ProductService.getAllProduct();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getBookData();
        this.getStoreData();
    },

}
</script>
<template>

    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên sách hoặc mô tả..."
            aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0"
            @click="FindBook(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm sách -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addBook" style="display:none;width:100%;">

        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở
            về</button>

        <br>
        <h2 class="text-center" style="color:#000000">Thêm vào sách mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Sách: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Vui lòng nhập vào tên sách..." v-model="BookDataInput.title" required>
        </div>

        <!-- Img Input -->
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label fw-bold">Hình Ảnh Sách:(3 ảnh)</label>
            <input type="text" class="form-control" id="exampleInputPassword1"
                placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[0]" required>
            <input type="text" class="form-control" id="exampleInputPassword1"
                placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[1]" required>
            <input type="text" class="form-control" id="exampleInputPassword1"
                placeholder="Đưa vào Link hình ảnh sách..." v-model="BookDataInput.img_url[2]" required>
        </div>

        <!-- Publisher Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Nhà xuất bản: </label>
            <select class="form-control" :required="true" @change="changeOptionTG" id="chooseTG">
                <option v-for="item in ManagePublisher" v-bind:value="item.publisher_name">{{ item.publisher_name }}
                </option>
            </select>
        </div>


        <!-- Price Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Giá bán: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Nhập vào giá cuốn sách..." v-model="BookDataInput.price" required>
        </div>


        <!-- Description Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Mô tả: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Nhập vào mô tả sách..." v-model="BookDataInput.description" required>
        </div>


        <button @click="handleAddBook()" type="submit" class="btn btn-light fw-bold"
            style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageBook">
        <thead>
            <tr class="table-info text-center">
                <th scope="col" >STT</th>
                <th scope="col" >Tên Sách</th>
                <th scope="col" > Hình Ảnh</th>
                <th scope="col" >Giá</th>
                <th scope="col" >Số lượng sách trong kho</th>
                <th scope="col" >Số lượt đã mượn</th>
                <th scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageBooks">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.title }}</td>
                <td class="d-flex flex-column" id="img_book">
                    <img :src="item.img_url[0]" class="img-fluid" alt="..."
                        style="width:150px;height:150px;border:1px solid #ccc;border-radius:5px;">
                    <br>
                    <img :src="item.img_url[1]" class="img-fluid" alt="..."
                        style="width:70px;height:70px;border:1px solid #ccc;border-radius:5px;">
                    <br>
                    <img :src="item.img_url[2]" class="img-fluid" alt="..."
                        style="width:70px;height:70px;border:1px solid #ccc;border-radius:5px;">
                </td>
                <td>{{ item.price.toLocaleString() }} đ</td>
                <td style="color: blue;">{{ item.quantityonhand }}</td>
                <td style="color: green;font-weight:bold">
                    <p v-for="item2 in StoreData">
                        <span v-if="item2.id_product === item._id">
                            {{ item2.sellquantity }}
                        </span>
                    </p>
                </td>
                <td>
                    <router-link :to="{
                        name: 'EditStore',
                        params: { id: item._id },
                    }">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i>
                            Sửa</button>
                    </router-link>

                    <br>
                    <br>

                    <button @click="deleteBook(item._id)" type="button" class="btn btn-danger"> <i
                            class="fa-solid fa-trash"></i> Xóa</button>
                </td>

            </tr>
        </tbody>
    </table>
</template>