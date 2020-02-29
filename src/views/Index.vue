<template>
  <div id="index">
    <!-- tilte -->
    <div class="title" :style="{backgroundImage:'url('+seller.avatar+')'}">
      <div class="rgba">
        <div class="box">
          <img :src="seller.avatar" alt="" class="img">
          <div>
            <h3><img src="../assets/imges/brand@2x.png" alt="">{{seller.name}}</h3>
            <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
            <p><img src="../assets/imges/decrease_1@2x.png" alt="">{{seller.description2}}</p>
          </div>
        </div>
        <div class="bulletin"> <img src="../assets/imges/bulletin@3x.png" alt="">
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
    </div>
    <!-- nav -->
    <div class="nav">
      <router-link to='/goods' class="router-link">商品</router-link>
      <router-link to="evaluat" class="router-link">评价</router-link>
      <router-link to="shop" class="router-link">商家</router-link>
    </div>
    <!-- 二级路由容器 -->
    <router-view></router-view>
    <div class="writebox">
    </div>
    <!-- shopCar -->
    <div class="shopCar">
      <!-- car -->
      <div class="car">
        <p>
          <img src="../assets/imges/shopcar.png" alt="">
        </p>
      </div>
      <!-- price -->
      <strong>￥{{allprice}}</strong>
      <p class="p">另需配送费4元</p>
      <p class="last">￥20起送</p>
    </div>
  </div>
</template>

<script>
import { getseller } from '../../api/apis'
export default {
  data () {
    return {
      seller: {
        name: '',
        avatar: '',
        description: '',
        deliveryTime: '',
        supports: [],
        bulletin: '',
        description2: '',
      },
      allprice: 0,
    }
  },
  created () {
    getseller().then((res) => {
      this.seller.name = res.data.data.name;
      this.seller.avatar = res.data.data.avatar;
      this.seller.description = res.data.data.description;
      this.seller.deliveryTime = res.data.data.deliveryTime;
      this.seller.supports = res.data.data.supports;
      this.seller.bulletin = res.data.data.bulletin;
      this.seller.description2 = this.seller.supports[0].description
      console.log(this.seller.supports)
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
    display: flex;
    justify-content: space-around;
    .router-link {
      text-decoration: none;
      font-size: 14px;
      line-height: 30px;
      &:link {
        color: red;
      }
    }
  }
  .shopCar {
    position: fixed;
    width: 100%;
    height: 60px;
    bottom: 0;
    background-color: #131d26;
    z-index: 2;
    display: flex;
    align-items: center;
    color: #8f8f97;
    justify-content: space-between;
    .car {
      margin-left: 5px;
      width: 70px;
      height: 70px;
      border-radius: 42px;
      background-color: #131d26;
      margin-top: -20px;
      padding: 10px;
      p {
        margin: 0;
        background-color: #2b343d;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        text-align: center;
        img {
          vertical-align: middle;
          margin-top: 10px;
        }
      }
    }
    strong {
      font-size: 28px;
    }
    .p {
      padding-left: 10px;
      border-left: 1px solid #8f8f97;
      margin-left: 10px;
      font-size: 14px;
      padding-right: 10px;
    }
    .last {
      background-color: #2b343b;
      line-height: 60px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      width: 90px;
    }
  }
  .writebox {
    height: 60px;
  }
}
</style>>
