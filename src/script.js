var products = [];

$(document).ready(function () {
  $("#add_product").click(function () {
    // $("#product_sku").attr("readOnly", false); //removeAttr("readOnly")
    var sku = $("#product_sku").val();
    var name = $("#product_name").val();
    var price = $("#product_price").val();
    var quantity = $("#product_quantity").val();

    if (isvalid(sku, name, price, quantity)) {
      if (!chkduplicate(sku)) {
        var product = {};
        product.sku = sku;
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        products.push(product);

        //recoloring the borders black
        $("#product_sku").css("border-color", "black");
        $("#product_name").css("border-color", "black");
        $("#product_price").css("border-color", "black");
        $("#product_quantity").css("border-color", "black");
      
        $(".success").show();
        $(".error").hide();
        clear();
        display();
      } else {
        $("#product_sku").css("border-color", "red");
        $(".error").show();
        $(".success").hide();
        $(".errmsg").text("Duplicate Value present");
      }
    }
  });
});

//check if the input values are valid or not
function isvalid(sku, name, price, quantity) {
    var flag = true;
  if (sku == "") {
    $("#product_sku").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("SKU field is empty");
     flag = false;
  }
  if (name == "") {
    $("#product_name").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Name field is empty");
    flag = false;
  }
  if (price == "") {
    $("#product_price").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Price field is empty");
    flag = false;
  }
  if (quantity == "") {
    $("#product_quantity").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Quantity field is empty");
    flag = false;
  }
  if (isNaN(sku)) {
    $("#product_sku").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Sku is not a number,Enter a number!");
    flag = false;
  }
  if (!isNaN(name)) {
    $("#product_name").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Name is not a string , Enter a string!");
    flag = false;
  }
  if (isNaN(price)) {
    $("#product_price").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Price is not a number, Enter a number!");
    flag = false;
  }
  if (isNaN(quantity)) {
    $("#product_quantity").css("border-color", "red");
    $(".error").show();
    $(".success").hide();
    $(".error").text("Quantity is not a number, Enter a number!");
    flag = false;
  }
  return flag;
}

$(".close").click(function () {
  display: none;
});

//function to clear the textboxes once the product is added
function clear() {
  $("#add_product_form label input").val("");
}

function chkduplicate(sku) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].sku == sku) return true;
  }
  return false;
}

//dynamic function to edit the product
$("#product_list").on("click", ".editProduct", function (e) {
  e.preventDefault(); //to prevent the page from reloading
  var pid = $(this).data("pid");

  var temp = getproduct(pid);
//   $("#product_sku").attr("readOnly", true);

  //populating the form
  $("#product_sku").val(temp.sku);
  $("#product_name").val(temp.name);
  $("#product_price").val(temp.price);
  $("#product_quantity").val(temp.quantity);

  $(".submit").toggle(); //functionality to hide and show buttons at once by giving separate ids and classes to them and then using it
});

$("#update").on("click", function () {
  var sku = $("#product_sku").val();
  var name = $("#product_name").val();
  var price = $("#product_price").val();
  var quantity = $("#product_quantity").val();

  var product = {};
  product.sku = sku;
  product.name = name;
  product.price = price;
  product.quantity = quantity;

  updateProduct(product);
  // display();
});

function updateProduct(pproduct) {
  for (var i = 0; i < products.length; i++) {
    if (pproduct.sku == products[i].sku) products[i] = pproduct;
  }
  display();
}

//dynamic function to delete the product
$("#product_list").on("click", ".deleteProduct", function () {
  var pid = $(this).data("pid");
  if (confirm("Do you want to delete?")) {
    // var temp = getproduct(pid);
    deleteproduct(pid);
    display();
  }
});

//function to delete the object
function deleteproduct(temp) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].sku == temp) products.splice(i, 1);
  }
}
//fetch that particular object index from products array
function getproduct(pid) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].sku == pid) return products[i];
  }
}
//function to display array in table format
function display() {
  var html = "";
  html +=
    "<table><tr><th>Product Sku</th><th>Product Name</th><th>Product Price</th><th>Product Quantity</th><th>Action</th></tr>";

  for (var i = 0; i < products.length; i++) {
    html +=
      "<tr>\
        <td>" +
      products[i].sku +
      "</td>\
        <td>" +
      products[i].name +
      "</td>\
        <td>" +
      products[i].price +
      "</td>\
        <td>" +
      products[i].quantity +
      '</td>\
        <td>\
            <a href="javascript:void(0);" class="editProduct" data-pid="' +
      products[i].sku +
      '">Edit</a>\
            <a href="javascript:void(0);" class="deleteProduct" data-pid="' +
      products[i].sku +
      '">Delete</a>\
        </td>\
        </tr>';
  }
  html += "</table>";
  console.log(products);
  $("#product_list").html(html);
}
