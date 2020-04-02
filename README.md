# product_crud
Crud Operations using mongodb, nodejs and express


To Start:

npm install from the root directory 
npm start

To create a user:

post :

http://localhost:3000/user/create
{
	"email": "test@gmail.com",
	"password":"1234567"
}

To create a product 

post: 

http://localhost:3000/user/test@gmail.com/product

{
    "product": {
    	"productName": "testing2",
    	"productPrice": 2
    }
}

TO update

put:

http://localhost:3000/user/test@gmail.com/product/product.id

{
        "productName": "changeProductName",
        "productPrice": 2000
    }

TO get all products list for one user

http://localhost:3000/user/test@gmail.com/product

To delete a product 

post:

http://localhost:3000/user/test@gmail.com/product/product.id