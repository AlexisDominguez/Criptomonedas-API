export class Api{
   constructor(apiKey){
      this.apiKey = apiKey;   // Se define al apiKey en el constructor
   }

   // Se encarga de obtener las critomonedas
   async getCurrencies(){
      const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;

      const cryptoCurrencies = await fetch(url);

      const data = await cryptoCurrencies.json();

      return data;
   }

   // Se encarga de obtener el intercambio de divisas
   async getCurrenciesExchange(currency, cryptoCurrency){
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}&api_key=${this.apiKey}`;

      const currenciesExchange = await fetch(url);

      const data = await currenciesExchange.json();

      return data;
   }
}