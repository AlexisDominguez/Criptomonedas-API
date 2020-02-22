export class Api{
   constructor(apiKey){
      this.apiKey = apiKey;
   }

   async getCurrencies(){
      const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apiKey}`;

      const cryptoCurrencies = await fetch(url);

      const data = await cryptoCurrencies.json();

      return data;
   }
}