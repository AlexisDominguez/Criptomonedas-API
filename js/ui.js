import {Api} from "../js/api.js";

const api = new Api("6d7133eaf6aa5f37ff0c1c274a511d14a1c7d0b96cfb39cb6046aea411e3053e");

export class Ui{

   // Se encarga de mostrar un mensaje
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

   // Se encarga de agregar las opciones (criptomonedas) al <select>
   selectOptions(){
      api.getCurrencies()
         .then(data => {

            const array = Object.entries(data.Data);  // Convierte los datos de objeto a arreglo

            array.sort();   //ORDENA LOS DATOS POR EL VALOR KEY Y NO POR EL VALOR CoinName

            const select = document.querySelector("#criptomoneda");
            
            // Se encarga de agregar cada una de las criptomonedas al <select>
            for(let i = 0, n = array.length; i<n; i++){
               const option = document.createElement("option");
               option.value = array[i][1].Symbol;
               option.appendChild(document.createTextNode(array[i][1].CoinName));
               select.appendChild(option);
            }

         })
         .catch(error => console.log(error));
   }

   // Se encarga del procesado de información entre las divisas seleccionadas
   // Se encarga de mostrar los resultados
   showExchangeRate(data, currency, cryptoCurrency){
      // Selección de los datos
      const symbol    = data[cryptoCurrency][currency].FROMSYMBOL;
      const coin      = data[cryptoCurrency][currency].TOSYMBOL
      const price     = data[cryptoCurrency][currency].PRICE.toFixed(2);
      const variation = data[cryptoCurrency][currency].CHANGEPCTDAY.toFixed(5);
      
      // Procesado de la fecha; conversión de formato UNIX a formato Local en México
      const update = new Date(data[cryptoCurrency][currency].LASTUPDATE * 1000).toLocaleDateString("es-MX");
      
      // Limpia la plantilla HTML para evitar que se generen divs de forma constante
      let htmlTemplate = ``;

      // Definición de la estructura de la plantilla HTML
      htmlTemplate = `
         <div class="card bg-warning">
            <div class="card-body text-light">
               <h2 class="card-title">Resultado:</h2>
               <p>El precio de ${symbol} a ${coin} es igual a ${price} </p>
               <p>Variación del último día: %${variation}</p>
               <p>Última actualización: ${update} </p>
            </div>
         </div>
      `
      // Muestra el spinner de carga
      this.loadSpinner("block")

      // En caso de haber un mensaje de error, limpia el mensaje
      document.querySelector(".mensajes").innerHTML = "";

      // Muestra el spinner de carga durante 4 segundos, después de eso
      // lo oculta y muestra el resultado
      setTimeout(() => {
         this.loadSpinner("none");
         
         const result = document.querySelector("#resultado");
         result.innerHTML = htmlTemplate;
         result.className = "";
         result.style.display = "block";
      },4000)
   }

   // Se encarga de mostrar el spinner de carga
   loadSpinner(display){
      document.querySelector(".contenido-spinner").style.display = display;
      document.querySelector("#resultado").style.display = "none";
   }
}