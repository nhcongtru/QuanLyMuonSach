<script>
import AuthService from '../services/Auth.service';
import ToastVue from './Toast.vue';
import toast from '../assets/js/toasts';

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        ToastVue,
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const Loginform = yup.object().shape({
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không đúng định dạng")
                .max(30, "Email tối đa 30 ký tự."),
            password: yup
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
                .required("Mật khẩu phải có giá trị.")
        });
        return {
            Loginform,
            userDataInput: {
                email: "",
                password: ""
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
        async handleLoginUser() {
            try {
                if (this.userDataInput.email == '' || this.userDataInput.password == '') {
                    this.toasts.title = "Thất bại",
                        this.toasts.msg = "Chưa điền đầy đủ thông tin !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 1000)
                } else {
                    if (this.userDataInput.email === 'admin@gmail.com') {
                        await AuthService.createlogin(this.userDataInput);
                        localStorage.setItem('adminlogin', true);
                        this.toasts.title = "Thành công",
                            this.toasts.msg = "Đăng Nhập Thành Công !"
                        this.toasts.type = "success",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast();
                        setTimeout(() => {
                            document.querySelector("#toast").style.display = 'none'
                            this.$router.push('/admin');
                        }, 1000)
                    } else {
                        const userDataLogin = await AuthService.createlogin(this.userDataInput);
                        localStorage.setItem('isloggin', JSON.stringify(userDataLogin));
                        this.toasts.title = "Thành công",
                            this.toasts.msg = "Đăng Nhập Thành Công !"
                        this.toasts.type = "success",
                            this.toasts.duration = 2000
                        document.querySelector("#toast").style.display = 'block'
                        this.toast();
                        setTimeout(() => {
                            document.querySelector("#toast").style.display = 'none'
                            this.$router.push({ name: "HomePage" });
                        }, 2000)
                    }

                    setTimeout(() => {
                        window.location.reload();
                    }, 2100)
                }



            }
            catch (err) {
                console.log(err)
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Sai tên tài khoản hoặc mật khẩu !"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        }
    },
};

</script>



<template>
    <ToastVue></ToastVue>
    <Form :validation-schema="Loginform" @submit.prevent>
        <!-- Email Input -->
        <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email: </label>
            <Field id="email" placeholder="Vui lòng nhập vào Email" name="email" type="email"
                class="form-control form-control-lg" v-model="userDataInput.email" required />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <!-- Password Input -->
        <div class="mb-3">
            <label for="password" class="form-label fw-bold">Mật khẩu: </label>
            <Field id="password" placeholder="Vui lòng nhập vào mật khẩu" name="password" type="password"
                class="form-control form-control-lg" v-model="userDataInput.password" required />
            <ErrorMessage name="password" class="text-danger" />
        </div>
        <button type="submit" @click="handleLoginUser()" class="btn btn-light fw-bold"
            style="padding: 10px;;border:1px solid #ccc">Xác Nhận</button>
        <p class="mt-4">Nếu chưa có tài khoản. Hãy nhấn vào
            <router-link to="/register" class="link-danger">Đăng Ký
            </router-link>
        </p>
    </Form>
</template>

<style scoped>
span {
    display: block;
}

.form-control-lg {
    font-size: 15px;
}
</style>