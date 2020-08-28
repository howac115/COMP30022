APIs:
Register  --
   1. relative url:  /home/register      absolute url: http://localhost:3000/home/register
   2. method:  POST
   3. HTTP request Header: Content-Type application/json
   4. HTTP request Body example, all the following field should be filled
         NOTE: password should be 123456 now to avoid further headache when testing login,
         password2 should be the same as password1, which aims at confirming the password
           {
             "first_name": "TomCat",
             "family_name": "One",
             "email": "12312@gmail.com",
             "password": "123456",
             "password2": "123456"
           }
   5. send the HTTP request

Login --
      1. relative url:  /home/login       absolute url: http://localhost:3000/home/login
      2. method:  POST
      3. HTTP request Header: Content-Type application/json 
      4. HTTP request Body example, all the following field should be filled
                {
                   "email":  "12312@gmail.com",
                   "12312@gmail.com"
                 }
      5. send the HTTP request