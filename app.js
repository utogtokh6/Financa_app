//Дэлгэцтэй ажиллах контроллер
var uiController = (function () {

    var DOMsrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMsrings.inputType).value,
                description: document.querySelector(DOMsrings.inputDescription).value,
                value: document.querySelector(DOMsrings.inputValue).value
            }
        },

        getDOMStrings: function () {
            return DOMsrings;
        }
    }
})();

//Санхүүтэй ажиллах контроллер
var financeController = (function () {

    var income = function (id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var expense = function (id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // var incomes = [];
    // var expenses = [];

    // var totalIncomes = 0;
    // var totalExpenses = 0;

    var data = {
        allItems:{
            inc: [],
            exp:[]
        },
        totals: {
            inc:0,
            exp:0
        }
    }

 })();

//Прогрхмын холбогч контроллер
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        // 1. оруулах өгөгдлийг дэлгэцээс олж авна
        console.log(uiController.getInput());
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
    };

    var setupEventListners = function () {
        var DOM = uiController.getDOMStrings();
        document.querySelector(DOM.addBtn).addEventListener('click', function () {
            ctrlAddItem();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                ctrlAddItem();
            }
        });
    };

    return {
        init: function () {
            console.log('Application started...');
            setupEventListners();
        }
    };
})(uiController, financeController);

appController.init();
