# lab-10
Authentication





### TODO README Question
* Currently, the client is just sending us an object containing the username and password to us, which is why we can just pass along (req.body). What is a better way to do this?

* Ans: Hashing user password 

* What are the pros and cons of setting res.cookie?
* ans: pros: it helps the user a client from re authenticate process every time to use the website
       cons:  Security issue by exposing the login information 
