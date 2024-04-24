<script>
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';
import OrderService from '../services/Order.service'


export default {
    components: {
        ToastVue
    },
    data() {
        return {
            ManageOrder: [],
            PublisherInput: {
                publisher_name: ""
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
        async getorderData() {
            try {
                this.ManageOrder = await OrderService.getAllOrder();
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
        async handleAddPublisher() {
            try {
                console.log(this.PublisherInput)
                await PublisherService.create(this.PublisherInput)
                alert('Thêm nxb thành công !')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    window.location.reload();
                }, 1000)
            }
            catch (err) {
                alert('Thêm nxb thất bại ! ')
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        async editOrder(Id_order) {
            this.$router.push(`/editorder/${Id_order}`)
        },
        async FindOrder(inputKeyWord) {
            if (inputKeyWord === '') {
                this.ManageOrder = await OrderService.getAllOrder();
            } else {
                try {
                    this.ManageOrder = await OrderService.findorderwithID(inputKeyWord);
                    if (this.ManageOrder.length == 0) {
                        alert('Không có đơn hàng tương ứng với khóa tìm kiếm !');
                        this.ManageOrder = await OrderService.getAllOrder();
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async filterOrder(statusOrderInput) {
            try {
                this.ManageOrder = await OrderService.getorderwithstatusorder(statusOrderInput);
            } catch (err) {
                console.log(err);
            }
        }
    },
    mounted() {
        this.getorderData();
    },

}
</script>
<template>
    <form action="/" class="d-flex mt-3" style="width:500px;margin:0 auto" id="inputSearchKeyWord" @submit.prevent>
        <input type="text" class="form-control" placeholder="Nhập vào số điện thoại khách hàng... "
            aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
            v-model="inputSearch">
        <button id="btn_search" type="submit" style="width:120px;height:50px;border-radius:0 6px 6px 0"
            @click="FindOrder(inputSearch)">Tìm Kiếm</button>
    </form>
    <br>
    <br>
    <!-- Giao diện thêm danh mục -->
    <ToastVue></ToastVue>
    <form @submit.prevent id="form_addAuthor" style="display:none;width:100%;">
        <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở
            về</button>

        <br>
        <h2 class="text-center" style="color:#000000">Thêm tài khoản mới</h2>
        <!-- Title Input -->
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label fw-bold">Tên Tác Giả: </label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Vui lòng nhập vào tên tác giả..." v-model="PublisherInput.publisher_name" required>
        </div>

        <button @click="handleAddPublisher()" type="submit" class="btn btn-light fw-bold"
            style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
    </form>


    <h2>Lọc theo trạng thái đơn hàng</h2>
    <button type="button" class="btn btn-secondary" @click="filterOrder('Chưa xử lý')">Chưa xử lý</button>
    &nbsp;
    <button type="button" class="btn btn-primary" @click="filterOrder('Được mượn')">Được mượn</button>
    &nbsp;
    <button type="button" class="btn btn-info text-white" @click="filterOrder('Đã nhận sách')">Đã nhận sách</button>
    &nbsp;
    <button type="button" class="btn btn-success" @click="filterOrder('Đã trả')">Đã trả</button>
    &nbsp;
    <button type="button" class="btn btn-danger" @click="filterOrder('Hủy')">Hủy</button>
    &nbsp;

    <br>
    <br>

    <!-- Giao diện bảng Show Sách -->
    <table class="table" border="1px" style="width:90vw;" id="table_manageAuthor">
        <thead>
            <tr class="table-info text-center">
                <th scope="col">STT</th>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Tên khách hàng</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Ngày đặt hàng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Quản lý trạng thái ĐH</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in ManageOrder">
                <td>
                    {{ index + 1 }}
                </td>
                <!-- <td>{{ item._id }}</td> -->
                <td style="font-weight:bold;">
                    <router-link :to="{
                            name: 'DetailOrderAdmin',
                            params: { id: item._id }
                        }">
                        <p style="color:red;">{{ item._id }}</p>
                    </router-link>
                </td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phonenumber }}</td>
                <td>
                    <p>{{ item.timecreateOrder }}</p>
                </td>
                <td>{{ item.totalOrder.toLocaleString() }} đ</td>
                <td>
                    <p>{{ item.timeReturn }}</p>
                </td>
                <td v-if="item.statusOrder === 'Chưa xử lý'" style="color:#6c757d;font-weight:bold">{{ item.statusOrder
                    }}</td>
                <td v-else-if="item.statusOrder === 'Được mượn'" style="color:#0d6efd;font-weight:bold">{{
                    item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Đã nhận sách'" style="color:#0dcaf0;font-weight:bold">{{
                    item.statusOrder }}</td>
                <td v-else-if="item.statusOrder === 'Đã trả'" style="color:#198754;font-weight:bold">{{ item.statusOrder
                    }}</td>
                <td v-else-if="item.statusOrder === 'Hủy'" style="color:#dc3545;font-weight:bold">{{ item.statusOrder }}
                </td>
                <td>
                    <button @click="editOrder(item._id)" type="button" class="btn btn-danger"> <i
                            class="fa-solid fa-file-pen"></i> Cập nhật</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>