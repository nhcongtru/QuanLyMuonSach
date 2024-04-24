<script>
import UserService from '../services/User.service';
import ToastVue from '../components/Toast.vue';
import toast from '../assets/js/toasts';
export default {
    components: {
        ToastVue
    },
    data() {
        return {
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            },
            userDataInput: {
                username: "",
                email: "",
                phonenumber: ""
            },
            userDataupdate:{
                _id:"",
                username: "",
                email: "",
                phonenumber: ""
            }
        }
    },
    methods: {
        toast,
        async getDataUser() {
            const dataReturn = await UserService.getuserwithid(this.$route.params.id);
            this.userDataInput.username  = dataReturn.username;
            this.userDataInput.email  = dataReturn.email;
            this.userDataInput.phonenumber = dataReturn.phonenumber;
        },
        async handleEditUser(){
            try {
                let dataUpdate = await UserService.update(this.$route.params.id, this.userDataInput)
                this.userDataupdate._id = dataUpdate._id;
                this.userDataupdate.username = dataUpdate.username;
                this.userDataupdate.email = dataUpdate.email;
                this.userDataupdate.phonenumber = dataUpdate.phonenumber;

                localStorage.setItem("isloggin", JSON.stringify(this.userDataupdate))
            
                this.toasts.title = "Success",
                this.toasts.msg = "Cập nhật thông tin người dùng thành công !"
                this.toasts.type = "success",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                    this.$router.push(`/infoUser/${this.$route.params.id}`)
                }, 1500)
            }
            catch (err) {
                console.log(err)
                this.toasts.title = "Failed",
                this.toasts.msg = "Cập nhật thông tin người dùng thất bại !"
                this.toasts.type = "error",
                this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        },
        backPage() {
            setTimeout(() => {
                this.$router.push(`/infoUser/${this.$route.params.id}`)
            }, 100)
        },
    },
    created() {
        this.getDataUser();
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa thông tin cá nhân -->
        <form @submit.prevent id="form_editUser" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở về</button>

            <br>
            <h2 class="text-center" style="color:#000000">Chỉnh sửa thông tin</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Tên người dùng: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào tên người dùng..." v-model="userDataInput.username" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Email: </label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào Email..." v-model="userDataInput.email" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Số điện thoại: </label>
                <input type="text" class="form-control" id="exampleInputEmail1" minlength="10"  maxlength="10" aria-describedby="emailHelp" placeholder="Vui lòng nhập vào số điện thoại..."  v-model="userDataInput.phonenumber" required>
            </div>

            <button @click="handleEditUser()" type="submit" class="btn btn-light fw-bold" style="padding: 10px;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>