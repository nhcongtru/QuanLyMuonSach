<script>
export default {
    data() {
        return {
            inputSearch: '',
            checkLogAdmin: '',
            countCart: 0,
            userLoginname: '',
            userLoginID: '1'
        }
    },
    methods: {
        async showCart() {
            try {
                let cart_localStorage = JSON.parse(localStorage.getItem("productCart"));
                this.countCart = cart_localStorage.length;
            } catch (error) {
                console.log(error)
            }
        },
        showUserAlreadyLogin() {
            if (localStorage.getItem('adminlogin') != null) {
                this.checkLogAdmin = 'adminlogin';
                document.querySelector("#login_complete").style.display = 'block';
                this.userLoginname = 'Tài khoản Admin'
            } else {
                if (!localStorage.getItem('isloggin')) {
                    //Trường hợp chưa đăng nhập
                    document.querySelector("#not_login").style.display = 'block';
                    document.querySelector("#login_complete").style.display = 'none';
                } else {
                    //Trường hợp đã đăng nhập      
                    document.querySelector("#login_complete").style.display = 'block';
                    document.querySelector("#not_login").style.display = 'none';
                    this.userLoginname = JSON.parse(localStorage.getItem("isloggin")).username;
                    this.userLoginID = JSON.parse(localStorage.getItem("isloggin"))._id;
                }
            }
        },
        logout_Btn() {
            localStorage.removeItem("isloggin");
            localStorage.removeItem("adminlogin");
            localStorage.removeItem("productCart");
            this.$router.push('/login')
            setTimeout(() => {
                window.location.reload();
            }, 700)
        },
        loadPage() {
            setTimeout(() => {
                window.location.reload();
            }, 100)
        },
    },
    mounted() {
        this.showUserAlreadyLogin(),
        this.showCart()
    },

}
</script>

<template>
    <!-- Header1 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="top_nav"style="height: 100px;">
        <div class="container">
            <a class="navbar-brand" href="/" style="margin-right:150px;margin-top:50px;">
                <img src="@/assets/img/logo.png" class="img-fluid" alt="..." width="200" height="200">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3" v-if="checkLogAdmin !== 'adminlogin'">
                    <form action="/" class="d-flex" style="width:500px;" @submit.prevent>
                        <input type="text" class="form-control" placeholder="Nhập vào tên sách hoặc mô tả..."
                            aria-label="Recipient's username" aria-describedby="basic-addon2" style="border-radius:6px;"
                            v-model="inputSearch">
                        <router-link v-if="inputSearch !== ''" :to="{
                            name: 'FindProduct',
                            params: { name: JSON.stringify(inputSearch) },
                        }">
                            <button id="btn_search" type="submit"
                                style="width:120px;height:50px;border-radius:0 6px 6px 0" @click="loadPage()">Tìm
                                Kiếm</button>
                        </router-link>
                    </form>
                </div>

                <!-- Đã đăng nhập -->
                <div id="login_complete" style="display:none;z-index:100">
                    <div class="d-flex flex-column"
                        style="width:120px;margin-left:-30%;margin-top:-20px;margin-right:20px;z-index:10;">
                        <span class="fw-bold mb-1">
                            <router-link :to="{
                                name: 'infoUser',
                                params: { id: userLoginID }
                            }">
                                <p style="margin-bottom:0;">{{ userLoginname }}</p>
                            </router-link>
                        </span>

                        <span>
                            <button @click="logout_Btn()"
                                class="btn btn-danger text-white text-decoration-none text-dark"
                                style=" width: fit-content;height: 35px;display: flex;align-items: center;margin-top: 3px;justify-content: center;">
                                Đăng xuất</button>
                        </span>
                    </div>
                </div>

                <!-- Chưa đăng nhập -->
                <div id="not_login" style="display:none;z-index:100;">
                    <div class="d-flex flex-column"
                        style="width:120px;margin-left:-30%;margin-top:-20px;margin-right:20px;z-index:10">
                        <span class="fw-bold mb-1">
                            <a href="#" class="text-decoration-none text-dark">
                                <router-link to="/login" class="text-decoration-none text-dark"> Đăng Nhập</router-link>
                            </a>
                        </span>

                        <span>
                            <a href="#" class="text-decoration-none text-dark">
                                <router-link to="/register" class="text-decoration-none text-dark"> Đăng
                                    Ký</router-link>
                            </a>
                        </span>
                    </div>
                </div>

                <!-- cart_icon -->
                <div id="icon_cart" style="margin-right:141px" v-if="checkLogAdmin !== 'adminlogin'">
                    <router-link to="/cartStore">
                        <i class="fa-solid fa-cart-shopping" style="color:#000000;position:relative">
                            <span style="    position: absolute;
                                border-radius: 50%;
                                background-color: black;
                                color: white;
                                top: -8px;
                                right: -6px;
                                border-radius: 50%;
                                padding: 2px;
                                font-size: 15px;
                                width: 20px;
                                height: 20px;
                                display: flex;
                                align-items: center;
                                justify-content: center;">{{ countCart }}
                            </span>
                        </i>

                    </router-link>
                    <p style="font-size:8px;">Giỏ hàng</p>
                </div>
            </div>
        </div>
    </nav>

    <!-- Header 2 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="nav_bottom" v-if="checkLogAdmin !== 'adminlogin'">
        <div class="container" style="height: 82px;">
            <div class="navbar-brand" href="#" style=" margin-right: 50px; margin-left: 61px;"></div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="input-group mb-3 text-light" style=" align-items: center; margin-bottom: 0 !important;"></div>

                <div style="    margin-left: -592px;z-index:10">
                    <ul class="nav d-flex">
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/" class="text-decoration-none text-white">
                                TRANG CHỦ
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/storesystem" class="text-decoration-none text-white">
                                HỆ THỐNG THƯ VIỆN
                            </router-link>
                        </li>
                        <li class="nav-item" style="margin-right:15px;">
                            <router-link to="/introduce" class="text-decoration-none text-white">
                                GIỚI THIỆU
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </nav>
</template>

<style>
ul {
    text-decoration: none;
    width: 100%;
}

a {
    text-decoration: none !important;
    line-height: 2.5rem;
    color: black;
}

.dropdown-menu li {
    text-decoration: none !important;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin: 1px;
}

.dropdown-menu li:hover {
    color: #f47373;
}

#btn_search {
    background-color: #000000;
    color: white;
    font-weight: bold;
    border: none;
}


#icon_cart {
    color: #000000;
    font-size: 30px;
}


#top_nav {
    height: 83px;
}

#nav_bottom {
    background-color: #000000;
    height: 76px;
}

#myBtn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    border: none;
    outline: none;
    background-color: #000000;
    color: white;
    cursor: pointer;
    padding: 15px;
    border-radius: 4px;
}

#myBtn:hover {
    background-color: #ee8e8e;
}

.nav-item a:hover {
    color: rgb(233, 131, 131) !important;
}
</style>
