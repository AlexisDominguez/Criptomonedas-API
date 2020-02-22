import {Api} from "../js/api.js";
const api = new Api("6d7133eaf6aa5f37ff0c1c274a511d14a1c7d0b96cfb39cb6046aea411e3053e");

export class Ui{

   showMessage(message, type){
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(message));

      if(type === "error"){
         div.className = "alert bg-danger text-center";
      }

      const display = document.querySelector(".mensajes");
      display.innerHTML = "";
      display.appendChild(div);
   }

   selectOptions(){
      api.getCurrencies()
         .then(data => {

            const array = Object.entries(data.Data);

            const arrayKeys = [];
            
            for(let i = 0, n = array.length; i<n; i++){
               arrayKeys.push(array[i][0]);
            }

            const sortedArray = arrayKeys.sort();

            console.log(sortedArray)

         })
         .catch(error => console.log(error));
   }
}