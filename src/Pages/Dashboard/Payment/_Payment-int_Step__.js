/*
1. instal stripe and react stripe js
2. create a checkout from with card element (card element contains: card number expriation and zip code)
3. create an account on stripe and get the publishable key pk
4. get card information 
5. create a payment method
6. use test card to test payment and set error success
7. on the server side: install --save stripe 
8. create a payment intent api with payment method types; ['card']
make sure ou provide (price*100) amount in cents (multiply price with 100)
9. call payment intent api to get client secret and store it in a state
10. use confirmCardPayment api with client secret card info.
11. display card error and card success
12. do things after payment -->


*/