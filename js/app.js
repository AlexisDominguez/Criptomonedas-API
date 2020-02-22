import {Ui} from "../js/ui.js";

const form = document.querySelector("#formulario");
form.addEventListener("submit", e =>{
   e.preventDefault();

   const currency = document.querySelector("#moneda");
   const selectedCurrency = currency.options[currency.selectedIndex].value;

   const cryptoCurrency = document.querySelector("#criptomoneda");
   const selectedCryptoCurrency = cryptoCurrency.options[cryptoCurrency.selectedIndex].value;

   if(selectedCurrency === "" || selectedCryptoCurrency === ""){
      const ui = new Ui();
      ui.showMessage("Por favor, selecciona ambas opciones.", "error")
   }else{
      // Ejecuta la API de criptomonedas
   }
});

const ui = new Ui();
ui.selectOptions();