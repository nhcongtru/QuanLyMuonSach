<script>
import UserService from '../services/User.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageUser: [],
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
        async getuserData() {
            try {
                this.ManageUser = await UserService.getAllUser();
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
        async deleteUser(Id_User) {
            let check_delete = confirm("Chắc chắn muốn xóa chứ ?");
            if (check_delete) {
                try {
                    await UserService.delete(Id_User);
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
        async FindUser(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageUser = await UserService.getAllUser();
            } else {
                try {
                    this.ManageUser = await UserService.finduserwithName(inputKeyWord);
                    if (this.ManageUser.length == 0) {
                        alert('Không có tài khoản ứng với khóa tìm kiếm !');
                        this.ManageUser = await UserService.getAllUser();
                    }
                } catch (err) {
                    console.log(err)
                }
            }

        }
    },
    mounted() {
        this.getuserData();
    },

}
</script>
<template>

    <form action="/" class="d-flex" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào tên người dùng..."
            aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0"
            @click="FindUser(inputSearch)">Tìm Kiếm</button>
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
                placeholder="Vui lòng nhập vào tên tác giả..." v-model="PublisherInput.publisher_name" required>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Địa chỉ: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Vui lòng nhập vào tên tác giả..." v-model="PublisherInput.address" required>
        </div>

        <button @click="handleAddPublisher()" type="submit" class="btn btn-light fw-bold"
            style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageAuthor">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Tên Người Dùng</th>
                <th scope="col">Email</th>
                <th scope="col">Hành Động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageUser">
                <td>
                    {{ index + 1 }}
                </td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>
                    <br>
                    <br>

                    <button @click="deleteUser(item._id)" type="button" class="btn btn-danger"> <i
                            class="fa-solid fa-trash"></i> Xóa</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>