<script>
import PublisherService from '../services/Publisher.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManagePublisher: [],
            PublisherInput: {
                publisher_name: "",
                address: ""
            },
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
        async getpublisherData() {
            try {
                this.ManagePublisher = await PublisherService.getAllPublisher();
            } catch (error) {
                console.log(error)
            }
        },
        addPublisher() {
            document.querySelector("#table_manageAuthor").style.display = 'none'
            document.querySelector("#form_addAuthor").style.display = 'block'
            document.querySelector("#btn_addAuthor").style.display = 'none'
            document.querySelector("#pills-tabContent").style.margin = '0 auto'
            document.querySelector("#pills-tabContent").style.width = '100%'
            document.querySelector("#pills-tabContent").style.padding = '40px'
        },
        backPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
        async handleAddPublisher() {
            try {
                console.log(this.PublisherInput)
                await PublisherService.create(this.PublisherInput)
                alert('Thêm Nhà xuất bản thành công !')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 1000)
            }
            catch (err) {
                alert('Thêm Nhà xuất bản thất bại ! ')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async deletePublisher(Id_Publisher) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await PublisherService.delete(Id_Publisher);
                    alert('Xóa thành công !');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                } catch (err) {
                    alert('Xóa thất bại!')
                }
            } else {
                return
            }
        },
        async FindPublisher(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManagePublisher = await PublisherService.getAllPublisher();
            } else {
                try {
                    this.ManagePublisher = await PublisherService.findpublisherwithName(inputKeyWord);
                    if (this.ManagePublisher.length == 0) {
                        alert('Không có Nhà xuất bản ứng với khóa tìm kiếm !');
                        this.ManagePublisher = await PublisherService.getAllPublisher();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getpublisherData();
    },

}
</script>
<template>
    <button type="button" id="btn_addAuthor" class="btn btn-success" @click="addPublisher()" style="background-color: #000000;"><i
            class="fa-solid fa-plus"></i> Thêm Nhà xuất bản </button>


    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên Nhà xuất bản..." aria-label="Recipient's username"
            aria-describedby="basic-addon2" style="border-radius:6px;" v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0"
            @click="FindPublisher(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm danh mục -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addAuthor" style="display:none;width:100%;">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở
            về</button>

        <br>
        <h2 class="text-center" style="color:#000000">Thêm Nhà xuất bản mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Nhà xuất bản: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Vui lòng nhập vào tên Nhà xuất bản..." v-model="PublisherInput.publisher_name" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Địa chỉ: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Vui lòng nhập vào tên Nhà xuất bản..." v-model="PublisherInput.address" required>
        </div>

        <button @click="handleAddPublisher()" type="submit" class="btn btn-light fw-bold"
            style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageAuthor">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Tên Nhà xuất bản</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Hành Động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManagePublisher">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.publisher_name }}</td>
                <td>{{ item.address }}</td>
                <td>
                    <router-link :to="{
                        name: 'EditPublisher',
                        params: { id: item._id },
                    }">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i>
                            Sửa</button>
                    </router-link>

                    <br>
                    <br>

                    <button @click="deletePublisher(item._id)" type="button" class="btn btn-danger"> <i
                            class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>