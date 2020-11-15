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


let cartItems = [];
let addCartItems = [];

$(document).ready(function () {
  // Kiểm tra nếu đã có sessionStorage["cart-items"] hay chưa?
  if (sessionStorage["cart-items"] != null) {
      cartItems = JSON.parse(sessionStorage["cart-items"].toString());
  }
  displaycartItems();
});


function addToCart(ID) {
  addCartItems.push(ID);
  let addItem = listProducts.filter((item) => item.ID === addCartItems[0]);
  console.log(addItem[0].Name);
  console.log(addItem[0]);

  var newItem = {};
  for (var i= 0; i < addItem.length; i++) {
    newItem.ID = addItem[i].ID;
    newItem.Name = addItem[i].Name;
    newItem.Image = addItem[i].Image;
    newItem.Brand = addItem[i].Brand;
    newItem.Price = addItem[i].Price;
    newItem.Quantity = "1";
  }
  console.log(newItem);

  var exists = false;
    if (cartItems.length > 0) {
        $.each(cartItems, function (index, value) {
            // Nếu mặt hàng đã tồn tại trong giỏ hàng thì chỉ cần tăng số lượng mặt hàng đó trong giỏ hàng.
            if (value.id == newItem.ID) {
                value.quantity++;
                exists = true;
                return false;
            }
        });
    }
  
  // Nếu mặt hàng chưa tồn tại trong giỏ hàng thì bổ sung vào mảng
  if (!exists) {
    cartItems.push(newItem);
    console.log(cartItems);
}
}

// Lưu thông tin vào sessionStorage
sessionStorage["cart-items"] = JSON.stringify(cartItems); // Chuyển thông tin mảng shoppingCartItems sang JSON trước khi lưu vào sessionStorage
// Gọi hàm hiển thị giỏ hàng
displaycartItems();

