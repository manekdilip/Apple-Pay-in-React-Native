

import React, { Fragment } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert} from 'react-native';

const PaymentRequest = require('react-native-payments').PaymentRequest;

const METHOD_DATA = [{
  supportedMethods: ['apple-pay'],
  data: {
    merchantIdentifier: 'merchant.apple.test',
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    countryCode: 'US',
    currencyCode: 'USD'
  }
}];

const DETAILS = {
  id: 'simple example',
  displayItems: [
    {
      label: 'Railway Ticket',
      amount: { currency: 'USD', value: '17.00' }
    },
    {
      label: 'Kids Toy',
      amount: { currency: 'USD', value: '8.00' }
    }
  ],
  shippingOptions: [{
    id: 'economy',
    label: 'Economy Shipping',
    amount: { currency: 'USD', value: '0.00' },
    detail: 'Arrives in 2-4 days' 
  }],
  total: {
    label: 'Store',
    amount: { currency: 'USD', value: '25.00' }
  }
};
const OPTIONS = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
  requestShipping: true
};
const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

paymentRequest.addEventListener('shippingaddresschange', e => {
  const updatedDetails = getUpdatedDetailsForShippingAddress(paymentRequest.shippingAddress);

  e.updateWith(updatedDetails);
});

paymentRequest.addEventListener('shippingoptionchange', e => {
  const updatedDetails = getUpdatedDetailsForShippingOption(paymentRequest.shippingOption);

  e.updateWith(updatedDetails);
});

check = () => {
  paymentRequest.canMakePayments().then((canMakePayment) => {
    if (canMakePayment) {
      Alert.alert(
        'Apple Pay',
        'Apple Pay is available in this device'
      );
    }
  })
}

pay = () => {
    paymentRequest.canMakePayments().then((canMakePayment) => {
    if (canMakePayment) {
      console.log('Can Make Payment')
      paymentRequest.show()
        .then(paymentResponse => {
          

          paymentResponse.complete('success');
        });
    }
    else {
      console.log('Cant Make Payment')
    }
  })
}

const App = () => {
  return (
   
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
        
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Check</Text>
              <Text style={styles.sectionDescription}>
               Apple Pay
              </Text>
              <TouchableOpacity
              onPress={() => this.check()}>
                <Text>check Apple Pay</Text>
              </TouchableOpacity>
               />
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View>
                <Text style={styles.sectionTitle}>Cart</Text>
                <Text style={styles.sectionDescription}>
                  Simulating your cart items in an app
              </Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}> Ticket</Text>
                <Text style={styles.itemDescription}>
                   description
              </Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD </Text>
              </View>
            </View>
            <View style={styles.itemContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>Grocery</Text>
                <Text style={styles.itemDescription}>
                  Some description
              </Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <View style={styles.itemDetail}>
                <Text style={styles.itemTitle}>Total</Text>
              </View>
              <View style={styles.itemPrice}>
                <Text>USD </Text>
              </View>
            </View>
            <TouchableOpacity  onPress={() => this.pay()} >  
            <Text>apple Pay btn</Text> 
              </TouchableOpacity>
          
          </View>
        </ScrollView>
      </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: 'white'},
  engine: { position: 'absolute', right: 0},
  body: {backgroundColor: 'white', borderBottomColor: "#cccccc", borderBottomWidth: 1, paddingBottom: 10},  
  sectionContainer: { marginTop: 32, paddingHorizontal: 24 },  
  itemContainer: {marginTop: 12,paddingHorizontal: 24,display: "flex",flexDirection: 'row'},
  totalContainer: {marginTop: 12,paddingHorizontal: 24,display: "flex",flexDirection: 'row',borderTopColor: "#cccccc",borderTopWidth: 1,paddingTop: 10,marginBottom: 20},
  itemDetail: {flex: 2},
  itemTitle: {fontWeight: '500',fontSize: 18},
  itemDescription: {fontSize: 12},
  itemPrice: {flex: 1},
  sectionTitle: {fontSize: 24,fontWeight: '600',color: 'black',},
  sectionDescription: {marginTop: 8,fontSize: 12,fontWeight: '400',color: 'black',},
  highlight: {fontWeight: '700',},
 
});

export default App;