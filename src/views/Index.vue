<template>
  <div id="index">
    <!-- tilte -->
    <div class="title" :style="{backgroundImage:'url('+shopData.avatar+')'}">
      <div class="rgba">
        <div class="box">
          <img :src="shopData.avatar" alt="" class="img">
          <div>
            <h3><img src="../assets/imges/brand@2x.png" alt="">{{shopData.name}}</h3>
            <p>{{shopData.description}}/{{shopData.deliveryTime}}分钟送达</p>
            <p><img src="../assets/imges/decrease_1@2x.png" alt="">{{seller.description2}}</p>
          </div>
        </div>
        <div class="bulletin"> <img src="../assets/imges/bulletin@3x.png" alt="">
          <p>{{shopData.bulletin}}</p>
        </div>
      </div>
    </div>
    <!-- nav -->
    <div class="nav">
      <router-link to='/' :class="{routerLink:true,red:num==0}"><span @click="changecolor(0)">商品</span></router-link>
      <router-link to="evaluat" :class="{routerLink:true,red:num==1}"><span @click="changecolor(1)">评价</span></router-link>
      <router-link to="shop" :class="{routerLink:true,red:num==2}"><span @click="changecolor(2)">商家</span></router-link>
    </div>
    <!-- 二级路由容器 -->
    <router-view></router-view>
    <div class="writebox">
    </div>

    <!-- shopCar -->
    <div class="shopCar" @click="show1">
      <!-- car -->
      <div class="car">
        <p>
          <img src="../assets/imges/shopcar.png" alt="">
        </p>
      </div>
      <!-- price -->
      <strong>￥{{totalPrice}}</strong>
      <p class="p">另需配送费{{shopData.deliveryPrice}}元</p>
      <p class="last">￥{{shopData.minPrice}}起送</p>
    </div>
  </div>
</template>

<script>
import { getseller } from '../../api/apis'
export default {
  data () {
    return {
      seller: {
        description2: '',
      },
      num: 0,
    }
  },
  computed: {
    show () {
      return this.$store.state.show;
    },
    shopData () {
      return this.$store.state.shopData;
    },
    totalPrice () {
      return this.$store.getters.totalPrice;
    }
  },
  methods: {
    changecolor (n) {
      this.num = n;

    },
    show1 () {
      location.href = '#/'
      this.$store.commit('changeshow', !this.show)
    }
  },
  created () {
    location.hash == '#/' ? this.num = 0 : '';
    location.hash == '#/evaluat' ? this.num = 1 : '';
    location.hash == '#/shop' ? this.num = 2 : '';
    console.log(location.hash)
    getseller().then((res) => {
      var shopData = res.data.data;
      this.$store.commit('shopData', shopData);
      this.seller.description2 = shopData.supports[0].description;
    })
  },
}
</script>

<style lang="less">
#index {
  height: 100%;
  display: flex;
  flex-direction: column;
  .title {
    height: 130px;
    background-size: cover;
    background-position: center;
    font-size: 14px;
    color: #ece7e1;
    position: relative;
    .rgba {
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .box {
      display: flex;
      padding: 20px 0 0 20px;
    }
    .bulletin {
      position: absolute;
      bottom: 0;
      display: flex;
      width: 97%;
      padding: 5px;
      background-color: rgba(0, 0, 0, 0.5);
      left: 0;
      img {
        vertical-align: middle;
        height: 14px;
        margin: 2px;
      }
      p {
        display: inline-block;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }
    }
    .img {
      width: 70px;
      height: 70px;
      margin-right: 10px;
    }
    p {
      img {
        width: 16px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    p,
    h3 {
      margin: 5px;
    }
    h3 {
      margin-top: 0;
      img {
        vertical-align: middle;
        width: 38px;
        margin-right: 5px;
      }
    }
  }
  .nav {
    border-bottom: 1px solid #8f8f97;
    display: flex;
    justify-content: space-around;
    .routerLink {
      text-decoration: none;
      font-size: 14px;
      line-height: 30px;
      &:link {
        color: red;
      }
    }
    .red {
      color: red;
    }
  }
  .shopCar {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    background-color: #131d26;
    z-index: 2;
    display: flex;
    align-items: center;
    color: #8f8f97;
    justify-content: space-between;

    .car {
      margin-left: 5px;
      width: 50px;
      height: 50px;
      border-radius: 35px;
      background-color: #131d26;
      margin-top: -10px;
      padding: 10px;
      p {
        margin: auto;
        background-color: #2b343d;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        text-align: center;
        img {
          vertical-align: middle;
          margin-top: 12px;
          width: 30px;
        }
      }
    }
    strong {
      font-size: 22px;
      margin-left: -20px;
    }
    .p {
      padding-left: 10px;
      border-left: 1px solid #8f8f97;
      margin-left: 10px;
      font-size: 12px;
      padding-right: 10px;
    }
    .last {
      background-color: #2b343b;
      line-height: 50px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      width: 90px;
      margin: 0;
    }
  }
  .writebox {
    height: 60px;
  }
}
</style>
