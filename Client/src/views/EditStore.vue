<script>
import ProductService from '../services/Product.service';
import PublisherService from '../services/Publisher.service';
import ToastVue from '../components/Toast.vue';
import toast from '../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            BookDataInput: {
                img_url: [],
                title: "",
                publisher: "",
                description: "",
                price: "",
                quantityonhand: "",
            },
            ManagePublisher: [],
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
        }
    },
    methods: {
        toast,
        async changeOptionTG() {
            this.BookDataInput.publisher = document.querySelector("#chooseTG").value;
        },
        async loadDataEditBook() {
            try {
                const result = await ProductService.getproductwithID(this.$route.params.id);
                this.ManagePublisher = await PublisherService.getAllPublisher();
                this.BookDataInput.img_url[0] = result.img_url[0]
                this.BookDataInput.img_url[1] = result.img_url[1]
                this.BookDataInput.img_url[2] = result.img_url[2]
                this.BookDataInput.title = result.title;
                this.BookDataInput.publisher = result.publisher;
                this.BookDataInput.description = result.description;
                this.BookDataInput.price = result.price;
                this.BookDataInput.quantityonhand = result.quantityonhand;
            } catch (err) {
                console.log(err);
            }
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlikho')
                this.$router.push("/admin")
            }, 100)
        },
        async handleEditStore() {
            try {
                await ProductService.update(this.$route.params.id, this.BookDataInput)
                this.toasts.title = "Success",
                this.toasts.msg = "Cập nhật kho thành công !"
                this.toasts.type = "success",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    this.$router.push("/admin")
                }, 1500)
            }
            catch (err) {
                console.log(this.BookDataInput)
                this.toasts.title = "Failed",
                this.toasts.msg = "Cập nhật kho thất bại !"
                this.toasts.type = "error",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
    },
    mounted() {
        this.loadDataEditBook();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa sách  -->
        <form @submit.prevent id="form_addBook" style="width:100%;">

            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#000000">Chỉnh sửa kho</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên Sách: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên sách..." v-model="BookDataInput.title" required disabled>
            </div>

            <!-- Img Input -->
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label fw-bold">Hình Ảnh Sách:(3 ảnh)</label>
                <div class="row">
                    <img :src="BookDataInput.img_url[0]" class="img-thumbnail" alt="..." style="width:150px;height:150px;">
                    <img :src="BookDataInput.img_url[1]" class="img-thumbnail" alt="..." style="width:150px;height:150px;">
                    <img :src="BookDataInput.img_url[2]" class="img-thumbnail" alt="..." style="width:150px;height:150px;">
                </div>
            </div>

            <!-- Số lượng sản phẩm trong kho -->
            <div class="mb-3">
                <label for="quantityonhand" class="form-label fw-bold">Số lượng sản phẩm trong kho:</label>
                <br>
                <input type="number" v-model="BookDataInput.quantityonhand" style="    border-radius: 10px;color:red;font-weight:bold;
                padding: 10px;
                width: 150px;">
            </div>

            <button @click="handleEditStore()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>