/*

    BAsic
    --------
1.do not show the link to them who should not see it.
2. Only show to the person/ types of user who should see it
3. Do not allow to visit the links by typing on the url.
If not admin then redricet to any other page. you could logout user
and send them to the login page as well.

TO SEND DATA
--------------------
1. verify JWT Token (send authorization token in the header t the server).
If possible use axios to send jwt token by intercepting the request
2. if it is an admin activity. Make Sure only admin user is posting data by using verifyAdmin

*/