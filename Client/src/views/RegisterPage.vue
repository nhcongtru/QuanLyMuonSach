<script>
import FormRegister from "../components/FormRegister.vue"
export default {
    components: {
        FormRegister,
    },
};
</script>

<template>
    <div class="container">
        <h2 style="margin-top: 50px;margin-bottom:50px; margin-left: 119px;text-align:center;background-color:#000000 ;padding:10px;border-radius:10px;color:white;width:1055px;">ĐĂNG KÝ</h2>
        <div class="h-100">
            <div class="container-fluid h-custom">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5" style="border-right:1px solid #ccc">
                        <img src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                            class="img-fluid" alt="Sample image">
                    </div>

                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <FormRegister></FormRegister>   
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>