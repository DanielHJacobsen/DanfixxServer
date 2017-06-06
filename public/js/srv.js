var sampleSrv = angular.module("sampleSrv", []);

sampleSrv.factory("dataServices", ['$http',
	function($http) {

		this.getScore = function(context , p) {
			/* create the scoring input object */
			var input = {
				tablename: 'scoreinput.csv',
				header: ['day', 'hour', 'minute', 'user_1', 'user_2', 'user_3', 'weather', 'avg_outside_temp'],
				data: [
					[p.day, p.hour, p.minute, p.user_1, p.user_2, p.user_3, p.weather, p.avg_outside_temp]
				]
			};

			/* call	scoring service	to generate results */
			


				return $http({
						method: "post",	
						url: "score",
						data: {
							context: context,
							input: input
						}
					})
					.success(function(data, status, headers, config) {
						return data;
					})
					.error(function(data, status, headers, config) {
						return status;
					});
			}
		

		return this;
	}

]);

sampleSrv.factory("dialogServices", ['$modal',
	function($modal) {

		this.resultsDlg = function(r) {
			return $modal.open({
				templateUrl: 'partials/scoreResults.html',
				controller: 'ResultsCtrl',
				size: 'lg',
				resolve: {
					rspHeader: function() {
						return r[0].header;
					},
					rspData: function() {
						return r[0].data;
					}
				}
			});
		}

		this.errorDlg = function(msgTitle, msgText) {
			return $modal.open({
				templateUrl: 'partials/error.html',
				controller: 'ErrorCtrl',
				size: 'lg',
				resolve: {
					msgTitle: function() {
						return msgTitle;
					},
					message: function() {
						return msgText;
					}
				}
			});
		}

		return this;
	}
]);