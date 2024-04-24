<script>
import FormLogin from "../components/FormLogin.vue"
export default {
    components: {
        FormLogin,
    },
};
</script>

<template>
    <div class="container">
        <h2 style="margin-top: 50px;margin-bottom:50px; margin-left: 119px;text-align:center;background-color:#000000 ;padding:10px;border-radius:10px;color:white;width:1055px;">ĐĂNG NHẬP</h2>
        <div class="h-100">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5" style="border-right:1px solid #ccc">
                        <img src="https://img1.kienthucvui.vn/uploads/2021/05/28/anh-thu-vien-dep_104915255.jpg" class="img-fluid" alt="Sample image">
                    </div>
            
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <FormLogin></FormLogin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>