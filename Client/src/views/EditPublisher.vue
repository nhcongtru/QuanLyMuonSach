<script>
import PublisherService from '../services/Publisher.service';
import ToastVue from '../components/Toast.vue';
import toast from '../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            PublisherDataInput: {
                publisher_name: "",
                address: ""
            },
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
        async loadDataPublisher() {
            try {
                const result = await PublisherService.getpublisherwithID(this.$route.params.id);
                this.PublisherDataInput.publisher_name = result.publisher_name;
                this.PublisherDataInput.address = result.address;
            } catch (err) {
                console.log(err);
            }
        },
        backPage() {
            setTimeout(() => {
                localStorage.setItem('backPage', 'quanlitacgia')
                this.$router.push("/admin")
            }, 100)
        },
        async handleEditPublisher() {
            try {
                await PublisherService.update(this.$route.params.id, this.PublisherDataInput)
                this.toasts.title = "Success",
                    this.toasts.msg = "Cập nhật nhà xuất bản thành công !"
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
                this.toasts.title = "Failed",
                    this.toasts.msg = "Cập nhật nhà xuất bản thất bại !"
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
        this.loadDataPublisher();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa sách  -->
        <form @submit.prevent id="form_addPublisher" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#000000">Chỉnh sửa nhà xuất bản</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên nhà xuất bản: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên nhà xuất bản..." v-model="PublisherDataInput.publisher_name" required>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Địa chỉ nhà xuất bản: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào địa chỉ..." v-model="PublisherDataInput.address" required>
            </div>

            <button @click="handleEditPublisher()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>