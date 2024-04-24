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
        const Registerform = yup.object().shape({
            username: yup
                .string()
                .required("Phải nhập vào tên đầy đủ !")
                .max(15, "Tối đa 15 kí tự")
                .min(12, "Ít nhất 12 kí tự"),
            email: yup
                .string()
                .required("Email phải có giá trị.")
                .email("Email không đúng định dạng")
                .max(30, "Email tối đa 30 ký tự."),
            phonenumber: yup
                .string()
                .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ.")
                .required("Số điện thoại không được bỏ trống"),
            password: yup
                .string()
                .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
                .required("Mật khẩu phải có giá trị.")
        });
        return {
            Registerform,
            userDataInput: {
                username: "",
                email: "",
                phonenumber: "",
                password: ""
            },
            toasts: {
                title: "",
                msg: "",
                type: "",
                duration: 0
            }
        }
    },
    methods: {
        toast,
        async createUser() {
            try {
                if (this.userDataInput.email == '' || this.userDataInput.password == '' || this.userDataInput.phonenumber == '' || this.userDataInput.email == '') {
                    this.toasts.title = "Thất bại",
                        this.toasts.msg = "Chưa điền đầy đủ thông tin !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                    }, 1000)
                }
                else {
                    console.log(this.userDataInput)
                    await AuthService.createregister(this.userDataInput);
                    this.toasts.title = "Thành công",
                        this.toasts.msg = "Đăng Ký Thành Công !"
                    this.toasts.type = "success",
                        this.toasts.duration = 2000
                    document.querySelector("#toast").style.display = 'block'
                    this.toast();
                    setTimeout(() => {
                        document.querySelector("#toast").style.display = 'none'
                        this.$router.push({ name: "Login" });
                    }, 2000)
                }
            } catch (err) {
                console.log(err)
                this.toasts.title = "Thất bại",
                    this.toasts.msg = "Đăng kí tài khoản thất bại !"
                this.toasts.type = "error",
                    this.toasts.duration = 2000
                document.querySelector("#toast").style.display = 'block'
                this.toast()
                setTimeout(() => {
                    document.querySelector("#toast").style.display = 'none'
                }, 700)
            }
        }
    }
};

</script>


<template>
    <ToastVue></ToastVue>
    <Form :validation-schema="Registerform" @submit.prevent>
        <!-- UserName Input -->
        <div class="mb-3">
            <label for="inputUserName" class="form-label fw-bold">Tên đầy đủ: </label>
            <Field id="inputUserName" placeholder="Nhập vào tên đầy đủ" name="username" type="text"
                class="form-control form-control-lg" v-model="userDataInput.username" required />
            <ErrorMessage name="username" class="text-danger" />
        </div>

        <!-- Email Input -->
        <div class="mb-3">
            <label for="email" class="form-label fw-bold">Email: </label>
            <Field id="email" placeholder="Vui lòng nhập vào Email" name="email" type="email"
                class="form-control form-control-lg" v-model="userDataInput.email" required />
            <ErrorMessage name="email" class="text-danger" />
        </div>

        <!-- PhoneNumber Input -->
        <div class="mb-3">
            <label for="inputphonenumber" class="form-label fw-bold">Số điện thoại: </label>
            <Field id="inputphonenumber" placeholder="Vui lòng nhập vào số điện thoại" name="phonenumber" type="text"
                class="form-control form-control-lg" v-model="userDataInput.phonenumber" required />
            <ErrorMessage name="phonenumber" class="text-danger" />
        </div>


        <!-- Password Input -->
        <div class="mb-3">
            <label for="password" class="form-label fw-bold">Mật khẩu: </label>
            <Field id="password" placeholder="Vui lòng nhập vào mật khẩu" name="password" type="password"
                class="form-control form-control-lg" v-model="userDataInput.password" required />
            <ErrorMessage name="password" class="text-danger" />
        </div>
        <button type="submit" class="btn btn-light fw-bold" style="padding: 10px;;border:1px solid #ccc"
            @click="createUser()">Xác Nhận</button>
        <p class="mt-4">Nếu đã có tài khoản. Hãy nhấn vào
            <router-link to="/login" class="link-danger">Đăng Nhập
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