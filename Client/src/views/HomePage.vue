<script>
import ProductService from '../services/Product.service';
import StoreService from '../services/Store.service';

export default {
    data() {
        return {
            ProductData: [],
            ProductDataSort: [],
            SellquantityProduct: []
        }
    },
    methods: {
        async getDataProduct() {
            try {
                this.ProductData = await ProductService.getProductLimit();
            } catch (error) {
                console.log(error)
            }
        },
        async getProductDataSort() {
            try {
                this.ProductDataSort = await StoreService.getStoreSort();
                console.log(this.ProductDataSort)
            } catch (err) {
                console.log(err);
            }
        },
    },
    mounted() {
        this.getDataProduct();
        this.getProductDataSort();
    },

}
</script>

<template>
    <div class="container" id="main_page">

        <!-- Main_Content_Product-->
        <div class="row mt-5 item_product">
            <h4> <i class="fa-solid fa-book"></i> SẢN PHẨM NỔI BẬT</h4>
            <div class="col-lg-3" v-for="item in ProductDataSort">
                <div data-aos="zoom-out-left" class="card" style="width: 18rem;">
                    <img :src="item.sanphamdata.img_url[0]" class="card-img-top" alt="..." width="190" height="190"
                        style="object-fit: contain;">
                    <div class="card-body">
                        <span class="card-title" style="height:48px">{{ item.sanphamdata.title }}</span>

                        <p style="font-weight:bold">Số lượt đọc: {{ item.soluongSP }} lượt
                        </p>

                        <p class="card-text"><span class="fw-bold"> Giá mượn:</span> <span class="text-danger fw-bold">
                                {{ item.sanphamdata.price.toLocaleString() }} đ</span></p>
                        <router-link :to="{
                            name: 'Details',
                            params: { id: item.sanphamdata._id },
                        }">
                            <button type="button" class="btn" id="btn_detail">Xem chi tiết</button>
                        </router-link>
                    </div>
                </div>
                <p>{{ item.id_product }}</p>
            </div>
            <router-link :to="{ name: 'AllProduct' }">
                <button type="button" class="btn" id="btn_detail">Tất cả sách</button>
            </router-link>
        </div>
    </div>
</template>

<style>
#main_page {
    height: 100%;
}

.item_product h4 {
    background-color: #000000;
    border-radius: 5px;
    text-align: center;
    color: white;
    padding: 5px;
    margin-bottom: 19px;
}

.item_product {
    border: 1.5px solid #000000;
    border-radius: 5px;
    padding: 5px;
}

.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

#btn_detail {
    background-color: #000000;
    width: 100%;
    font-weight: bold;
    color: white;
}

/* CSS */


.button-88:hover {
    box-shadow: 0 0.5em 1.5em -0.5em #1482a798;
}

.button-88:active {
    box-shadow: 0 0.3em 1em -0.5em #1465a798;
}
</style>