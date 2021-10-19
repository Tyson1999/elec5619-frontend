<template>
  <div class="container">
    <div class="title">
      Join and support {{artist}}
    </div>
    <div class="support-detail">
      <div class="flex">
        <div class="bg-container">
          <div class="bg" :style="{backgroundImage: 'url' + '(' + bg + ')'}"></div>
        </div>
        <div class="info">
          <div class="flex">
            <div class="avatar" :style="{backgroundImage: 'url' + '(' + avatar + ')'}"></div>
            <div class="name">{{artist}}</div>
          </div>
          <div class="price" style="display: flex; justify-content: center;">
            <div>
              Payment amount: <br>
              <span style="font-weight: bold; font-size: 18px">${{price}}/month</span>
            </div>
          </div>
        </div>
      </div>
      <div class="payment">
        <div class="selection-title">Select a payment method</div>
        <div class="payment-method">
          <div class="payment-method-item paypal"
               :class="{selected: paymentMethod == 1, unselected: paymentMethod != 1}"
               @click="changePaymentMethod(1)"
          >
            <div class="gateway">
              Check out by Paypal
              <div style="maxWidth: 200px; display: flex; align-items: center;">
                <div class="el-icon-success"
                     :style="{color: paymentMethod == 1 ?'#409EFF' : '#ccc', fontSize: '20px'}"
                />
                <div class="pp-img"></div>
              </div>
            </div>
          </div>
          <div class="payment-method-item credit-card"
               :class="{selected: paymentMethod == 2, unselected: paymentMethod != 2}"
               @click="changePaymentMethod(2)"
          >
            <div class="gateway">
              Check out by credit card
              <div style="maxWidth: 200px; display: flex; align-items: center;">
                <div class="el-icon-success"
                     :style="{color: paymentMethod == 2 ?'#409EFF' : '#ccc', fontSize: '20px'}"
                />
                <div class="credit-card-img"></div>
              </div>
            </div>
          </div>
          <div class="payment-method-item balance"
               :class="{selected: paymentMethod == 3, unselected: paymentMethod != 3}"
               @click="changePaymentMethod(3)"
          >
            <div class="gateway">
              Check out by account balance
              <div style="maxWidth: 200px; display: flex; align-items: center;">
                <div class="el-icon-success"
                     :style="{color: paymentMethod == 3 ?'#409EFF' : '#ccc', fontSize: '20px'}"
                />
                <div class="balance-img"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-group">
      <el-button>Cancel</el-button>
      <el-button type="primary" @click="makePayment">Confirm</el-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import {getCreatorInfo} from '@/api/creator'
import {subscribe} from '@/api/payment'
export default {
  name: 'Plan',
  mounted() {
    const creatorId = this.$route.params['creatorId']
    let type = this.$route.params['type']
    switch (type) {
      case 'LATEST PHOTOS':
        type = 'photo'
        break;
      case 'LATEST MUSICS':
        type = 'music'
        break;
      case 'LATEST ARTS':
        type = 'art'
        break;
    }
    getCreatorInfo({id: creatorId}).then(res => {
      res = res['data']
      const creator = res['user']
      this.artist = creator['name']
      this.creatorId = creator['id']
      this.avatar = process.env.VUE_APP_BASE_API + creator['profilePicStore']
      const subscribeType = res['subscribeType']
      this.price = subscribeType[type]
      this.subscriptionTypeId = subscribeType['subscriptionTypeId']
      this.subscribeType = this.mapSubscribeType(type)
    }).catch(() => {
      this.$router.push('/404')
    })
  },
  data() {
    return {
      creatorId: 0,
      paymentMethod: 1,
      subscriptionTypeId: 0,
      subscribeType: 0,
      artist: 'artist',
      avatar: "https://pixiv.pximg.net/c/160x160_90_a2_g5/fanbox/public/images/user/9145919/icon/gFrkyUNFiADMNPQD8wdnFAVt.jpeg",
      bg: "https://pixiv.pximg.net/c/936x600_90_a2_g5/fanbox/public/images/plan/6505/cover/4HZaRzK6MChs7HFaJp7zknsj.jpeg",
      price: 0
    }
  },
  methods: {
    changePaymentMethod(id) {
      this.paymentMethod = id
    },
    mapSubscribeType(type){
      switch (type) {
        case 'photo':
          return 0
        case 'music':
          return 1
        case 'art':
          return 2
      }
    },
    makePayment() {
      subscribe({
        subscribeType: this.subscribeType,
        paymentsSerialId: 0,
        subscriptionTypeId: this.subscriptionTypeId,
        creatorId: this.creatorId
      }).then(res => {
        ElMessage.success(res['msg'])
        setTimeout(() => {
          this.$router.push('/artist/' + this.$route.params['creatorId'])
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 800px;
  height: 100vh;
  margin: 0 auto;
}

.title {
  font-size: 20px;
  padding: 40px 15px;
  font-weight: bold;

}

.support-detail {
  background: #fff;
  padding: 20px;
  background: rgb(240, 242, 247);
}

.flex {
  display: flex;
}

.flex .bg-container {
  flex: 0 0 290px;
}

.bg-container .bg{
  padding-top: 65%;
  background: center center / cover no-repeat;
}

.flex .info {
  flex: 1 1 auto;
  padding: 0 35px;
}

.info .avatar{
  height: 30px;
  width: 30px;
  background: center center / cover no-repeat;
  border-radius: 50%;
}

.info .name{
  color: rgb(102, 102, 102);
  margin-left: 10px;
  font-size: 16px;
  align-items: center;
}

.info .price{
  background: #ccc;
  margin: 35px 0px 0px 20px;
  border-radius: 15px;
  padding: 5px 0;
}

.payment {
  margin-top: 30px;
}

.selection-title {
  font-weight: bold;
}

.payment-method {
  text-align: left;
  margin-left: 20px;
}

.payment-method .gateway{
  font-weight: bold;
  padding-left: 20px;
}


.pp-img {
  background: url('~@/assets/pp.png') center center / contain no-repeat;
  height: 100%;
  width: 100%;
  padding-top: 60%;
}

.credit-card-img {
  background: url('~@/assets/credit-card.png') center center / contain no-repeat;
  height: 100%;
  width: 100%;
  padding-top: 60%;
}

.balance-img {
  background: url('~@/assets/balance.png') center center / contain no-repeat;
  height: 40%;
  width: 40%;
  padding-top: 60%;
}

.payment-method-item {
  margin-top: 20px;
  cursor: Pointer;
}

.payment-method .selected {
  background: rgba(159, 255, 51, 0.5);
}

.payment-method .unselected {
  background: rgba(255, 255, 255, .8)
}

.button-group {
  margin-top: 20px;
}
</style>
