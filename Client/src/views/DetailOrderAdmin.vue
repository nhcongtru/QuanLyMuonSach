<script>
import OrderService from '../services/Order.service';
export default {
    data() {
        return {
            detailOrder: '',
            dataShow: {
                title: '',
                img_url: '',
                price: '',
            },
            idOrder: ''
        }
    },
    methods: {
        async loadDataOrderDetail() {
            const data = await OrderService.getOrderWithID(this.$route.params.id)
            this.idOrder = this.$route.params.id;
            this.detailOrder = data.detail_cart;
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlidonhang')
                this.$router.push("/admin")
            }, 100)
        },
    },
    created() {
        this.loadDataOrderDetail()
    }
}
</script>
<template>
    <div class="container" id="orderDetail">
        <button @click="backPage()" type="button" class="btn btn-primary" style="margin-top: 50px;"><i class="fa-solid fa-arrow-left"></i> Trở
            về</button>
        <br>
        <br>
        <h5 style="color:#000000;">SÁCH MƯỢN: {{ idOrder }}</h5>
        <br>
        <h5>CHI TIẾT SÁCH</h5>
        <br>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng cộng</th>
                    <!-- <th scope="col">Ngày trả</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in detailOrder">
                    <td>{{ ++index }}</td>
                    <td>{{ item.title_product }}</td>
                    <td>
                        <img v-bind:src="item.img_product" alt="" width="100" height="100">
                    </td>
                    <td>{{ item.price_product.toLocaleString() }} đ</td>
                    <td>{{ item.quantity_product }}</td>
                    <td>{{ (item.price_product * item.quantity_product).toLocaleString() }} đ</td>
                    <!-- <td>
                        <p>{{ item.timecreateOrder }}</p>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
#orderDetail {
    margin-left: 150px;
    margin-top: 50px;
}
</style>