HmsApp.factory('ExpenseService', ['$http', function ($http) {
    var ExpenseService = {};


    ExpenseService.CreateCategory = function (categoryName) {
        return $http.post('/Expense/CreateCategory', { categoryName: categoryName});
    };

    ExpenseService.LoadCategories = function () {

        return $http.get('/Expense/LoadCategories');
    };

    ExpenseService.DeleteItem = function (expense) {
        expense.ExpenseCategory = null;
        return $http.post('/Expense/DeleteItem', { expense: expense });
    };

    ExpenseService.SaveItem = function (expense) {
        return $http.post('/Expense/SaveItem', { item: expense });
    };

    ExpenseService.LoadItems = function (CategoryId,StartDate,EndDate) {
        return $http.get('/Expense/LoadItems?categoryId=' + CategoryId + '&dateStart=' + StartDate + '&dateEnd=' + EndDate);
    };

    ExpenseService.LoadSingleExpenseItem = function (expenseId) {
        return $http.get('/Expense/LoadSingleExpenseItem?expenseId=' + expenseId);
    };


    

    return ExpenseService;
}]);