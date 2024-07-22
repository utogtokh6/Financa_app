//Дэлгэцтэй ажиллах контроллер
var uiController = (function () {

    var DOMsrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container"

    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMsrings.inputType).value,
                description: document.querySelector(DOMsrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMsrings.inputValue).value)
            }
        },

        getDOMStrings: function () {
            return DOMsrings;
        },

        clearFields: function(){
        var fields = document.querySelectorAll(DOMsrings.inputDescription + ", " + DOMsrings.inputValue);
        // convert feilds List to Array
        var fieldsArr= Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(el){
        el.value = "";
        });
           fieldsArr[0].focus();

        },

        // return {
        //     tusuv: data.tusuv,
        //     huvi: data.huvi,
        //     totalInc: data.totals.inc,
        //     totalExp: data.totals.exp
        // }

        tusviigUzuuleh: function(tusuv){
        document.querySelector(DOMsrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMsrings.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMsrings.expenseLabel).textContent = tusuv.totalExp;
        document.querySelector(DOMsrings.percentageLabel).textContent = tusuv.huvi + '%';

        },

        deleteListItem: function(id){

            var el = document.getElementById(id);
            el.parentNode.removeChild(el);

        },

        addListItem: function(item, type){
            // Orlogo zarlagiin elementiig aguulsan html-iig beltgene.
            var html, list;
            if (type === 'inc'){
                list = DOMsrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else {
                list = DOMsrings.expenseList
                html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // console.log(list);
            //Ter HTML dotroo zarlagiin utguudiig REPLACE ashiglaj uurchilj ugnu.
            html = html.replace('%id%', item.id);
            html = html.replace('%DESCRIPTION%', item.description);
            html = html.replace('%VALUE%', item.value);
            //Beltgesen HTML- ee DOM-ruu hiij ugnu
            document.querySelector(list).insertAdjacentHTML('beforeend',html);

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

    var calculateTotal = function(type){
        var sum =0;
        data.items[type].forEach(function(el){sum = sum + el.value});
        data.totals[type]=sum;

    }
    var data = {
        items:{
            inc: [],
            exp:[]
        },
        totals: {
            inc:0,
            exp:0
        },

        tusuv: 0
    }

    return {
        tusuvTootsooloh: function(){
        //niit orlogo
        calculateTotal('inc');
        //niit zarlaga
        calculateTotal('exp');
        //niit tusuv
        data.tusuv = data.totals.inc -data.totals.exp;
        //niit zarlagiin huviig tootsoolno
        data.huvi=Math.round((data.totals.exp/data.totals.inc)*100);

        },

        tusuvAvah: function(){
        return {
            tusuv: data.tusuv,
            huvi: data.huvi,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp
        }
        },


        deleteItem: function(type, id){
            // data-s zuvhun object-uudiin ID-g avaad massivd hiine.
            var ids = data.items[type].map(function(el){
                return el.id;
            });
            // console.log('ids: ' + ids);
            var index = ids.indexOf(id);

            // console.log('index: ' + index);
        // indexOf function ni massiv-d bhgui utgiig ugvul -1 gesen ugta butsaadag tul -1-s busad tohioldold ustgana
        if(index !== -1){

            // console.log('index: ' + index + ' deer bgaa elementiig ustgah gej bna');
            data.items[type].splice(index,1)
        }

        },

        addItem: function(type, desc, val){
            var item, id;
            // console.log(data);
            if(data.items[type].length === 0) {
                id = 1;
            } else {
            id = data.items[type][data.items[type].length-1 ].id + 1;
            }

            if(type === 'inc'){
                item = new income(id, desc ,val);
            } else {
                item = new expense(id, desc,val);
            }

            data.items[type].push(item);
            return item;
        },
        seeData: function(){
            return data;
        }
    }
 })();

//Прогрхмын холбогч контроллер
var appController = (function (uiController, financeController) {
    var ctrlAddItem = function () {
        // 1. оруулах өгөгдлийг дэлгэцээс олж авна
        var input = uiController.getInput();

        if(input.description !== "" && input.value !== ""){
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.

        var item = financeController.addItem(input.type, input.description, input.value);
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.

        uiController.addListItem(item, input.type);

        uiController.clearFields();
        // 4. Төсвийг тооцоолно.
        financeController.tusuvTootsooloh();
        // 5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
        var tusuv = financeController.tusuvAvah();

        // 6. Төсвийн тооцоог дэлгэцэнд гаргана.
        uiController.tusviigUzuuleh(tusuv);
        // console.log(tusuv);
        }

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
        document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
            //ustgah x tovchiin parentNode^5 deer ID bgaag gargaj avch huvisagchid ugch bna...
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
            // console.log(id);

            if(id){
               // gargaj avsan inc-1, exp-3 geh formattai id-g split-r salgaj avna
                var arr = id.split('-');
                var type = arr[0];
                var itemId = parseInt(arr[1]);

                            // console.log(type + ' ===> ' + itemId)

            // 1. Sankhuugiin module-s type, id ashiglaad ustgana.
            financeController.deleteItem(type, itemId)
            // 2. Delgets deerees ene elementiig ustgana

            uiController.deleteListItem(id);

            // 3. Uldegdel tootsoog shinechilj haruulna6
            }




        });

    };

    return {
        init: function () {
            console.log('Application started...');
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0});
            setupEventListners();
        }
    };
})(uiController, financeController);

appController.init();
