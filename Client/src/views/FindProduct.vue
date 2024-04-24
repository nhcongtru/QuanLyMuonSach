<script>
import ProductService from '../services/Product.service';

export default {
    data() {
        return {
            productfind: [],
            keyword: ''
        }
    },
    methods: {
        async getDataProductSearch() {
            try {
                this.productfind = await ProductService.findproductwithName(JSON.parse(this.$route.params.name));
                this.keyword = JSON.parse(this.$route.params.name)
            } catch (error) {
                console.log(error)
            }
        },
    },
    created() {
        this.getDataProductSearch();
    },
}
</script>
<template>
    <div class="container mt-5" style="margin-left:150px;">
        <h2 class="mb-3">KẾT QUẢ TÌM KIẾM (<span style="color:#000000">{{productfind.length}}</span> kết quả) </h2>
        <h4>Từ khóa:  <span style="color:#000000;font-size:30px">{{ keyword }}</span> </h4>
        <div class="d-flex row">
            <div class="col-lg-3 mt-4" v-for="item in productfind">
                <div class="card" style="width: 18rem;" data-aos="flip-up">
                    <img :src="item.img_url[0]" class="card-img-top" alt="..." width="190" height="190" style="object-fit: contain;">
                    <div class="card-body">
                        <span class="card-title" style="height:48px">{{ item.title }}</span>
                        <p class="card-text"><span class="fw-bold"> Giá bán:</span> <span class="text-danger fw-bold"> {{ item.price.toLocaleString()}} đ</span></p>
                        <router-link :to="{
                            name: 'Details',
                            params: { id: item._id },
                        }">
                            <button type="button" class="btn" id="btn_detail" @click="reloadPage()">Xem chi tiết</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    #btn_detail{
        background-color: #000000;
        width: 100%;
        font-weight: bold;
        color: white;
    }

    .card-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>