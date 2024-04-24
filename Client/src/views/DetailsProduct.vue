<script>
import ProductService from '../services/Product.service';


export default {
    data() {
        return {
            DetailProductData: [],
            quantity_item: 1,
            RelatedProduct: [],
            img_click: '',
            current_index: 0
        }
    },
    watch: {
        '$route': 'redirectPage'
    },
    methods: {
        redirectPage(vara) {
            this.$router.push(`/${vara}`);
        },
        openImg(variable, index) {
            this.img_click = variable;
            this.current_index = index;
            document.querySelector("#img_show").style.display = 'flex'
        },
        previousImg() {
            this.current_index--;
            if (this.current_index < 0) {
                this.current_index = 2
            }
            document.querySelector("#img_center").setAttribute('src', this.DetailProductData.img_url[this.current_index]);
        },
        nextImg() {
            this.current_index++;
            if (this.current_index > 2) {
                this.current_index = 0
            }
            document.querySelector("#img_center").setAttribute('src', this.DetailProductData.img_url[this.current_index]);
        },
        exit() {
            document.querySelector("#img_show").style.display = 'none'
        },
        async getDetailDataProduct() {
            try {
                this.DetailProductData = await ProductService.get(this.$route.params.id);
            } catch (error) {
                console.log(error)
            }
        },
        async DecreaseNumber() {
            if (this.quantity_item == 1) {
                this.quantity_item = 1;
            } else {
                this.quantity_item -= 1
            }
        },
        async IncreaseNumber() {
            if (this.quantity_item >= this.DetailProductData.quantityonhand) {
                this.quantity_item = this.DetailProductData.quantityonhand;
                alert('Đã đạt số lượng giới hạn cần thêm vào!')
            } else {
                this.quantity_item += 1
            }

        },
        addtoCart(title_product_input) {
            if (!localStorage.getItem('isloggin')) {
                alert('Bạn cần phải đăng nhập trước khi thêm vào giỏ hàng !')
            } else {

                var checkExitCart = JSON.parse(localStorage.getItem('productCart'));

                if (!checkExitCart) {
                    checkExitCart = [
                        {
                            id_product: this.DetailProductData._id,
                            img_product: this.DetailProductData.img_url[0],
                            title_product: this.DetailProductData.title,
                            price_product: this.DetailProductData.price,
                            quantity_product: this.quantity_item
                        }
                    ]

                    localStorage.setItem('productCart', JSON.stringify(checkExitCart));
                    alert('Thêm vào giỏ hàng thành công !')
                } else {
                    for (let i = 0; i < checkExitCart.length; i++) {
                        if (title_product_input === checkExitCart[i].title_product) {
                            checkExitCart[i].quantity_product = checkExitCart[i].quantity_product + this.quantity_item;
                            localStorage.setItem('productCart', JSON.stringify(checkExitCart))
                            alert('Thêm vào giỏ hàng thành công !')
                            return;
                        }
                    }

                    let new_object = {
                        id_product: this.DetailProductData._id,
                        img_product: this.DetailProductData.img_url[0],
                        title_product: this.DetailProductData.title,
                        price_product: this.DetailProductData.price,
                        quantity_product: this.quantity_item
                    }

                    checkExitCart.push(new_object)

                    localStorage.setItem('productCart', JSON.stringify(checkExitCart))
                    alert('Thêm vào giỏ hàng thành công !')
                }
            }
            setTimeout(() => {
                window.location.reload();
            }, 100)
        }
    },
    created() {
        this.getDetailDataProduct();
    },
}
</script>

