<template>
    <div>
        <section class="breadcrumb">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="breadcrumb-text">
                            <h5>Checkout</h5>
                            <ul>
                                <li><nuxt-link to="/">Home </nuxt-link></li>
                                <li>
                                    <a><i class="fas fa-angle-double-right"></i> </a>
                                </li>
                                <li><a>Checkout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--custom breadcrumb end-->
        <section class="section-padding">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="login-content payment-form1">
                            <h2 class="login-title"><strong>Shipping Address</strong></h2>
                            <div class="accordion productdetails mobile-payment" id="accordionExample">
                                <div class="card">
                                    <div class="card-header" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true">
                                        <span class="title">Cart Details</span>
                                        <span class="accicon"><i class="fas fa-angle-down rotate-icon"></i></span>
                                    </div>
                                    <div id="collapseOne" class="collapse" data-parent="#accordionExample">
                                        <div class="mobile-payment table-cart">
                                            <table class="table table-bordered">
                                                <tr>
                                                    <td>SubTotal ({{cartItemCount}}) items</td>
                                                    <td>{{cartTotalPrice}} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount (-)</td>
                                                    <td>{{discount?discount:0}} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Delivery Charge (+)</td>
                                                    <td>{{shippingfee?shippingfee:0}} Tk</td>
                                                </tr>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>{{Number(cartTotalPrice)+Number(shippingfee) - discount}} Tk</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="showcart-item" v-for="item in cart" :key="item.product.id">
                                            <div class="row">
                                                <div class="col-sm-8 col-8">
                                                    <div class="cart-info">
                                                        <div class="row">
                                                            <div class="col-sm-3 col-3">
                                                                <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image" alt="" />
                                                            </div>
                                                            <div class="col-sm-9 col-9">
                                                                <h6>{{item.product.name}}</h6>
                                                                <p v-if="item.product_size">Size: {{item.product_size}}</p>
                                                                <p>Tk {{Math.round(item.product.variation.default_sell_price)}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-sm-4 col-4">
                                                    <div class="cart-action">
                                                        <div>
                                                            <h6>Tk {{item.product.variation.default_sell_price*item.quantity}}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form @submit.prevent="checkout">
                                <div class="shipping-info">
                                    <div class="form-group">
                                        <input
                                            type="text"
                                            class="form-control"
                                            :class="nameinvalid? 'invalidfield':'' "
                                            v-on:keyup="validOrnot()"
                                            placeholder="Your Name*"
                                            name="fullName"
                                            v-model="checkoutForm.fullName=customer.name"
                                            id="fullName" required
                                        />
                                        <div v-if="checkoutForm.errors.has('fullName')" v-html="checkoutForm.errors.get('fullName')" />
                                    </div>
                                    <div class="form-group">
                                        <input
                                            type="number"
                                            class="form-control"
                                            :class="phoneinvalid? 'invalidfield':'' "
                                            v-on:keyup="validOrnot()"
                                            placeholder="Your 11 digit phone Number*"
                                            v-model="checkoutForm.phoneNumber=customer.mobile"
                                            name="phoneNumber"
                                            id="phoneNumber" required
                                        />
                                        <div v-if="checkoutForm.errors.has('phoneNumber')" v-html="checkoutForm.errors.get('phoneNumber')" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text"
                                            :class="addressinvalid? 'invalidfield':'' " v-on:keyup="validOrnot()" class="form-control" name="address"
                                            v-model="checkoutForm.address=customer.address_line_1"
                                            id="address"
                                            placeholder="জেলা , থানা এবং উপজেলার নাম।  বাসা নং, রোড নং, এলাকার নাম *" required
                                        />
                                        <div v-if="checkoutForm.errors.has('address')" v-html="checkoutForm.errors.get('address')" />
                                    </div>

                                    <div class="form-group">
                                        <input type="text" v-model="checkoutForm.note" class="form-control" name="note" id="note" placeholder="Note"/>
                                    </div>
                                    <div class="form-group">
                                        <span v-for="area in areas" :for="'area'+area.id" :key="area.id" class="area-radio"><input type="radio" :value="area.id" :id="'area'+area.id" v-on:change="validOrnot()" :class="areainvalid? 'invalidfield':''" v-model="checkoutForm.area"  @change="selectarea()" required><label :for="'area'+area.id">{{area.area}}</label></span>
                                        
                                        <div v-if="checkoutForm.errors.has('area')" v-html="checkoutForm.errors.get('area')" />
                                    </div>
                                    <div class="form-group">
                                        <strong>Payment Method</strong>
                                        <span  for="bkash-payment" class="area-radio payment-method"><input type="radio" value="bkash" id="bkash-payment" v-on:change="validOrnot()" :class="areainvalid? 'invalidfield':''" v-model="checkoutForm.bkash" required><label for="bkash-payment"><img src="~/assets/images/bkash.png" alt=""></label></span>
                                        
                                        <div v-if="checkoutForm.errors.has('bkash')" v-html="checkoutForm.errors.get('bkash')" />
                                    </div>
                                   <p><strong>Your partial payment is : {{partialpayment}} Tk</strong></p>
                                    <div class="form-group">
                                        <button class="btn checkout-btn">
                                            Submit Order
                                            <div v-if="spinner" class="spinner-border spinner-border-sm"></div>
                                        </button>
                                    </div>
                                </div>
                            </form>

                               <!--  <button class="btn btn-success m-2" id="bKash_button" @click="BkashPayment()">
                                Pay with bKash
                            </button> -->
                        </div>
                        <!--login content end-->
                    </div>
                    <!-- col end -->
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="cart-checkout desktop-payment">
                            <h2>Cart Summary</h2>
                            <div class="cart-summary payment_details">
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Sub Total Cost (Qty {{cartItemCount}} Items)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{cartTotalPrice}} Tk</p>
                                    </div>
                                </div>
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Discount (-)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{discount?discount:0}} Tk</p>
                                    </div>
                                </div>
                                <div class="row row-border-bottom">
                                    <div class="col-sm-7">
                                        <p>Delivery Charge (+)</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{shippingfee?shippingfee:0}} Tk</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-7">
                                        <p>Total</p>
                                    </div>
                                    <div class="col-sm-5">
                                        <p class="text-right">{{Number(cartTotalPrice)+Number(shippingfee) - discount}} Tk</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cart-checkout my-4 desktop-payment">
                            <h2>Cart Details</h2>
                            <div class="show-cart-body">
                                <div class="showcart-item" v-for="item in cart" :key="item.product.id">
                                    <div class="row">
                                        <div class="col-sm-8 col-8">
                                            <div class="cart-info">
                                                <div class="row">
                                                    <div class="col-sm-3 col-3">
                                                        <img :src="'https://pos.girlsontop.com.bd/public/uploads/img/' + item.product.image" alt="" />
                                                    </div>
                                                    <div class="col-sm-9 col-9">
                                                        <h6>{{item.product.name}}</h6>
                                                        <p v-if="item.product_size">Size: {{item.product_size}}</p>
                                                        <p>Tk {{Math.round(item.price)}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4 col-4">
                                            <div class="cart-action">
                                                <div>
                                                    <h6>Tk {{item.product.variation.default_sell_price*item.quantity}}</h6>
                                                </div>
                                            </div>
                                        </div>
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
    import Form from "vform";
    export default {
        head: {
            script: [
              {
                src:"https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js",
              },
            ],
          },
        middleware: 'authenticated',
        data: () => ({
            couponForm: new Form({
                couponcode: "",
            }),
            checkoutForm: new Form({
                fullName: "",
                phoneNumber: "",
                area: "",
                courier: "",
                address: "",
                note: "",
                transaction_id: "",
                sender_number: "",
            }),
            areas: {},
            alertcontent: {},
            submitted: false,
            customer: {},
            nameinvalid: "",
            phoneinvalid: "",
            addressinvalid: "",
            areainvalid: "",
            bpernumber: "",
            spinner: false,
        }),
        methods: {
            validOrnot() {
                this.checkoutForm.fullName != "" ? (this.nameinvalid = false) : (this.nameinvalid = true);
                this.checkoutForm.phoneNumber != "" ? (this.phoneinvalid = false) : (this.phoneinvalid = true);
                this.checkoutForm.address != "" ? (this.addressinvalid = false) : (this.addressinvalid = true);
                this.checkoutForm.area != "" ? (this.areainvalid = false) : (this.areainvalid = true);
            },
            loadData() {
                let area_id = "checkout";
                this.$axios.get("api/v1/customer/alert/" + area_id).then((response) => {
                    this.alertcontent = response.data.alertcontent;
                });
                this.$axios.get("api/v1/areas").then((response) => {
                    this.areas = response.data.areas;
                });
                this.$axios.get("/api/v1/customer/account", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        this.customer = response.data.customer;
                    });
            },
            processToPayment() {
                if(
                    this.checkoutForm.fullName != "" &&
                    this.checkoutForm.phoneNumber != "" &&
                    this.checkoutForm.area != "" &&
                    this.checkoutForm.address != "" &&
                    this.checkoutForm.phoneNumber.length == 11
                ) {
                    this.invalid = false;
                    let area = this.checkoutForm.area;
                    if (this.cartItemCount > 0) {
                        if (area == 1) {
                            let partialpayment = 200 * this.$store.getters.cartItemCount;
                            localStorage.setItem("partialpayment", partialpayment);
                            this.$store.dispatch("partialpayment");
                        } else {
                            let partialpayment = 500 * this.$store.getters.cartItemCount;
                            localStorage.setItem("partialpayment", partialpayment);
                            this.$store.dispatch("partialpayment");
                        }
                    } else {
                        this.$router.push({ path: "/" });
                        localStorage.removeItem("shippingfee");
                        localStorage.removeItem("discount");
                        localStorage.removeItem("partialpayment");
                        localStorage.removeItem("paymentcharge");
                        this.$store.dispatch("discount");
                        this.$store.dispatch("shippingfee");
                        this.$store.dispatch("getCartitems");
                        this.$store.dispatch("partialpayment");
                        this.$toast.error( "Your shopping cart empty");
                    }
                } else {
                    this.invalid = true;
                    this.$toast.error("Please carefully fill up * mark field.");
                }
            },
            selectarea() {
                this.$axios.get("/api/v1/shippingfee/" + this.checkoutForm.area).then((response) => {
                    if (this.cartItemCount > 0) {
                        let shippingfee = response.data.shippingfee.shippingfee;
                        localStorage.setItem("shippingfee", shippingfee);
                        this.$store.dispatch("shippingfee");
                        let area = this.checkoutForm.area;
                        if (area == 1) {
                            let partialpayment = 200 * this.$store.getters.cartItemCount;
                            localStorage.setItem("partialpayment", partialpayment);
                            this.$store.dispatch("partialpayment");
                            $(".sundarban").addClass("hide");
                            this.checkoutForm.courier = "";
                        } else {
                            let partialpayment = 500 * this.$store.getters.cartItemCount;
                            localStorage.setItem("partialpayment", partialpayment);
                            this.$store.dispatch("partialpayment");
                            $(".sundarban").removeClass("hide");
                            this.checkoutForm.courier = "";
                        }
                        let paymentcharge = (this.partialpayment * 15) / 1000;
                        localStorage.setItem("paymentcharge", paymentcharge);
                        this.$store.dispatch("paymentcharge");
                    } else {
                        this.$router.push({ path: "/" });
                        localStorage.removeItem("shippingfee");
                        localStorage.removeItem("discount");
                        localStorage.removeItem("partialpayment");
                        localStorage.removeItem("paymentcharge");
                        this.$store.dispatch("discount");
                        this.$store.dispatch("shippingfee");
                        this.$store.dispatch("getCartitems");
                        this.$store.dispatch("partialpayment");
                        this.$toast.error("Your shopping cart empty");
                    }
                });
            },
            async checkout() {
                if (this.$store.state.token && this.cartItemCount > 0) {
                    this.spinner = true;
                    const response = await this.$axios
                        .post("/api/v1/customer/order/save",this.checkoutForm, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token"),
                                shippingfee: this.$store.state.shippingfee,
                                discount: this.$store.state.discount,
                                partialpayment: this.$store.state.partialpayment,
                                paymentcharge: this.$store.state.paymentcharge,
                            },
                        })
                        .then((response) => {
                            if (response.data.status == "success") {
                                this.$toast.success(
                                        'Thanks!! Your order send success',
                                );
                                this.spinner = false;
                                localStorage.removeItem("shippingfee");
                                localStorage.removeItem("discount");
                                localStorage.removeItem("partialpayment");
                                localStorage.removeItem("paymentcharge");

                                this.$store.dispatch("discount");
                                this.$store.dispatch("shippingfee");
                                this.$store.dispatch("getCartitems");
                                this.$store.dispatch("partialpayment");
                                this.$router.push({ path: "/customer/order-success/"+response.data.transection.invoice_no});
                            } else if (response.data.status == "invalid") {
                                this.spinner = false;
                                this.$toast.error( "Please check input field");
                            } else {
                                this.$toast.error("Order place failed");
                            }
                        });
                } else {
                    this.$router.push({ path: "/customer/login" });
                }
            },
            async coupon() {
                const response = await this.couponForm
                    .post("/api/v1/customer/coupon-apply", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                            cartamount: this.cartTotalPrice,
                        },
                    })
                    .then((response) => {
                        if (response.data.status == "success") {
                            let discount = response.data.amount;
                            localStorage.setItem("discount", discount);
                            this.$store.dispatch("discount");
                            this.$toast.success( "Your coupon code accept");
                        } else if (response.data.status == "expaire") {
                            this.$toast.error("Your coupon code expaire");
                        } else if (response.data.status == "lowamount") {
                            this.$toast.error("Your purchase amount is low");
                        } else {
                            this.$toast.error("Your coupon code is invalid");
                        }
                    });
            },
            async BkashPayment() {
                const response = await this.$axios.post("api/bkash/get-token").then((response) => {
                        if (response.data.msg) {
                            this.showErrorMessage(response.data); // unknown error
                        }
                        localStorage.setItem("bkash_token", response.data.bkash_token);
                        this.createPayment(response.data);
                }).catch((err) => {
                     this.showErrorMessage(err);
                  });
                // showLoading();
            },
            createPayment(request){
                let bkash_token = localStorage.getItem("bkash_token");
                let amount = '510';
                const response =  this.$axios.post('api/bkash/create-payment?bkash_token='+bkash_token+'&amount='+amount).then((response) => {
                    console.log('createdpayment', response.data);
                    if (response.data && response.data.paymentID != null) {
                        let paymentID = response.data.paymentID;
                        // bKash.create().onSuccess(response.data);
                        this.exicutePayment(response.data.paymentID);
                    } else {
                        bKash.create().onError();
                    }
                }).catch((err) => {
                    console.log(err);
                    // showErrorMessage(err);
                    // bKash.create().onError();
                  }); 
            },
            exicutePayment(paymentInfo){
                let paymentID = paymentInfo;
                let bkash_token  = localStorage.getItem("bkash_token");
               const response =  this.$axios.post('api/bkash/execute-payment?bkash_token='+bkash_token+'&paymentID='+paymentID,{
                    headers: {
                        paymentID: paymentID,
                    },
                }).then((response) => {
                    if (response.data) {
                        console.log('payment',response.data);
                        if (response.data.paymentID != null) {
                             console.log('response exicute in success');
                            BkashSuccess(response.data);
                        } else {
                            this.showErrorMessage(response.data);
                            bKash.execute().onError();
                        }
                    } else {
                        console.log('not data');
                    }
                }).catch((err) => {
                     this.showErrorMessage(err);
                }); 
            },
            BkashSuccess(data){
                console.log('bkash success',data);
               const response =  this.$axios.post('api/bkash/success?payment_info='+data).then((response) => {
                    console.log('payment success');
                     location.reload()
                })
            },
            showErrorMessage(response) {
                console.log('bkash default error',response);
            }

        },
        mounted() {
            this.$store.dispatch("shippingfee");
            this.$store.dispatch("discount");
            this.$store.dispatch("getCartitems");
            this.$store.dispatch("partialpayment");
            this.validOrnot();
            this.loadData();
        },
        computed: {
            cart() {
                return this.$store.state.cart;
            },
            cartItemCount() {
                return this.$store.getters.cartItemCount;
            },
            cartTotalPrice() {
                return this.$store.getters.cartTotalPrice;
            },
            shippingfee() {
                return this.$store.state.shippingfee;
            },
            discount() {
                return this.$store.state.discount;
            },
            partialpayment() {
                return this.$store.state.partialpayment;
            },
            paymentcharge() {
                return this.$store.state.paymentcharge;
            },
        },
    };
</script>
