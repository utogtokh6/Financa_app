//Дэлгэцтэй ажиллах контроллер
var uiController = (function () { })();

//Санхүүтэй ажиллах контроллер
var financeController = (function () { })();

//Прогрхмын холбогч контроллер
var appController = (function (uiController, financeController) {

    var ctrlAddItem = function () {
        // 1. оруулах өгөгдлийг дэлгэцээс олж авна
        console.log("Дэлгэцээс өгөгдлөө авах хэсэг")
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. Төсвийг тооцоолно.
        // 5. Эцсийн үлдэгдэл тооцоог дэлгэцэнд гаргана.
    };

    document.querySelector(".add__btn").addEventListener('click', function () {
        alert("clicked add__btn");
        ctrlAddItem();


    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            ctrlAddItem();
        }
    });




})(uiController, financeController);
