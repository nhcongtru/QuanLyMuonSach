<script>
import ProductService from '../services/Product.service';
export default {
    data() {
        return {
            allProduct: [],
        }
    },
    watch: {
        '$route': 'getDetailDataProduct'
    },
    methods: {

        async getDetailDataProduct() {
            try {
                this.allProduct = await ProductService.getAllProduct();
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getDetailDataProduct()
    },
    mounted() {
    }
}

</script>


<template>
    <div class="container" id="category_book">
        <!-- BreadCrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="align-items: center;">
                <li class="breadcrumb-item">
                    <router-link to="/" style="color:#000000">Trang chủ</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Tất cả sách</li>
            </ol>
        </nav>

        <div class="col-lg right_content" id="danhmuc">
            <h3 style="color:#000000;margin:10px;">Tất cả sách</h3>
            <div class="container row">
                <div class="col-lg-4 mt-3 mb-3" v-for="item in allProduct" data-aos="fade-left">
                    <div class="card" style="width: 18rem;">
                        <img :src="item.img_url[0]" class="card-img-top" alt="..." width="190" height="190"
                            style="object-fit: contain;">
                        <div class="card-body">
                            <span class="card-title" style="height:48px">{{ item.title }}</span>
                            <p class="card-text"><span class="fw-bold"> Giá bán:</span> <span
                                    class="text-danger fw-bold"> {{ item.price.toLocaleString() }} đ</span></p>
                            <router-link :to="{
                                name: 'Details',
                                params: { id: item._id },
                            }">
                                <button type="button" class="btn" id="btn_detail">Xem chi tiết</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<style>
#category_book {
    margin-left: 170px;
    margin-top: 20px;
}

#left_nav,
.right_content {
    border: 1px solid #ccc;
    border-radius: 10px;
}

#left_nav ul li {
    list-style: none;
    margin-top: 20px;

}

#left_nav {
    margin-right: 20px;
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
</style>