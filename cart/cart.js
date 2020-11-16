// JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';

    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');

      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();



  // add to cart


let cartItems = [];  // to store selected Items
let addCartItems = []; // to derive selected items information

$(document).ready(function () {
  // check if sessionStorage["cart-items"] exist?
  if (sessionStorage["cart-items"] != null) {
      cartItems = JSON.parse(sessionStorage["cart-items"].toString());
  }
  displayCartItems();
});


function addToCart(ID) {
  addCartItems.push(ID); // select ID of product when click add to cart
  let addItem = listProducts.filter((item) => item.ID === addCartItems[addCartItems.length-1]); // select all field of product
  
  var newItem = {};  // convert array to object
  for (var i= 0; i < addItem.length; i++) {
    newItem.ID = addItem[i].ID;
    newItem.Name = addItem[i].Name;
    newItem.Image = addItem[i].Image;
    newItem.Brand = addItem[i].Brand;
    newItem.Price = addItem[i].Price;
    newItem.Quantity = 1;
  }
  //console.log(newItem);

  var exists = false;
    if (cartItems.length > 0) {
        $.each(cartItems, function (index, value) {
            // if exist, increase quantity
            if (value.ID == newItem.ID) {
                value.Quantity++;
                exists = true;
                return false;
            }
        });
    }
  
  // if not exist, push to cartItems list
  if (!exists) {
    cartItems.push(newItem);
  }

console.log(cartItems);

// Lưu thông tin vào sessionStorage
sessionStorage["cart-items"] = JSON.stringify(cartItems); // Chuyển thông tin mảng shoppingCartItems sang JSON trước khi lưu vào sessionStorage
// Gọi hàm hiển thị giỏ hàng
displayCartItems();

}

function displayCartItems() {
  if (sessionStorage["cart-items"] != null) {
    cartItems = JSON.parse(sessionStorage["cart-items"].toString()); // Chuyển thông tin từ JSON trong sessionStorage sang mảng shoppingCartItems.
    for (var i = 0; i < cartItems.length; i++) {
      document.getElementById("Cart").innerHTML +=
      '<div class="container"><h3 class="mb-4">Your Cart</h3></div>\n' +
      ' <div class="container">\n' +
      '   <div class="col-xs-12 col-lg-8">\n' +
      '     <div class="card mb-3">\n' +
      '       <div class="card-body">\n' +                      
      '         <div class="row mb-4">\n' +
      '           <div class="col-xs-12 col-sm-12 col-md-5 col-lg-3">\n' +
      '                <div class="thumbnail mb-3">\n' +
      '                    <img src="./products/images/' +
      cartItems[i].Image +
      '">\n' +
      '                </div>\n' + 
      '            </div>\n' +
      '            <div class=" col-xs-12 col-sm-12 col-md-7 col-lg-9">\n' +
      '                <div class="d-flex justify-content-between">\n' +
      '                    <div>\n' +
      '                        <h5>' +
      cartItems[i].Name +
      '</h5>\n' +
      '                        <p class="mb-3 text-muted small">Brand: ' +
      cartItems[i].Brand +
      '</p>\n' +
      '                    </div>\n' +
      '                    <div class="">\n' +
      '                        <button type="button" class="btn btn-default btn-sm" onclick="this.parentNode.querySelector(\'input[type=number]\').stepDown(); minus(\'' + 
      cartItems[i].ID + 
      '\'); window.location.reload();">\n' +
      '                            <span class="glyphicon glyphicon-minus"></span>\n' +
      '                        </button>\n' +
      '                        <input min="0" type="number" value="' +
      cartItems[i].Quantity.toString() +
      '">\n' +
      '                        <button type="button" class="btn btn-default btn-sm" onclick="this.parentNode.querySelector(\'input[type=number]\').stepUp()"; add(\'' +
      cartItems[i].ID + 
      '\')">\n' +
      '                            <span class="glyphicon glyphicon-plus"></span>\n' +
      '                        </button>\n' +
      '                    </div>\n' +
      '                </div>\n' +
      '                <div class="d-flex justify-content-between align-items-center">\n' +
      '                    <div>\n' +
      '                        <a href="#!" type="button" class=" small mr-3"><i class="fas fa-trash-alt mr-1"></i> Remove this Item </a>\n' +
      '                    </div>\n' +
      '                    <p class="mb-0"><span><strong>\n' +
      parseFloat(cartItems[i].Price) * cartItems[i].Quantity  +
      ' USD</strong></span></p>\n' +
      '                </div> \n' +
      '            </div> \n' +
      '        </div> \n' +
      '        <hr class="mb-4"> \n' +
      '      </div>\n' +
      '    </div>\n' +
      '   </div>'
    }  


  }
}

function changeQuantity(id) {
  var a = this.parentNode.querySelector(input[type=number]);
  var ipValue = a;
  for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].ID == id) {
          cartItems[i].Quantity = ipValue;
          break;
      }
  }
  sessionStorage["cart-items"] = JSON.stringify(cartItems);
  cartItems = JSON.parse(sessionStorage["cart-items"].toString());
}
function minus(id) {
  for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].ID == id) {
          var a =cartItems[i].Quantity;
	  if(a==0) return; 
	  a--;
	  cartItems[i].Quantity= a;

      }
  }
sessionStorage["cart-items"] = JSON.stringify(cartItems);  // add gia tri moi vao session storage
 cartItems = JSON.parse(sessionStorage["cart-items"].toString());
}

function add(id) {
  for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].ID == id) {
          var b =cartItems[i].Quantity;
	  b++;
	  cartItems[i].Quantity= b;

      }
  }
sessionStorage["cart-items"] = JSON.stringify(cartItems);  // add gia tri moi vao session storage
 cartItems = JSON.parse(sessionStorage["cart-items"].toString());

}
