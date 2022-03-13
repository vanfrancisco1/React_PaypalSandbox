import './MyDesigns/App.css';
import TopPage from './MyDesigns/TopPage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {Helmet} from "react-helmet";
import { useState } from 'react';
function App() {
  const MyOptions = {
    'client-id' : 'YOUR CLIENT ID',
    'currency' : "PHP",
  }
  var [PaymentStatus,setPaymentStatus] =  useState(false);
  return (
    <div className="App">
      <Helmet title={PaymentStatus === true ? 'SUCCESS' : document.title }></Helmet>
      <TopPage Header="FRONT TEXT TITLE" BodyText="- Current Available Payment Options -" />
      <div className='PriceIndicator'>
        <p>TOTAL PRICE:</p>
        <p id='Price'>1000</p>
      </div>
      {PaymentStatus === false && 
      <PayPalScriptProvider options={MyOptions} style={{maxWidth: '100px'}}>
            <PayPalButtons style={{layout : 'horizontal'}}
                            createOrder={(data, actions) => {
                              return actions.order
                                  .create({
                                      purchase_units: [
                                          {
                                              amount: {
                                                  value: document.getElementById('Price').innerHTML,
                                              },
                                          },
                                      ],
                                  })
                                  .then((orderId) => {
                                      // Your code here after create the order
                                      return orderId;
                                  });
                          }}
                          onApprove={function (data, actions) {
                              return actions.order.capture().then(() => {
                                setPaymentStatus(true)
                              });
                          }}/>
        </PayPalScriptProvider>}
        {PaymentStatus === true && 
        <TopPage Header="Hooray!" BodyText="The payment transaction is completed!" />}
    </div>
  );
}

export default App;
