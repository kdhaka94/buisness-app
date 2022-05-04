import AllInOneSDKManager from 'paytm_allinone_react-native'
import { request } from './request'


export const makePayemnt = async () => {

  const response = await request({ uri: '/user/paymentToken' });

  console.log({ response })
  const orderDetails = {
    orderId: response.ORDERID,
    mid: response.MID,
    txnToken: response.CHECKSUMHASH,
    amount: response.TXN_AMOUNT,
    callbackUrl: "http://localhost:3000",
    isStaging: true,
    restrictAppInvoke: false
  }

  AllInOneSDKManager.startTransaction(
    orderDetails.orderId,
    orderDetails.mid,
    orderDetails.txnToken,
    orderDetails.amount,
    orderDetails.callbackUrl,
    orderDetails.isStaging,
    orderDetails.restrictAppInvoke
  ).then(value => {
    console.log({ value })
  }).error(err => {
    console.log({ err })
  })

}