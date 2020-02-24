import {Ui} from "../js/ui.js";
import {Api} from "../js/api.js";

// Instancia de la clase interfaz
const ui = new Ui();
ui.selectOptions();     // Se encarga de agregar las criptomonedas al <select>

const form = document.querySelector("#formulario");
// Se encarga de procesar los datos del formulario
form.addEventListener("submit", e =>{
   e.preventDefault();

   const currency = document.querySelector("#moneda");
   const selectedCurrency = currency.options[currency.selectedIndex].value;

   const cryptoCurrency = document.querySelector("#criptomoneda");
   const selectedCryptoCurrency = cryptoCurrency.options[cryptoCurrency.selectedIndex].value;

   //Muestra un error en caso de que no se seleccionen ambas opciones
   if(selectedCurrency === "" || selectedCryptoCurrency === ""){

      ui.showMessage("Por favor, selecciona ambas opciones.", "error");

   }else{
      
      const api = new Api("6d7133eaf6aa5f37ff0c1c274a511d14a1c7d0b96cfb39cb6046aea411e3053e");

      // Se encarga de realizar el intercambio de divisas
      api.getCurrenciesExchange(selectedCurrency, selectedCryptoCurrency)
         .then(data => {

            ui.showExchangeRate(data.RAW, selectedCurrency, selectedCryptoCurrency);

         })
         .catch(error =>{
            const errorMessage = document.querySelector("#resultado");
            errorMessage.className = "alert bg-danger text-center";

            errorMessage.innerHTML = `
               <p class="text-light text-center">
                  ¡Ha ocurrido un error mientras se procesaban los datos!<br>
                  Por favor, contacta al programador de este sitio web.<br>
                  Código de error: ${error};
               </p>
            `;

         });
   }
});