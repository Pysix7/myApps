import React from "react";
import { Card, Button, message, Form } from "antd";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

class CheckoutForm extends React.Component {
  getQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const stuff = {};
    for (let param of query.entries()) {
      stuff[param[0]] = param[1];
    }

    return stuff;
  };

  handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { client } = this.getQueryParams();
    const result = await stripe.confirmCardPayment(`${client}`, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen"
        }
      }
    });
    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      message.error("Something is wrong, Please check the input and Submit.");
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === "succeeded") {
        message.success("Booking Complete");
        setTimeout(()=>{
          window.location.href = "/";
        },3000)
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  render() {
    const { amount } = this.getQueryParams();
    return (
      <Card bodyStyle={{ padding: "5% 30%" }} bordered={false}>
        <span style={{ fontSize: "20px", color: "#555" }}>
          <strong>{`For the Amount of: ${amount} Rs`}</strong>
        </span>
        <Form onSubmit={this.handleSubmit}>
          <CardSection />
          <Button
            type="primary"
            htmlType="submit"
            disabled={!this.props.stripe}
          >
            Confirm order
          </Button>
        </Form>
      </Card>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
