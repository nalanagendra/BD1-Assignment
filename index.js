const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
const port = 3000;

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltiRate = 2; // 2 points per $1

function getCartTotal(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total;
}

function getMembershipDiscount(cartTotal, isMember) {
  if (isMember) {
    let cartDiscountedTotal =
      cartTotal - (cartTotal * discountPercentage) / 100;
    return cartDiscountedTotal;
  }

  return cartTotal;
}

function calculateTax(cartTotal) {
  let tax = (cartTotal * taxRate) / 100;
  console.log(tax);
  return tax;
}

function getEstimatedDelivery(shippingMethod, distance) {
  let days;
  if (shippingMethod == 'express') {
    days = distance / 100;
  } else {
    days = distance / 50;
  }
  return days;
}

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost;
}

function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltiRate;
  return loyaltyPoints;
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(getCartTotal(newItemPrice, cartTotal).toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(getMembershipDiscount(cartTotal, isMember).toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal).toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(getEstimatedDelivery(shippingMethod, distance).toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
