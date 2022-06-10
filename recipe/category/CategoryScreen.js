import { categories } from '../data/dataArrays.js';
import { getNumberOfRecipes, getRecipes, getCategoryName, getCategoryById, getIngredientName,getIngredientUrl } from '../data/MockDataAPI.js';

class CategoryScreen {
    render() {
        let html=``
        html = `<h3 class="pl-1 text-success">Categories</h3><div class="row pl-1">`;
        categories.forEach((item, index) => {
            html += `<div class="col-12 col-md-6 col-xl-6 p-1" style="cursor: pointer" >
                  <div class="card text-center" id=${item.id} style="border-top-left-radius: 30px!important ; border-top-right-radius: 30px!important;">
                      <img class="card-img-top rounded-top" src="${item.photo_url}" alt="" style="height:14.5rem;border-top-left-radius: 30px!important ; border-top-right-radius: 30px!important; ">
                      <div class="card-body">
                          <h5 class="card-title" ><strong>${item.name}</strong></h5>
                          <p class="card-text text-danger">${getNumberOfRecipes(item.id)} recipes</p>
                      </div>
                  </div>
              </div>`
        })
        html += "</div>"
        document.querySelector("#main").innerHTML = html
        document.querySelectorAll(".card").forEach((card, index) => {
            card.addEventListener("click", () => { 
                let id=card.getAttribute("id")
                this.RecipesList(id) 
            })
        })
        document.querySelector("#footer").classList.remove('fixed-bottom')
    }
    RecipesList(index) {
        let categori = getCategoryById(index)
        let recipes = getRecipes(categori.id)
        let html=``
        html += `<div class="col-12"   style="cursor: pointer;" onclick="Category.click()">
        <img src="images/backArrow.png" style="width:25px;height:25px; float:left"  />
        <h3 class="ml-5 text-success">${categori.name}</h3>
        </div>
        <div class="row pl-1">`;
        recipes.forEach((item, index) => {
            html += `<div class="col-6 col-md-4 col-xl-3 p-1" style="cursor: pointer">
                <div class="card text-center">
                    <img class="card-img-top rounded-top" src="${item.photo_url}" alt="" style="height:14.5rem">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${item.title}</strong></h5>
                        <p class="card-text text-danger">${getCategoryName(item.categoryId)}</p>
                    </div>
                </div>
            </div>`
        })
        html += "</div>"
        document.querySelector("#main").innerHTML = html
        document.querySelector("#footer").classList.add('fixed-bottom')
        document.querySelectorAll(".card").forEach((repice, index) => {
            repice.addEventListener("click", () => {
                this.Recipe(recipes[index])
            })
        })
    }

    Recipe(recipe) {
        let item = recipe
        let category = getCategoryById(item.categoryId);
        let title = getCategoryName(category.id);
        let hinh=``
        item.photosArray.forEach(h=>{
            hinh+=`<img src="${h}" style="width:170px;height:110px" class="mr-1 img-thumbnail" />`
        })
        let html=``
        html+=`<div class="col-12" id="recipe" style="cursor: pointer;">
        <img src="images/backArrow.png" style="width:25px;height:25px; float:left"  />
        <h3 class="ml-5 text-success">${item.title}</h3>
        </div>`
        html+=`
        <div class="row pl-1">
            <div class="col-12 col-md-4 col-xl-4 p-1" style="cursor: pointer">
                    <div class="card text-center">
                        <img class="card-img-top" src="${item.photo_url}" alt="">
                    </div>
            </div>
            <div class="col-12 col-md-8 col-xl-8 p-1" style="cursor: pointer">
                    <div class="card text-center">
                        <div class="card-body">
                            <h2 class="text-success">${item.title}</h2>
                            <h4 class="card-text text-danger text-uppercase">${getCategoryName(item.categoryId)}</h4>
                            <p><i class="fa fa-clock-o" aria-hidden="true"></i> ${item.time} minutes</p>
                            <a class="btn btn-sm btn-danger btn-block display-2" href="javaScript:void(0)" id="Ingredients" >Ingredients for  ${ item.title}</a>
                            <div class="text-justify">${item.description}</div>
                            <div class="text-left mt-2 p-2" >${hinh}</div>
                        </div>
                    </div>
            </div>
        </div>    
        `
        document.querySelector("#main").innerHTML = html
        document.querySelector("#recipe").onclick=()=>{
            this.RecipesList(item.categoryId)
        }
        document.querySelector("#footer").classList.add('fixed-bottom')
        document.querySelector("#Ingredients").onclick=()=>{
            this.Ingredient(item.ingredients,item.title)
        }
    }

    Ingredient(ingredients,title){
        modalTitle.innerHTML=`Ingerdients for ${title}`
        let html=`<div class="row">`
        ingredients.forEach(item=>{
            let url=getIngredientUrl(item[0])
            let name=getIngredientName(item[0])
            html+=`<div class="col-4 col-md-4 col-xl-3">
                <div class="crad v-100 text-center">
                <img src="${url}" class="img-thumbnail rounded-circle" style="width:95px;height:80px" >
                <p><strong>${name}</strong></p>
                ${item[1]}
                </div>
            </div>`
        })
        html+=`</div>`
        modalBody.innerHTML=html
        modalShow.click()
    }
}

var categori = new CategoryScreen;
export default categori;