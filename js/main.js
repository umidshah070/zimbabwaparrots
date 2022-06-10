const elProductTemplate = document.querySelector("#product-template");
const elProductsWrapper = document.querySelector(".product-wrapper");

const addZero = num => {
  return num < 10 ? "0" + num : num;
}

const createProductRow = product => {

  const { id, title, img, price, birthDate, sizes, isFavorite, features } = product;

  const elProductRow = elProductTemplate.cloneNode(true).content;

  const elProductImg = elProductRow.querySelector(".product-img")
  elProductImg.src = img;

  const elProductTitle = elProductRow.querySelector(".card-title")
  elProductTitle.textContent = title;

  const elProductPrice = elProductRow.querySelector(".mark")
  elProductPrice.textContent = `$${price}`;

  const elProductSizes = elProductRow.querySelector(".bg-success")
  elProductSizes.textContent = `${sizes.width}sm x ${sizes.height}sm`;

  const elProductDate = elProductRow.querySelector(".product-date")
  const productDate = new Date(birthDate);
  elProductDate.textContent = `${addZero(productDate.getDate())}.${addZero(productDate.getMonth() + 1)}.${productDate.getFullYear()} `;

  const elProductFeaturesArry = features.split(",");

  const elProductFeaturesOne = elProductRow.querySelector(".a")
  elProductFeaturesOne.textContent = elProductFeaturesArry[0];

  const elProductFeaturesTwo = elProductRow.querySelector(".b")
  elProductFeaturesTwo.textContent = elProductFeaturesArry[1];

  const elProductFeaturesTree = elProductRow.querySelector(".c")
  elProductFeaturesTree.textContent = elProductFeaturesArry[2];

  // const elProductisFavoriTetyp = isFavorite;

  // const elProductisFavorite = elProductRow.querySelector(".star")

  // if( elProductisFavoriTetyp === true){
  //   elProductisFavorite.classList.add("fa fa-star-o")
  // }

  const elDeleteBtn = elProductRow.querySelector(".btn-danger")
  elDeleteBtn.dataset.id = id;

  const elEditBtn = elProductRow.querySelector(".btn-secondary")
  elEditBtn.dataset.id = id;

  return elProductRow
}

const elCoundWrapper = document.querySelector(".count");


const renderProducts = (productArr = products) => {
  elProductsWrapper.innerHTML = "";

  productArr.forEach((product) => {
    const  elProductRow = createProductRow(product);
    elProductsWrapper.append(elProductRow);
    elCoundWrapper.textContent = `count: ${ products.length}`;
  });
}

renderProducts();


const elAddProductForm = document.querySelector("#add-product-form");
const elAddProductModal = new bootstrap.Modal("#add-parrot-modal");
const elEditProductModal = new bootstrap.Modal("#edit-parrot-modal");

elAddProductForm.addEventListener("submit" , (evt) =>{
  evt.preventDefault();

  const formElements = evt.target.elements;

  const titleInputValue = formElements[0].value.trim();
  const imgInputValue = formElements[1].value.trim();
  const priceInputValue = +formElements[2].value.trim();
  const dateInputValue = formElements[3].value.trim();
  const widthInputValue = +formElements[4].value.trim();
  const heightInputValue = +formElements[5].value.trim();
  const featuresInputValue = formElements[6].value.trim();



  if(titleInputValue && imgInputValue && priceInputValue && widthInputValue && heightInputValue  > 0){
    const addingProduct = {
      id: Math.floor(Math.random() * 1000),
      title: titleInputValue,
      img: imgInputValue,
      price: priceInputValue,
      birthDate: dateInputValue,
      sizes: {
        width: widthInputValue,
        height:heightInputValue
      },
      features: featuresInputValue

  }




  products.unshift(addingProduct);
  const elNewProduct =createProductRow(addingProduct);
  elProductsWrapper.prepend(elNewProduct);

  elAddProductForm.reset();
  elAddProductModal.hide();



  };





});

const elEditForm = document.querySelector("#edit-product-form");
const elEditTitle =elEditForm.querySelector("#edit-parrot-title");
const elEditImg =elEditForm.querySelector("#edit-parrot-img");
const elEditPrice =elEditForm.querySelector("#edit-price");
const elEditDate =elEditForm.querySelector("#edit-parrot-date");
const elEditWidth =elEditForm.querySelector("#edit-parrot_width");
const elEditHeight =elEditForm.querySelector("#edit-parrot_height");
const elEditFeatures =elEditForm.querySelector("#edit-features");











