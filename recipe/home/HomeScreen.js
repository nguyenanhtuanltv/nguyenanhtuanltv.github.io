import { recipes } from '../data/dataArrays.js';
import { getCategoryName } from '../data/MockDataAPI.js';

class HomeScreen {
  
  render() {
    let html=`<h3 class="pl-1 text-success">Recipes</h3><div class="row pl-1">`;
    recipes.forEach((item,index)=>{
      html+= `<div class="col-6 col-md-4 col-xl-3 p-1">
                <div class="card text-center">
                    <img class="card-img-top rounded-top" src="${item.photo_url}" alt="" style="height:14.5rem">
                    <div class="card-body">
                        <h5 class="card-title"><strong>${item.title}</strong></h5>
                        <p class="card-text text-danger">${getCategoryName(item.categoryId)}</p>
                    </div>
                </div>
            </div>`
    })
    html+="</div>"
    document.querySelector("#main").innerHTML=html
  }
}

var home = new HomeScreen
export default home;
