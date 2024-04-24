<script>
import ManageBook from '../components/ManageBook.vue';
import Publisher from '../components/Publisher.vue';
import Account from '../components/Account.vue';
import Order from '../components/Order.vue';
import Store from '../components/Store.vue';
export default {
    components: {
        ManageBook,
        Publisher,
        Account,
        Order,
        Store
    },
    beforeRouteEnter: (to) => {
        if (!localStorage.getItem('adminlogin') && to.name !== 'HomePage') {
            alert("Bạn cần phải đăng nhập để vào trang quản trị !")
            return '/'
        }
    },
    methods:{
        async loadfirst(){
            setTimeout(()=>{
                if(localStorage.getItem('backPage') != null){
                    let page = localStorage.getItem('backPage');
                    document.querySelector(`#${page} > button`).setAttribute('class', 'nav-link active')
                    document.querySelector(`#${page} > button`).setAttribute('aria-selected', 'true')
                    document.querySelector(`.${page}`).setAttribute('class', 'tab-pane fade active show')

                    document.querySelector("#quanlisach > button").setAttribute('class', 'nav-link');
                    document.querySelector("#quanlisach > button").setAttribute('aria-selected', 'false');
                    document.querySelector(".quanlisach").setAttribute('class', 'tab-pane fade')

                    localStorage.removeItem('backPage')
                }

            },1)
        }
    },
    mounted(){
        this.loadfirst();
    } 
}
</script>

<template>
    <div class="container" id="main_content_pageAdmin">
        <div class="content_admin_page">
            <h1>Quản Lí Thư Viện</h1>

            <!-- Tab quản lí -->
            <ul class="nav nav-pills mb-3 mt-4 cọntainer-fluid" id="pills-tab" role="tablist" style="border:1px solid #ccc;width:fit-content;border-radius:10px;">
                <li class="nav-item" role="presentation" id="quanlisach">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i class="fa-solid fa-book"></i> Quản Lý
                        Sách </button>
                </li>
                <li class="nav-item" role="presentation" id="quanlitacgia">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"><i class="fa-solid fa-book-open-reader"></i> Quản
                        Lý Nhà Xuất Bản</button>
                </li>
                <li class="nav-item" role="presentation" id="quanlitaikhoan">
                    <button class="nav-link" id="pills-chon-2" data-bs-toggle="pill" data-bs-target="#pills-chon" type="button" role="tab" aria-controls="pills-chon" aria-selected="false"><i class="fa-solid fa-users"></i> Quản Lý Tài Khoản</button>
                </li>
                <li class="nav-item" role="presentation" id="quanlidonhang">
                    <button class="nav-link" id="pills-chinh-2" data-bs-toggle="pill" data-bs-target="#pills-chinh" type="button" role="tab" aria-controls="pills-chinh" aria-selected="false"><i class="fa-solid fa-boxes-stacked"></i> &nbsp;Quản Lý Đơn
                        Hàng</button>
                </li>
                <li class="nav-item" role="presentation" id="quanlikho">
                    <button class="nav-link" id="pills-kho-2" data-bs-toggle="pill" data-bs-target="#pills-kho" type="button" role="tab" aria-controls="pills-kho" aria-selected="false"><i class="fa-sharp fa-solid fa-shop"></i> &nbsp;Quản Lý Kho</button>
                </li>
            </ul>
            <div class="tab-content" id="pills-tabContent" style="border:1px solid #ccc;width:fit-content;border-radius:10px;">
                <div class="tab-pane fade show active quanlisach" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <!-- Quản Lý Sách -->
                    <ManageBook></ManageBook>
                </div>
                <div class="tab-pane fade quanlitacgia" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <!-- Quản lý tác giả -->
                    <Publisher></Publisher>
                </div>
                <div class="tab-pane fade quanlitaikhoan" id="pills-chon" role="tabpanel" aria-labelledby="pills-chon-2">
                    <!-- Quản lý tài khoản -->
                    <Account></Account>
                </div>
                <div class="tab-pane fade quanlidonhang" id="pills-chinh" role="tabpanel" aria-labelledby="pills-chinh-2">
                    <!-- Quản lý đơn hàng -->
                    <Order></Order>
                </div>
                <div class="tab-pane fade quanlikho" id="pills-kho" role="tabpanel" aria-labelledby="pills-chinh-2">
                    <!-- Quản lý kho -->
                    <Store></Store>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#main_content_pageAdmin {
    height: fit-content;
    margin-left: 70px;
}

.content_admin_page {
    margin-top: 80px;
}

tr th, td{
    width: fit-content;
    border: 1px solid #ccc;
}

#img_book{
    object-fit: cover;
}

table{
    font-size: 15px;
    width: fit-content;
}
</style>
