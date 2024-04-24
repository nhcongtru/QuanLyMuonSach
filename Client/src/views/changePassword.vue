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
                old_password: "",
                new_password: "",
                renew_password: ""
            },
        }
    },
    methods: {
        toast,
        backPage() {
            setTimeout(() => {
                this.$router.push(`/infoUser/${this.$route.params.id}`)
            }, 100)
        },
        async handleChangePassword() {
            if (this.userDataInput.new_password == '' || this.userDataInput.renew_password == '' || this.userDataInput.old_password == '') {
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Vui lòng nhập đầy đủ thông tin !"
                this.toasts.type = "success",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast();
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 1000)
            } else {
                if (this.userDataInput.new_password === this.userDataInput.renew_password) {
                    try {
                        await UserService.getuserwithidChangePass(this.$route.params.id, this.userDataInput);
                        this.toasts.title = "Success",
                            this.toasts.msg = "Đổi mật khẩu thành công !"
                        this.toasts.type = "success",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast();
                        alert("Vui lòng đăng nhập lại !")
                        setTimeout(() => {
                            this.$router.push(`/infoUser/${this.$route.params.id}`)
                            localStorage.removeItem("isloggin");
                            this.$router.push('/login')
                            setTimeout(() => {
                                window.location.reload();
                            }, 700)
                        }, 100)
                    } catch (err) {
                        this.toasts.title = "Thất bại",
                            this.toasts.msg = "Đổi mật khẩu thất bại !"
                        this.toasts.type = "error",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast()
                        setTimeout(() => {
                            document.querySelector("#toast").style.display = 'none'
                        }, 1000)
                    }
                } else {
                    this.toasts.title = "Thất bại",
                        this.toasts.msg = "Mật khẩu không trùng khớp !"
                    this.toasts.type = "error",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast()
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 1000)
                }
            }
        }
    }
}
</script>
<template>
    <div class="container" style="margin-top:90px;">
        <ToastVue></ToastVue>
        <!-- Giao diện chỉnh sửa thông tin cá nhân -->
        <form @submit.prevent id="form_editUser" style="width:100%;">
            <button @click="backPage()" type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-left"></i> Trở
                về</button>

            <br>
            <h2 class="text-center" style="color:#000000">Đổi mật khẩu</h2>
            <!-- Title Input -->
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label fw-bold">Nhập mật khẩu cũ: </label>
                <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    placeholder="Vui lòng nhập vào mật khẩu cũ" name="old_password" v-model="userDataInput.old_password"
                    required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail2" class="form-label fw-bold">Nhập mật khẩu mới: </label>
                <input type="password" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                    placeholder="Vui lòng nhập vào mật khẩu mới" name="new_password"
                    v-model="userDataInput.new_password" required>
            </div>

            <div class="mb-3">
                <label for="exampleInputEmail3" class="form-label fw-bold">Nhập lại mật khẩu mới: </label>
                <input type="password" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp"
                    placeholder="Vui lòng nhập lại mật khẩu mới" v-model="userDataInput.renew_password" required>
            </div>



            <button @click="handleChangePassword()" type="submit" class="btn btn-light fw-bold"
                style="padding: 10px;border:1px solid #ccc">Xác Nhận</button>
        </form>
    </div>
</template>