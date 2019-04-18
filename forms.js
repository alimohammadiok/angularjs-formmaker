var app = angular.module('forms', ['ngRoute', 'ngAnimate', 'ngSanitize']);
app.config(function($routeProvider) {
  $routeProvider
  .when("/form_create", {
    templateUrl : "form_create.html"
  })
  .when("/red", {
    templateUrl : "red.htm"
  })
  .when("/green", {
    templateUrl : "green.htm"
  })
  .when("/blue", {
    templateUrl : "blue.htm"
  });
});

/* app.controller('typeCtrl', function($scope) {
	$scope.types = ["string", "number", "date", "datetime", "text"];
}); */

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
  
  $scope.someNumber = 12.5;
});

app.controller('FieldController', function($scope){
    $scope.appTitle = "Form Oluşturma Sayfası";
	//$scope.appHeadline = "Local Storage'e Kaydedilecek!";
	$scope.saved = localStorage.getItem('fields');
    $scope.fields = (localStorage.getItem('fields')!==null) ? JSON.parse($scope.saved) : 
    [ {fieldName: "Adı", done: false, type: "string", required: true},
     {fieldName: "Soyadı", done: false, type: "string", required: false} ];
	localStorage.setItem('fields', JSON.stringify($scope.fields));

	$scope.types = ["string", "number", "date", "datetime", "text"];
	//bu form icin:
	$scope.saved = localStorage.getItem('forms');
	$scope.forms = (localStorage.getItem('forms')!==null) ? JSON.parse($scope.saved) : 
	[ {name: "form1", fields:$scope.fields, done: false, description: "bu formdir", required: true},
	{name: "form2", fields:$scope.fields, done: false, description: "bu formd2 dir", required: true} ];
localStorage.setItem('forms', JSON.stringify($scope.forms));

	$scope.addField = function() {
		$scope.fields.push({
			fieldName: $scope.fieldText,
            done: false,
            type: $scope.type,
            required: $scope.required
		});
		//$scope.fieldText = ''; //clear the input after adding
		//localStorage.setItem('fields', JSON.stringify($scope.fields));
	};

	$scope.saveForm = function (){
		$scope.forms.push({
			name: $scope.formName,
			description: $scope.formDescription,
			fields: $scope.fields
		});
		$scope.fieldText = ''; //clear the input after adding
		localStorage.setItem('forms', JSON.stringify($scope.forms));
		};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.fields, function(field){
			count+= field.done ? 0 : 1;
		});
		return count;
	};

	$scope.archive = function() {
		var oldFields = $scope.fields;
		$scope.fields = [];
		angular.forEach(oldFields, function(field){
			if (!field.done)
				$scope.fields.push(field);
		});
		localStorage.setItem('fields', JSON.stringify($scope.fields));
	};

	$scope.removeForms = function() {
		var oldForms = $scope.forms;
		$scope.forms = [];
		angular.forEach(oldForms, function(form){
			if (!form.done)
				$scope.forms.push(form);
		});
		localStorage.setItem('forms', JSON.stringify($scope.forms));
	};

	$scope.openForm = function($formName) {
		var oldForms = $scope.forms;
		$scope.forms = [];
		angular.forEach(oldForms, function(form){
			if (!form.done)
				$scope.forms.push(form);
		});
		localStorage.setItem('forms', JSON.stringify($scope.forms));
	};
});

app.directive('numberFormat', function() {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      const amountOfDecimals = attr.step.split('.')[1].length;
      ngModel.$formatters.unshift((val) => {
        return parseFloat(val).toFixed(amountOfDecimals);
      })
      
    }
  };
})