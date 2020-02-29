<template>
  <div id="shop">
    <div class="title2">
      <!-- top -->
      <div class="div">
        <!-- left -->
        <div class="title2box">
          <h4 class="name">{{seller.name}}</h4>
          <p>
            <img src="../assets/imges/star24_on@2x.png" alt="" v-for="(v) in Math.floor(seller.score)" :key="v">
            <img src="../assets/imges/star24_half@2x.png" v-show="seller.score%1!=0">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="seller.score==1" v-for="(va0) in (num-1)" :key="va0.n">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="seller.score==2" v-for="(val) in (num-2)" :key="val.n">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="seller.score==3" v-for="(va2) in (num-3)" :key="va2.n">
            <img src="../assets/imges/star24_off@2x.png" alt="" v-show="seller.score==4" v-for="(va3) in (num-4)" :key="va3.n">
            <span>({{seller.data.ratingCount}})</span>
            <span>月售{{seller.data.sellCount}}单</span>
            <span></span>
          </p>
        </div>
        <!-- right -->
        <div class="rightbox">
          <img src="" alt="">
          <p>已收藏</p>
        </div>
      </div>
      <!-- bottom -->
      <div class="bottom">
        <div>
          <p>起送价</p>
          <strong>{{seller.data.minPrice}}<span>元</span></strong>
        </div>
        <div class="division">|</div>
        <div>
          <p>商家配送</p>
          <strong>{{seller.data.deliveryPrice}}<span>元</span></strong>
        </div>
        <div class="division">|</div>

        <div>
          <p>平均配送时间</p>
          <strong>{{seller.data.deliveryTime}}<span>分钟</span></strong>
        </div>
      </div>
    </div>
    <!-- 分割 -->
    <div class="divisionbox"></div>
    <!-- 公告 -->
    <div class="notice">
      <h3>公告活动</h3>
      <p>{{seller.data.bulletin}}</p>
      <p class="supports" v-for="(v,i) in seller.data.supports" :key="i">
        <img src="../assets/imges/decrease_1@2x.png" v-show="v.type==0">
        <img src="../assets/imges/discount_1@2x.png" v-show="v.type==1">
        <img src="../assets/imges/special_1@2x.png" v-show="v.type==2">
        {{v.description}}
      </p>
    </div>
    <!-- 分割 -->
    <div class="divisionbox"></div>
    <!-- 商家实景 -->
    <div class="scene">
      <h3>商家实景</h3>
      <p>
        <img :src="v" alt="" v-for="(v,i) in seller.data.pics" :key="i">
      </p>
    </div>
    <!-- 分割 -->
    <div class="divisionbox"></div>
    <!-- 商家信息 -->
    <div class="msg">
      <h3>商家信息</h3>
      <div v-for="item in seller.data.infos" :key="item.id">
        {{ item }}
      </div>
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
        score: 0,
        data: '',
      },
      allprice: 0,
      num: 5,
    }
  },
  created () {
    getseller().then((res) => {
      this.seller.data = res.data.data;
      this.seller.name = res.data.data.name;
      this.seller.score = res.data.data.score;
      this.seller.avatar = res.data.data.avatar;
      this.seller.description = res.data.data.description;
      this.seller.deliveryTime = res.data.data.deliveryTime;
      this.seller.supports = res.data.data.supports;
      this.seller.bulletin = res.data.data.bulletin;
      this.seller.description2 = this.seller.supports[0].description
      console.log(this.seller.data)
    });
    if (this.seller.score % 1 != 0) {
      this.num = 4;
    }
  },
}
</script>

<style lang="less">
#shop {
  overflow: auto;
  flex: 1;
  border-top: 1px solid #dadde2;
  .title2 {
    padding: 20px;
    .div {
      border-bottom: 1px solid #dadde2;
      padding-bottom: 20px;
      display: flex;
      justify-content: space-between;
      .title2box {
        h4 {
          margin: 0;
        }
        p {
          margin: 0;
          img {
            width: 14px;
            margin-right: 5px;
            vertical-align: middle;
          }
          span {
            font-size: 12px;
            display: inline-block;
            margin-right: 10px;
            color: #4f5458;
          }
        }
      }
      .rightbox {
        p {
          margin: 0;
          color: #4f5458;
          font-size: 12px;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-around;
      padding-top: 20px;
      .division {
        font-size: 40px;
        color: #4f5458;
      }
      div {
        p {
          color: #4f5458;
          font-size: 12px;
          margin: 0;
        }
        strong {
          font-size: 28px;
          font-weight: normal;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  .divisionbox {
    height: 20px;
    border-bottom: 1px solid #dadde2;
    border-top: 1px solid #dadde2;
    background-color: #f4f5f7;
  }
  .notice {
    padding: 20px;
    h3 {
      margin: 0;
    }
    p {
      color: #fd4647;
      margin: 0;
      padding-left: 1em;
      line-height: 26px;
      font-size: 12px;
      padding-bottom: 15px;
    }
    .supports {
      color: #474d52;
      border-top: 1px solid #dadde2;
      padding-top: 15px;
      img {
        width: 18px;
        vertical-align: middle;
      }
    }
  }
  .scene {
    padding: 20px;
    h3 {
      margin: 0;
    }
    p {
      display: flex;
      justify-content: space-around;
      img {
        width: 75px;
        height: 75px;
      }
    }
  }
  .msg {
    padding: 20px;
    h3 {
      margin: 0;
      margin-bottom: 15px;
    }
    div {
      padding-left: 1em;
      font-size: 12px;
      color: #474d52;
      border-top: 1px solid #dadde2;
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
}
</style>