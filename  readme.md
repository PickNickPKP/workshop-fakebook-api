## CC20-FB-API


### env guide
PORT = 8899  
DATABASE_URL=****  
JWT_SECRET=***
CLOUDINARY_NAME=dbipjy3vi
CLOUDINARY_API_KEY=618974865657378
CLOUDINARY_API_SECRET=51fgh-anRi9Z3j3hlAQmljLFC_A
---

### service

|path |method |authen |params |query |body |
|:-- |:-- |:-- |:-- |:-- |:-- |
|/api/auth/login|post|-|-|-|{identity, password}  
|/api/auth/register|post|-|-|-| {identity, firstName, lastName, password, confirmPassword}
|/api/auth/me|get|y|-|-|-|
|/api/post|get|y|-|-|-|
|/api/post|post|y|-|-|{message, image(file)}
|/api/post|put|y|:id|-|{message, image(file)}
|/api/post|delete|y|:id|-|-
|/api/comment|post|y|-|-|{message, postId}
|/api/like|post|y|-|-|{postId}
|/api/like|delete|y|:id|-|-

  
 <br />
 <br />
 <br />
 
---
เว้นบรรทัด spacebar 2 ที