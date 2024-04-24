<script>
import OrderService from '../services/Order.service';
import ProductService from '../services/Product.service';
export default {
    data() {
        return {
            dataCompleteOrder: [],
        }
    },
    methods: {
        async loadDataCompleteOrder() {
            const dataReturn = await OrderService.getOrderWithID(this.$route.params.id);
            this.dataCompleteOrder = dataReturn;
        },
        continueShopping() {
            localStorage.removeItem('productCart');
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    },
    created() {
        this.loadDataCompleteOrder();
    }
}
</script>
<template>
    <div class="container" style="margin-top:50px;">
        <!-- <ToastVue></ToastVue> -->
        <!-- Giao diện trang thanh toán  -->
        <div class="row">
            <!-- Left_page -->
            <div class="col-lg-5">
                <h2> <i class="fa-regular fa-circle-check"></i> Thư Viện</h2>
                <!-- BreadCrumb -->
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb" style="align-items: center;">
                        <li class="breadcrumb-item">
                            <router-link to="/cartStore" style="color:#000000">Giỏ hàng </router-link>
                        </li>
                        <li class=" breadcrumb-item active" aria-current="page" style="color:red;font-weight:bold">Xác
                            nhận thành công đơn hàng</li>
                    </ol>
                </nav>

                <p style="font-weight: bold;">Xác nhận thành công đơn hàng</p>
                <li class=" breadcrumb-item active" aria-current="page" style="color:red;font-weight:bold">
                            Bạn vui lòng đến trực tiếp thư viện để thanh toán và nhận sách khi được xác nhận có thể mượn!</li>
                <p>Mã đơn hàng: <span style="color:#000000;font-weight:bold">{{ dataCompleteOrder._id }}</span> </p>
                <p style="font-weight: bold;">Cảm ơn bạn đã sử dụng dịch vụ !</p>

                <div class="row" style="border:1px solid #ccc;border-radius:10px;padding:5px;margin-bottom:10px;">
                    <h2>THÔNG TIN ĐƠN HÀNG</h2>
                    <p>Họ và tên: {{ dataCompleteOrder.username }}</p>
                    <p>Số điện thoại: {{ dataCompleteOrder.phonenumber }}</p>
                    <p>Trạng thái đơn hàng: {{ dataCompleteOrder.statusOrder }}</p>
                </div>

                <div class="row">
                    <router-link to="/" @click="continueShopping()">
                        <button type="button" class="btn btn-secondary">Tiếp tục</button>
                    </router-link>

                </div>

            </div>
            <!-- Right_page -->
            <div class="col-lg-7" style="border:1px solid #000000;border-radius:10px;">
                <div class="row" style="display:flex;flex-wrap:nowrap;padding:20px;"
                    v-for="item in dataCompleteOrder.detail_cart">
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
                    <div style="margin-left:-252px;">
                        <span style="font-size: 20px;opacity:0.6">VND &nbsp; </span>
                        <span style="font-size: 30px;">{{ (dataCompleteOrder.totalOrder).toLocaleString() }} đ</span>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>