elProductsWrapper.addEventListener("click" , (evt) =>{
  const element = evt.target.matches(".btn-danger");

  if(element){
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnIndex = products.findIndex((product) =>{
      return product.id === clickedBtnId;
    } );

    products.splice(clickedBtnIndex, 1)

    elProductsWrapper.innerHTML = "";

    renderProducts();
  }

  if(evt.target.matches(".btn-secondary")){
    const clickedBtnId = +evt.target.dataset.id;
    const clickedBtnObj = products.find((product) =>  product.id === clickedBtnId);

    console.log(clickedBtnObj);

    if (clickedBtnObj) {

      elEditTitle.value = clickedBtnObj.title || " ";
      elEditImg.value = clickedBtnObj.img || " ";
      elEditPrice.value = clickedBtnObj.price || " ";
      elEditDate.value = clickedBtnObj.birthDate || " ";
      elEditWidth.value = clickedBtnObj.sizes.width || " ";
      elEditHeight.value = clickedBtnObj.sizes.height || " ";
      elEditFeatures.value = clickedBtnObj.features || " ";

      elEditForm.dataset.id = clickedBtnId;

    }
  }
});

elEditForm.addEventListener("submit" , (evt) =>{
  evt.preventDefault();

  const submitItemId = +evt.target.dataset.id;

  const titleValue = elEditTitle.value.trim();
  const imgValue = elEditImg.value.trim();
  const priceValue = +elEditPrice.value.trim();
  const dateValue = elEditDate.value.trim();
  const widthValue = +elEditWidth.value.trim();
  const heightValue = +elEditHeight.value.trim();
  const featuresValue = elEditFeatures.value.trim();

  if(titleValue && imgValue && priceValue && widthValue && heightValue > 0){
    const submitProductIndex = products.findIndex(product => product.id === submitItemId)

    const editProduct ={
      id: submitItemId,
      title: titleValue,
      img: imgValue,
      price: priceValue,
      birthDate: dateValue,
      sizes: {
        width: widthValue,
        height: heightValue
      },
      isFavorite: false,
      features: featuresValue

    }

    products.splice(submitProductIndex, 1, editProduct);
    renderProducts();

    elEditProductModal.hide();
  }



})


const elFormFilter = document.querySelector("#filter");
 elFormFilter.addEventListener("submit" , (evt)=>{
  evt.preventDefault();

  const elements = evt.target.elements;
  const searchValue = elements.search.value.trim();
  const PriceFormValue = +elements.from.value;
  const PriceToValue = +elements.to.value;
  const sortValue = elements.sortby.value;
  const PriceFormWidthValue = +elements.from_width.value;
  const PriceFormToWidthValue = +elements.to_width.value;
  const PriceFormHeightValue = +elements.from_height.value;
  const PriceFormToHeightValue = +elements.to_height.value;




  const filterProduct = products.filter(function(product){

    const isTitleFilter =product.title.toLowerCase().includes(searchValue.toLowerCase());
    return isTitleFilter;


  })
  .filter(product =>{
    const productPrice = +product.price;
    return productPrice >= PriceFormValue;
  })
  .filter(product =>{
    const productPrice = +product.price;
    return !PriceToValue ? true : productPrice <= PriceToValue;
  })
  .filter(product =>{
    const productPrice = +product.sizes.width;
    return productPrice >= PriceFormWidthValue;
  })
  .filter(product =>{
    const productPrice = +product.sizes.width;
    return !PriceFormToWidthValue ? true : productPrice <= PriceFormToWidthValue;
  })
  .filter(product =>{
    const productPrice = +product.sizes.height;
    return productPrice >= PriceFormHeightValue;
  })
  .filter(product =>{
    const productPrice = +product.sizes.height;
    return !PriceFormToHeightValue ? true : productPrice <= PriceFormToHeightValue;
  })
  .sort((a,b) =>{
    switch (sortValue){
      case "2":
        if (a.price > b.price) {
          return 1
        } else if (a.price === b.price) {
          return 0
        }
        return -1;
        case "3":
          if (a.price < b.price) {
            return 1
          } else if (a.price === b.price) {
            return 0
          }
          return -1;
          case "4":
            return (new Date(b.birthDate).getTime()) - (new Date(a.birthDate).getTime());
            case "5":
            return (new Date(a.birthDate).getTime()) - (new Date(b.birthDate).getTime())

        default:
          break;
    }
    return 0;
  });
   console.log(filterProduct);


  renderProducts(filterProduct)


 })