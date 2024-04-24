<script>
import OrderService from '../services/Order.service';
import ProductService from '../services/Product.service';
import ToastVue from '../components/Toast.vue';
import toast from '../assets/js/toasts';


import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        ToastVue,
        Form,
        Field,
        ErrorMessage,
    },
    beforeRouteEnter: (to) => {
        if ((to.name !== 'HomePage') && (localStorage.getItem("productCart") === null)) {
            alert("Hãy thêm sản phẩm vào giỏ hàng để thực hiện thanh toán !")
            return '/'
        }
    },
    data() {
        const OrderForm = yup.object().shape({
            username: yup
                .string()
                .required("Phải nhập vào tên đầy đủ !")
                .max(15, "Tối đa 15 kí tự")
                .min(12, "Ít nhất 12 kí tự"),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không đúng định dạng")
                .max(30, "Email tối đa 30 ký tự."),
            phonenumber: yup
                .number()
                .required("Số điện thoại không được bỏ trống")
                .typeError("Số điện thoại chưa đúng định dạng ! - Nhập đủ 10 kí tự")
                .min(10, "Số điện thoại phải có ít nhất 10 kí tự"),
            timeReturn: yup
                .string()
                .matches(
                    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
                    "Định dạng ngày không hợp lệ. Ví dụ: '01/05/2024'"
                )
                .required("Ngày trả không được bỏ trống.")
        });
        return {
            OrderForm,
            dataOrderInput: {
                iduser: "",
                username: "",
                email: "",
                phonenumber: "",
                detail_cart: [],
                statusOrder: "",
                totalOrder: "",
                timeReturn: ""
            },
            BookDataInput: {
                img_url: [],
                title: "",
                publisher: "",
                description: "",
                price: "",
                quantityonhand: ""
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            dataShowFromCart: [],
            id_user: '',
            totalCart: 0
        }
    },
    methods: {
        toast,
        async loadDataOnCart() {
            let cartLocalStorage = JSON.parse(localStorage.getItem('productCart'));
            this.dataShowFromCart = cartLocalStorage
            var totalCartSum = 0;
            cartLocalStorage.forEach((item, index) => {
                totalCartSum += item.quantity_product * item.price_product;
            })
            this.totalCart = totalCartSum + 0;
            this.dataOrderInput.totalOrder = totalCartSum + 0;
        },
        async loadDataUserInfo() {
            let UserLocalStorage = JSON.parse(localStorage.getItem('isloggin'));
            this.dataOrderInput.iduser = UserLocalStorage._id,
                this.dataOrderInput.username = UserLocalStorage.username;
            this.dataOrderInput.email = UserLocalStorage.email;
            this.dataOrderInput.phonenumber = UserLocalStorage.phonenumber;
            this.id_user = UserLocalStorage._id;
        },
        async handleOrder() {
            if (this.dataOrderInput.username == '' || this.dataOrderInput.email == '' || this.dataOrderInput.phonenumber == '' || this.dataOrderInput.timeReturn == '') {
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Chưa điền đầy đủ thông tin !"
                this.toasts.type = "success",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 1000)
            } else {
                let cartLocalStorage = JSON.parse(localStorage.getItem('productCart'));
                this.dataOrderInput.statusOrder = 'Chưa xử lý';

                for (let i = 0; i < cartLocalStorage.length; i++) {
                    this.dataOrderInput.detail_cart[i] = cartLocalStorage[i];
                }

                let dataReturn = await OrderService.create(this.dataOrderInput);

                for (let i = 0; i < cartLocalStorage.length; i++) {
                    let data = await ProductService.getproductwithID(cartLocalStorage[i].id_product);
                    this.BookDataInput.img_url[0] = data.img_url[0];
                    this.BookDataInput.img_url[1] = data.img_url[1];
                    this.BookDataInput.img_url[2] = data.img_url[2];
                    this.BookDataInput.title = data.title;
                    this.BookDataInput.publisher = data.publisher;
                    this.BookDataInput.description = data.description;
                    this.BookDataInput.price = data.price;
                    this.BookDataInput.quantityonhand = data.quantityonhand - cartLocalStorage[i].quantity_product;
                    await ProductService.update(cartLocalStorage[i].id_product, this.BookDataInput);
                }


                this.$router.push(`/order_complete/${dataReturn._id}`)
                console.log(dataReturn)
            }

        }
    },
    mounted() {
        this.loadDataOnCart();
        this.loadDataUserInfo();
    }
}
</script>

