# Checkout Example Plugin

## Description

The Checkout Example Plugin is intended to demonstrate the basic functionality of a Bold Checkout plugin. The example plugin is capable of the following:

- Managing the OAuth install flow.
- Handling a few of Checkout's plugin events and returning a number of example actions.
- Handling the order stream webhook.
- Providing an inventory override.

This repository is free to fork and use; to connect your plugin with Bold Checkout, you will need to fill out the plugin intake form and submit it to Bold. Depending on your familiarity with web development, you may wish to initiate this process first, or wait until you've had time to explore the plugin and understand how it works. Refer to the [Getting Started Guide](https://developer.boldcommerce.com/default/guides/checkout/plugins/getting-started) for more information.

## Getting Started

1. Clone this repository.

2. Install npm dependencies.
   ```
   $ npm install
   ```
   
3. Copy `.env.example` to `.env`.
   ```
   $ cp .env.example .env
   ```
   
4. Set the following environment variables in `.env`.
   ```shell script
   PORT={Your preferred port number}
   BOLD_CHECKOUT_DOMAIN=cashier.boldcommerce.com
   APP_URL=https://{your-public-plugin-domain}
   CLIENT_ID={Your plugin client id}
   CLIENT_SECRET={Your plugin client secret}
   ```
   
5. Start your plugin server.
   ```
   $ npm run start
   ```
   
6. Expose your server to the internet. In a development environment you can use services like ngrok or Cloudflare Tunnel to achieve this.

## Customization

Feel free to modify this plugin to suit your use case. There are several things to keep in mind when doing so:

### OAuth

The installation flow results in an OAuth access token granted to your plugin by Checkout. This token represents the agreement between your plugin and the shop it is installed on. Each token must be preserved and used for any Checkout API requests you make on behalf of any given shop.

For more information, refer to [Implement the Plugin Installation Flow](https://developer.boldcommerce.com/default/guides/checkout/plugins/installation-flow).

### Events and Actions

Your plugin must be registered to receive any Checkout event. Checkout events are dispatched to your event-dispatch endpoint. When your plugin receives an event, it must parse the event type and process the event accordingly. The event-dispatch request is synchronous, so your plugin must respond with an array of actions for Checkout to execute. This array can be empty.

### Action Scopes

Each action has a required scope, or permission, which allows it to be executed by Checkout. These scopes were obtained during the [OAuth install flow](https://developer.boldcommerce.com/default/guides/checkout/plugins/installation-flow). You can add or remove any scope you require to the list of scopes already present in the example code. Please note that your plugin must be re-installed for the new set of scopes to be effective. This results in the creation of a new access token, which has your new scopes associated with it.

### Webhooks

Webhooks are asynchronous and only require you to send a successful response to acknowledge that your plugin has received it. Webhooks are subscription-based and must be manually subscribed to in order to be received. Each webhook is dispatched to its own endpoint, which you must specify when subscribing.

### Overrides

Checkout provides five types of overrides. To implement an override, your plugin begins by sending an action in response to a Checkout event. Typically, this happens early in the Checkout flow, such as in response to the `initialize_checkout` event. The action specifies the type of override being provided (eg. `override_inventory`), as well as the url to be used when the override is triggered. This url is usually an endpoint handled by your plugin.

When Checkout triggers the override, it calls the endpoint specified in your override action with a payload consisting of shop and order data. Your plugin must process this data and return a response appropriate for your use case.

## Documentation

For more information, refer to the following guides in the Bold Developer Documentation:

- [Create a Plugin](https://developer.boldcommerce.com/default/guides/checkout/plugins)
- [Plugin Events Reference](https://developer.boldcommerce.com/default/guides/checkout/references/plugin-events)
- [Plugin Actions Reference](https://developer.boldcommerce.com/default/guides/checkout/references/plugin-actions)
