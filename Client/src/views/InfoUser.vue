<script>
import UserService from '../services/User.service';
import OrderService from '../services/Order.service';
import ProductService from '../services/Product.service';
export default {
    data() {
        return {
            dataUser: [

            ],
            id_user: '',
            dataOrderInput: {
                iduser: "",
                username: "",
                email: "",
                phonenumber: "",
                detail_cart: [],
                statusOrder: "",
                totalOrder: "",
                timeReturn: "",
            },
            BookDataInput: {
                img_url: [],
                title: "",
                publisher: "",
                description: "",
                price: "",
                quantityonhand: ""
            },
            totalAllOrder: '',
            dataOrder: '',
            id_order: ''
        }
    },
    methods: {
        async getDataUser() {
            this.dataUser = await UserService.getuserwithid(this.$route.params.id);
            this.id_user = this.$route.params.id;
        },
        async getDataOrder() {
            let dataValue = await OrderService.getDataOrderWithIDUser(this.$route.params.id);
            this.dataOrderInput.iduser = dataValue.iduser;
            this.dataOrderInput.username = dataValue.username;
            this.dataOrderInput.email = dataValue.email;
            this.dataOrderInput.phonenumber = dataValue.phonenumber;
            this.dataOrderInput.detail_cart = dataValue.detail_cart;
            this.dataOrderInput.totalOrder = dataValue.totalOrder;
            this.dataOrderInput.timeReturn = dataValue.timeReturn;

            this.dataOrder = dataValue;
            var total = 0
            dataValue.forEach((item, index) => {
                if(item.statusOrder !== 'Hủy đơn hàng'){
                    total += item.totalOrder;
                }
            })
            this.totalAllOrder = total
        },
        async cancelOrder(IDORDER) {
            let check = confirm('Bạn có chắc chắn muốn hủy đơn hàng ?');
            if (check) {
                try {
                    this.dataOrderInput.statusOrder = 'Hủy đơn hàng';
                    await OrderService.updateOrder(IDORDER, this.dataOrderInput);

                    let cartLocalStorage = await OrderService.getDataOrderWithIDOrder(IDORDER);
                
                    var arrayDataCart = cartLocalStorage[0].detail_cart;
                    console.log(arrayDataCart)
                    for (let i = 0; i < arrayDataCart.length; i++) {
                        let data = await ProductService.getproductwithID(arrayDataCart[i].id_product);
                        this.BookDataInput.img_url[0] = data.img_url[0];
                        this.BookDataInput.img_url[1] = data.img_url[1];
                        this.BookDataInput.img_url[2] = data.img_url[2];
                        this.BookDataInput.title = data.title;
                        this.BookDataInput.publisher = data.publisher;
                        this.BookDataInput.description = data.description;
                        this.BookDataInput.price = data.price;
                        this.BookDataInput.quantityonhand = data.quantityonhand + arrayDataCart[i].quantity_product;
                        console.log(this.BookDataInput)
                        await ProductService.update(arrayDataCart[i].id_product, this.BookDataInput);
                    }

                } catch (err) {
                    console.log(err)
                }

                this.getDataOrder();
                this.getDataUser();
            }
        }
    },
    created() {
        this.getDataUser();
        this.getDataOrder();
    }
}
</script>
<template>
<div class="container" id="container_height">
    <p style="font-weight:bold;opacity:0.6">TÀI KHOẢN CỦA BẠN</p>
    <hr>
    <h5>QUẢN LÍ SÁCH ĐÃ MƯỢN</h5>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Mã Đơn Hàng</th>
                <th scope="col">Ngày tạo đơn hàng</th>
                <th scope="col">Tổng tiền</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Hủy đơn hàng</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="dataOrder.length == 0" style="color:red;font-weight:bold;">Bạn chưa có đơn hàng nào !</tr>
            <tr v-for="(item, index) in dataOrder.slice().reverse()">
                <td>{{ ++index }}</td>
                <td style="font-weight:bold;">
                    <router-link :to="{
                            name: 'DetailOrder',
                            params: { id: item._id }
                        }">
                        <p style="color:red;">{{ item._id }}</p>
                    </router-link>
                </td>
                <td>
                    <p>{{item.timecreateOrder}}</p>
                </td>
                <td>{{ item.totalOrder.toLocaleString() }} đ</td>
                <td style="color:red;font-weight:bold;" v-if="item.statusOrder == 'Hủy đơn hàng'">{{ item.statusOrder }}</td>
                <td v-else style="color:#000000;font-weight:bold;">{{ item.statusOrder}}</td>
                <td>
                    <p>{{item.timeReturn}}</p>
                </td>
                <td style="color:black;font-weight:bold;cursor:pointer;" v-if="item.statusOrder === 'Chưa xử lý'">
                    <div @click="cancelOrder(item._id)" style="text-align: center;
                                background-color: papayawhip;
                                border-radius: 5px;
                                padding: 5px;
                                color: red;">
                        <i class="fa-solid fa-ban"></i>&nbsp;<i class="fa-solid fa-box-open"></i>
                    </div>

                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td  colspan="4" style="font-weight:bold;color:blue">Tổng tất cả đơn hàng: {{ totalAllOrder.toLocaleString() }} đ</td>
                <td></td>
            </tr>
        </tbody>
    </table>
    <hr>
    <h5>THÔNG TIN CÁ NHÂN
        <router-link :to="{
                name: 'editInfoUser',
                params: { id: id_user },
            }">
            <button type="button" class="btn btn-danger"><i class="fa-solid fa-user-pen"></i> Chỉnh sửa </button>
        </router-link>

        &nbsp;&nbsp;
        <router-link :to="{
                name: 'ChangePassword',
                params: { id: id_user },
            }">
            <button type="button" class="btn btn-info text-white"><i class="fa-solid fa-key"></i> Đổi mật khẩu </button>
        </router-link>

    </h5>
    <p>Tên người dùng: {{ dataUser.username }}</p>
    <p>Email: {{ dataUser.email }}</p>
    <p>Số điện thoại: {{ dataUser.phonenumber }}</p>
    <p>Địa chỉ: Việt Nam</p>
</div>
</template>

<style>
#container_height {
    margin-left: 170px;
    margin-top: 50px;
}
</style>
