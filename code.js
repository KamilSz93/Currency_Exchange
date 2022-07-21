window.onload = function () {
    exchange.init();
};

class Exchange {

    inputSum = null;

    sumDoExchange = null;

    currencyExchange = null;
    
    url = null;

    currencyExchangeRate = null;

    init() {
    
       this.inputSum = document.querySelector("#currencyDoExchange");

       this.inputSum.addEventListener("input",  this.getDate);

       document.querySelector("select").
          addEventListener("change", this.getDate);
    };

    getDate = () => {

        this.sumDoExchange = this.inputSum.value;

        this.currencyExchange = document.querySelector("select").value;

        if (this.currencyExchange != "0") {
        
            this.url = `http://api.nbp.pl/api/exchangerates/rates/a/${this.currencyExchange}/`;
        
            fetch(this.url)
                .then((response) => response.json())
                .then((response) => {
                    this.currencyExchangeRate = response.rates[0].mid;
                    this.calculate();
                });
        } else {
          
            this.clear();
        };
    };

    calculate = () => {

        if (! isNaN(this.sumDoExchange) && this.sumDoExchange) {
            
            let result = this.sumDoExchange / this.currencyExchangeRate;

            this.ui(result);

        } else {

            this.clear();
        };
    };

    ui(result) {

        document.querySelector("#result").value = result;

    };
    clear() {

        document.querySelector("#result").value = "";
        
    };
};

const exchange = new Exchange();