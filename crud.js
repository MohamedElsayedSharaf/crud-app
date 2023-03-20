let title = document.getElementById('title')
let prices = document.getElementById('prices')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mood = 'create'
let tmp;
//call total
function getTotal()
{
    if (prices.value != ''){
        let result = (+prices.value + +taxes.value + +ads.value) - (+discount.value)
        total.innerHTML = result;
        total.style.background = '#040'
    }else {
        total.innerHTML = ''
        total.style.background = '#7a3803'
    }
}
//creation of product
let dataProduct;
if (localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct =[]
}


submit.onclick = function (){
    let newProduct = {
        title:title.value.toLowerCase(),
        prices:prices.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && prices.value != '' && category.value != ''){
        if (mood ==='create'){
            if(newProduct.count > 1){
                for (let i =0; i < newProduct.count; i++){
                    dataProduct.push(newProduct)
                }
            }else{
                dataProduct.push(newProduct)
            }
        }else{
            dataProduct[tmp] = newProduct
            mood = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
    }
   
    //save in localstorage
    localStorage.setItem('product', JSON.stringify(dataProduct))
    console.log(dataProduct)

    clear()
    showdata()
}


//clear inputs

function clear() {
    title.value = ''
    prices.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
    submit.value = '' 
}
//read data 

function showdata(){
    getTotal()
    let table =''
    for(let i=0; i < dataProduct.length; i++){
        table += `
                   <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].prices}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let btndelete = document.getElementById('deleteAll')
    if (dataProduct.length > 0){
        btndelete.innerHTML = `
        <button onclick = "deleteAll()">Delete All (${dataProduct.length})</button>
        `
    }
    else{
        btndelete.innerHTML = ''
    }
}
showdata()

//delete data 

function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product = JSON.stringify(dataProduct)
    showdata()
}

function deleteAll(){
    localStorage.clear()
    dataProduct.splice(0)
    showdata()
    
}
//update data

function updateData(i){
    title.value = dataProduct[i].title;
    prices.value = dataProduct[i].prices;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount
    getTotal();
    count.style.display = 'none'
    category.value = dataProduct[i].category
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search 

let searchMood = 'title'  // =>default value
function getSearch(id)
{
    let search = document.getElementById('search')
    if(id == 'search-title'){
        searchMood = 'title'
        search.placeholder = 'Search By Title'
    }else{
        searchMood = 'category'
        search.placeholder = 'Search By Category'
    }
    search.focus()
    search.value = ''
    showdata()
}

function searchData(value)
{
    let table =''
    if(searchMood == 'title')
    {
        for(let i=0; i<dataProduct.length; i++){
            if (dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                   <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].prices}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `
            }
        }
    }else{
        for(let i=0; i<dataProduct.length; i++){
            if (dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                   <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].prices}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
        `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table
}