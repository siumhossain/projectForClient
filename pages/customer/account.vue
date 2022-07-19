<template>
    <div>
        <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>My Account</h5>
                            <ul>
                                <li><nuxt-link to="/">Home </nuxt-link></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>My Account</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="customer-profile">
            <div class="container-fluid">
                <div class="row">
                    <div class="paddleft-120 col-lg-12 col-md-12 col-sm-4">
                        <div class="customer-profile">
                            <div class="row">
                                <div class="col-lg-3 col-sm-3 col-md-3">
                                    <div class="cprofile-sidebar">
                                        <sidebar></sidebar>
                                    </div>
                                </div>
                                <!-- col end -->
                                <div class="col-lg-9 col-md-9 col-sm-9">
                                    <div class="cprofile-details">
                                        <p class="account-title">Account Information</p>
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Information</th>
                                                    <th scope="col">
                                                        <nuxt-link to="/customer/editprofile" class="anchor"><i class="fa fa-edit"></i> Edit</nuxt-link>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Image</th>
                                                    <td><img :src="$config.baseURL+customer.image" alt="" style="width: 50px; height: 50px; border-radius: 50%;" /></td>
                                                </tr>
                                                <tr></tr>
                                                <tr>
                                                    <th scope="row">Name</th>
                                                    <td>{{customer.name}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Phone</th>
                                                    <td>{{customer.mobile}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    <td>{{customer.email}}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Address</th>
                                                    <td>{{customer.address_line_1}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import sidebar from "./sidebar";
    export default {
        middleware: 'authenticated',
        components: {
            sidebar,
        },
        data() {
            return {
                customer: {},
            };
        },
        methods: {
            loadData() {
                this.$axios.get("/api/v1/customer/account", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    this.customer = response.data.customer;
                });
            },
        },
        mounted() {
            this.loadData();
           
        },
    };
</script>
