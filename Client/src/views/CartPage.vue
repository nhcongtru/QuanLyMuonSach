<script>
export default {
    beforeRouteEnter: (to) => {
        if (!localStorage.getItem('isloggin') && to.name !== 'HomePage') {
            alert("Bạn cần phải đăng nhập để vào giỏ hàng !")
            return '/'
        }
    },
    data() {
        return {
            data_show_product_cart: [],
            totalCart: 0
        }
    },
    methods: {
        async loadCart() {
            let cart_localStorage = JSON.parse(localStorage.getItem("productCart"));
            this.data_show_product_cart = cart_localStorage
            var totalCartSum = 0;
            cart_localStorage.forEach((item, index) => {
                totalCartSum += item.quantity_product * item.price_product;
            })
            this.totalCart = totalCartSum
        },
        async DecreaseNumber(titleProduct) {
            let cartLocalStorage = JSON.parse(localStorage.getItem('productCart'));
            for (let i = 0; i < cartLocalStorage.length; i++) {
                if (cartLocalStorage[i].title_product === titleProduct) {
                    if (cartLocalStorage[i].quantity_product == 1) {
                        cartLocalStorage[i].quantity_product = 1;
                        alert('Số lượng sản phẩm thấp nhất là 1.')
                        break;
                    } else {
                        cartLocalStorage[i].quantity_product = cartLocalStorage[i].quantity_product - 1;
                        localStorage.setItem('productCart', JSON.stringify(cartLocalStorage));
                        break;
                    }
                }
            }

            this.loadCart();



        },
        removeItem(index) {
            var cartLocalStorage = JSON.parse(localStorage.getItem('productCart'));
            window.location.reload()
            cartLocalStorage.splice(index, 1)
            if (cartLocalStorage.length == 0) {
                localStorage.removeItem("productCart");
            } else {
                localStorage.setItem('productCart', JSON.stringify(cartLocalStorage));
            }
            this.loadCart();
        },
        async IncreaseNumber(titleProduct) {
            let cartLocalStorage = JSON.parse(localStorage.getItem('productCart'));
            for (let i = 0; i < cartLocalStorage.length; i++) {
                if (cartLocalStorage[i].title_product === titleProduct) {
                    cartLocalStorage[i].quantity_product = cartLocalStorage[i].quantity_product + 1;
                    localStorage.setItem('productCart', JSON.stringify(cartLocalStorage));
                    break;
                }
            }
            this.loadCart();

        }
    },
    mounted() {
        this.loadCart();
    }
}
</script>

<template>
    <div class="container" id="cartPage">
        <h4>GIỎ HÀNG ({{ data_show_product_cart.length }} sản phẩm)</h4>
        <div class="row">
            <div class="col-lg-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Mô tả sản phẩm</th>
                            <th scope="col">Số Lượng</th>
                            <th scope="col text-center">Thành Tiền</th>
                            <th scope="col">Xóa Sản Phẩm</th>
                        </tr>
                    </thead>
                    <tbody style="border:1px solid #000000;border-radius:5px;">
                        <tr v-if="data_show_product_cart.length == 0">
                            <h5 style="color:#000000;border:1px solid #000000;border-radius:5px;">Không có sản phẩm nào
                                trong giỏ hàng !</h5>
                        </tr>
                        <tr v-for="(item, index) in data_show_product_cart" v-if="data_show_product_cart.length != 0">
                            <td>
                                {{ ++index }}
                            </td>
                            <td class="d-flex">
                                <div class="col-lg-6">
                                    <img :src="item.img_product" class="img-thumbnail" alt="..." width="76"
                                        height="110">
                                </div>
                                <div class="col-lg" style="margin-left:-50px;">
                                    <p> {{ item.title_product }}</p>
                                    <p style="font-weight:bold">{{ item.price_product.toLocaleString() }} đ</p>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex">
                                    <button id="btn_decrease" @click="DecreaseNumber(item.title_product)">-</button>
                                    <input type="text" v-model="item.quantity_product" class="fw-bold"
                                        id="input_quantity">
                                    <button id="btn_increase" @click="IncreaseNumber(item.title_product)">+</button>
                                </div>
                            </td>
                            <td style="font-weight:bold;color:red;">
                                {{ (item.price_product * item.quantity_product).toLocaleString() }} đ
                            </td>
                            <td class="text-center">
                                <i @click="removeItem(index - 1)" class="fa-solid fa-trash" id="btn_delete"></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">
                <div style="border:1px solid #ccc;padding:10px;border-radius:10px;">
                    <div class="row d-flex" style="flex-wrap:nowrap">
                        <h5>Tổng Số Tiền</h5>
                        <span
                            style="margin-left:-400px;font-size:30px;color:red;font-weight:bold;margin-top:50px;">{{ totalCart.toLocaleString() }}
                            đ</span>
                    </div>
                    <br>
                    <br>
                    <router-link to="/order">
                        <button type="button" class="btn btn-info text-white fw-bold"
                            style="width:100%;background: color #000000;">XÁC NHẬN THÔNG TIN</button>
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<style>
#cartPage {
    margin-left: 160px;
    margin-top: 50px;
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

#input_quantity {
    width: 50px;
    border: 1px solid #ccc;
    border-radius: 3px;
    text-align: center;
}


#btn_decrease:hover {
    background-color: #000000;
}


#btn_increase:hover {
    background-color: #000000;
}

.input_quantity {
    width: 100px;
    text-align: center;
}

#btn_delete:hover {
    color: #000000;
    cursor: pointer;
}
</style>