<template>
    <div class="container" id="main_page_detail_product">
        <!-- BreadCrumb -->
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb" style="align-items: center;">
                <li class="breadcrumb-item">
                    <router-link to="/" style="color:#000000">Trang chủ</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Chi tiết sản phẩm</li>
            </ol>
        </nav>


        <div id="img_show"
            style="position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background-color:black;z-index:9999999;display:none;">
            <img :src="img_click" class="img-fluid" alt="..." width="500" height="500" id="img_center">
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span @click="previousImg()" class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span @click="nextImg()" class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            <i @click="exit()" class="fa-solid fa-xmark" style="position: absolute;
                                                                top: 11px;
                                                                right: 25px;
                                                                color: white;
                                                                font-size: 50px;
                                                                opacity: 0.6;
                                                                z-index:999999999999;
                                                                cursor:pointer;"></i>
        </div>


        <!-- Detail_Product -->
        <div class="row">
            <div class="col-6">
                <img :src="DetailProductData.img_url[0]" class="img-fluid" alt="..." width="319" height="444"
                    style="    border: 1px solid #ccc;
                                                                                                        border-radius: 10px;
                                                                                                        padding: 10px;box-shadow: 1px 2px 13px 0px;margin-left:130px;">
                <div class="row d-flex mt-5 text-center">
                    <div class="col">
                        <img @click="openImg(DetailProductData.img_url[0], 0)" :src="DetailProductData.img_url[0]"
                            class="img-thumbnail img_introduce" alt="..." width="319" height="444"
                            style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                    <div class="col">
                        <img @click="openImg(DetailProductData.img_url[1], 1)" :src="DetailProductData.img_url[1]"
                            class="img-thumbnail img_introduce" alt="..." width="319" height="444"
                            style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                    <div class="col">
                        <img @click="openImg(DetailProductData.img_url[2], 2)" :src="DetailProductData.img_url[2]"
                            class="img-thumbnail img_introduce" alt="..." width="319" height="444"
                            style="    border: 1px solid #ccc;object-fit:contain;
                                                                                                            border-radius: 10px;
                                                                                                            padding: 10px;box-shadow: 1px 2px 13px 0px; width:150px;height:150px;">
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <h4>{{ DetailProductData.title }}</h4>
                </div>
                <br>
                <div class="row">
                    <p>Nhà xuất bản: <span class="fw-bold">{{ DetailProductData.publisher }}</span></p>
                </div>
                <div class="row">
                    <p style="border:1px solid #000000;;width:fit-content;border-radius:10px;padding:20px">
                        Giá mượn:
                    <h1 style="color:#000000;">
                        {{ DetailProductData.price.toLocaleString() }} đ
                    </h1>
                    </p>
                </div>
                <br>
                <div class="row">
                    <h5>Số lượng (<i class="fa-sharp fa-solid fa-store"></i>) :
                        <span v-if="DetailProductData.quantityonhand != 0"> {{ DetailProductData.quantityonhand }}
                        </span>
                        <span v-else style="color:red;font-size:30px;">Đã hết hàng !</span>
                    </h5>
                    <br>
                    <br>
                    <div class="d-flex">
                        <button id="btn_decrease" @click="DecreaseNumber">-</button>
                        <input type="text" class="fw-bold" v-model="quantity_item" id="input_quantity">
                        <button id="btn_increase" @click="IncreaseNumber">+</button>
                    </div>
                </div>

                <div class="row" v-if="DetailProductData.quantityonhand != 0">
                    <p @click="addtoCart(DetailProductData.title)" id="cart_btn" style="cursor:pointer"><i
                            class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ hàng</p>
                </div>
            </div>
        </div>


        <!-- Description Product -->
        <div class="row mt-5" id="description">
            <h5>MÔ TẢ SẢN PHẨM</h5>
            <hr>
            <div>
                <p>
                    {{ DetailProductData.description }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#main_page_detail_product {
    height: 100%;
    margin-left: 165px;
    margin-top: 50px;
}

#btn_detail {
    background-color: #000000;
    width: 100%;
    font-weight: bold;
    color: white;
}


#btn_decrease {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: none;
}

#btn_increase {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: none;
}


#btn_decrease:hover {
    background-color: #000000;
}


#btn_increase:hover {
    background-color: #000000;
}

#input_quantity {
    width: 100px;
    text-align: center;
}

#cart_btn {
    padding: 16px;
    border: 1px solid #000000;
    color: #000000;
    font-weight: bold;
    width: fit-content;
    border-radius: 10px;
    font-size: 17px;
    margin-top: 29px;
}

#description {
    width: 88%;
    border: 2px solid #000000;
    padding: 10px;
    border-radius: 10px;
}


.card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
}

.img_introduce:hover {
    border: 4px solid #000000 !important;
    cursor: pointer;
}
</style>