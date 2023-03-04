# mock14
Api for login and signup using email and password.

# GET
- Route "/"
- Response
```
welcome to drag and drop app
```
# POST
- Route "/signup"
- body
```
{
Email:"dummy",
Password:"dummy"
}

```
-Response 
```
{"msg":"signed up"}
```

- Route "/signin"
- body
```
{
Email:"dummy",
Password:"dummy"
}

```
-Response 
```
 {
  msg:"logged in", 
  email:"dummy",
  token:"egshrkzm"
  }
// Above is just example
```