<template>
    <div class="container" style="margin-top:50px;">
        <ToastVue></ToastVue>
        <!-- <ToastVue></ToastVue> -->
        <!-- Giao diện trang thanh toán  -->
        <div class="row">
            <!-- Left_page -->
            <div class="col-lg-7">
                <h2>Thư Viện</h2>
                <!-- BreadCrumb -->
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb" style="align-items: center;">
                        <li class="breadcrumb-item">
                            <router-link to="/cartStore" style="color:#000000">Giỏ hàng </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page" style="color:red;font-weight:bold
                                    ">Thông tin mượn </li>
                        <li class="breadcrumb-item active" aria-current="page">Xác nhận thành công đơn hàng</li>
                    </ol>
                </nav>

                <p>Thông tin mượn sách</p>

                <Form :validation-schema="OrderForm" @submit.prevent id="form_addBook" style="width:100%;">
                    <!-- Username Input -->
                    <div class="mb-3">
                        <label for="inputUserName" class="form-label fw-bold">Họ và tên: </label>
                        <Field id="inputUserName" placeholder="Vui lòng nhập vào tên người dùng..." name="username"
                            type="text" class="form-control form-control-lg" v-model="dataOrderInput.username"
                            required />
                        <ErrorMessage name="username" class="text-danger" />
                    </div>

                    <!-- PhoneNumber Input -->
                    <div class="mb-3">
                        <label for="inputphonenumber" class="form-label fw-bold">Số điện thoại: </label>
                        <Field id="inputphonenumber" placeholder="Vui lòng nhập vào số điện thoại" name="phonenumber"
                            type="text" class="form-control form-control-lg" v-model="dataOrderInput.phonenumber"
                            required />
                        <ErrorMessage name="phonenumber" class="text-danger" />
                    </div>

                    <!-- Email Input -->
                    <div class="mb-3">
                        <label for="email" class="form-label fw-bold">Email: </label>
                        <Field id="email" placeholder="Vui lòng nhập vào Email" name="email" type="email"
                            class="form-control form-control-lg" v-model="dataOrderInput.email" required />
                        <ErrorMessage name="email" class="text-danger" />
                    </div>

                    <!-- TimeReturn Input -->
                    <div class="mb-3">
                        <label for="address" class="form-label fw-bold">Ngày trả: </label>
                        <input type="date" id="address" placeholder="Vui lòng nhập vào ngày trả" name="address"
                            class="form-control form-control-lg" v-model="dataOrderInput.timeReturn" required />
                        <ErrorMessage name="address" class="text-danger" />
                    </div>


                    <button @click="handleOrder()" type="submit" class="btn btn-info text-white fw-bold"
                        style="padding: 10px;border:1px solid #ccc;width:100%;">Xác Nhận</button>
                </Form>
            </div>
            <!-- Right_page -->
            <div class="col-lg-5" style="border:1px solid #000000;border-radius:10px;">
                <div class="row" style="display:flex;flex-wrap:nowrap;padding:20px;" v-for="item in dataShowFromCart">
                    <div>
                        <img :src="item.img_product" class="img-thumbnail" alt="..." width="76" height="110">
                        <br>
                        <span>{{ item.title_product }}</span>
                        <span style="color:#000000">&nbsp;(SL: {{ item.quantity_product }})</span>
                    </div>
                    <div style="margin-left:-100px;    margin-left: -85px;font-weight:bold;
                                    line-height: 71px;">
                        <span>{{ (item.price_product * item.quantity_product).toLocaleString() }} đ</span>
                    </div>
                </div>
                <hr>
                <hr>
                <div class="row" style="display:flex;flex-wrap:nowrap;padding:20px;">
                    <h4>Tổng Cộng:</h4>
                    <div style="margin-left:-200px;">
                        <span style="font-size: 20px;opacity:0.6">VND &nbsp</span>
                        <span style="font-size: 30px;">{{ totalCart.toLocaleString() }} đ</span>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>
.form-control-lg {
    font-size: 15px;
}
</style>