<template>
    <div>
        <section class="breadcrumb" >
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>My Order</h5>
                            <ul>
                                <li><nuxt-link to="/">Home </nuxt-link></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>My Order</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- breadcrumt -->
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
                                        <p class="account-title">My Order</p>
                                        <table class="table table-bordered">
                                            <thead class="text-white">
                                                <tr>
                                                    <td>ID</td>
                                                    <td>Invoice</td>
                                                    <td>Date</td>
                                                    <td>Total Price</td>
                                                    <td>Status</td>
                                                    <td>Details</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(order,index) in orders">
                                                    <td>{{index + 1}}</td>
                                                    <td>{{order.invoice_no}}</td>
                                                    <td>{{order.transaction_date}}</td>
                                                    <td>{{Math.round(order.final_total)}} Tk</td>
                                                    <td class="text-capitalize">{{order.shipping_status}}</td>
                                                    <td>
                                                        <nuxt-link :to="'/customer/order-invoice/'+ order.id" class="btn btn-success"><i class="fa fa-eye"></i></nuxt-link>
                                                    </td>
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
                orders: [],
            };
        },
        methods: {
            loadData() {
                this.$axios.get("/api/v1/customer/order", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        this.orders = response.data.orders;
                    });
            },
        },
        mounted() {
            this.loadData();
        },
        deactivated() {
           this.$destroy();
          },
    };
</script>
