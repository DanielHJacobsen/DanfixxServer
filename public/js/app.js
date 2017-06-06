
var testSample = angular.module("testSample", ['ui.bootstrap', 'sampleSrv']);



var	AppCtrl	=	['$scope',	'dialogServices', 'dataServices',
function AppCtrl($scope,	dialogServices, dataServices)	{
 		

	
	
	// init UI data model
	$scope.p = 
		{ day:'MONDAY', hour:'22', minute: '10', user_1:'HOME', user_2:'HOME', user_3:'HOME', weather: 'FOG', avg_outside_temp: '8' };
		
	$scope.scoreLivingRoom = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'livingroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.scoreKitchen = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'kitchen';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
		
	$scope.scoreBedroom = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'bedroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.scoreGuest = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'guestroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.scoreBathroom = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'bathroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.scoreDiningRoom = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'diningroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.scoreGamingRoom = function()	{
	// context ID is a configuration constant in this example
	$scope.context = 'gamingroom';
		dataServices.getScore($scope.context, $scope.p)
		.then(
			function(rtn) {
				if (rtn.status == 200){
					// success
					$scope.showResults(rtn.data);
				} else {
					//failure
					$scope.showError(rtn.data.message);
				}
			},
			function(reason) {
				$scope.showError(reason);
			}
		);
	};
	
	$scope.showResults = function(rspHeader, rspData) {
		dialogServices.resultsDlg(rspHeader, rspData).result.then();
	}
		
	$scope.showError = function(msgText) {
		dialogServices.errorDlg("Error", msgText).result.then();
	}
}]

var	ResultsCtrl = ['$scope',	'$modalInstance',	'rspHeader', 'rspData',
function ResultsCtrl($scope,	$modalInstance, rspHeader, rspData) {
	$scope.rspHeader = rspHeader;
	$scope.rspData = rspData;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

var	ErrorCtrl = ['$scope',	'$modalInstance',	'msgTitle',	'message',
function ErrorCtrl($scope,	$modalInstance,	msgTitle,	message) {

	$scope.msgTitle	=	msgTitle;
	$scope.message = message;
	
	$scope.cancel	=	function() {
		$modalInstance.dismiss();
	}
}]

testSample.controller("AppCtrl",	AppCtrl);
testSample.controller("ResultsCtrl", ResultsCtrl);
testSample.controller("ErrorCtrl", ErrorCtrl);


