angular.module('starter.controllers', ['ionic-datepicker', 'ionic.closePopup', 'rzModule'])

.controller('MenuCtrl', function($scope, $ionicPopup){
	$scope.showPopupShare = function() {
	  var popup = $ionicPopup.show({
		templateUrl: 'templates/menu/share.html',
		title: 'Invite using',
		cssClass: 'popup-share',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' }
		]
	  });
	$scope.closePopupShare = function(){popup.close()};
	};
})

.controller('shareApp', function($scope, $http){
	$http.get('js/data/share.json').then(function(response){
		$scope.shares = response.data
	});
})

.controller('HomeCtrl', function($scope, $timeout, ionicDatePicker, $ionicPopup) {
	$scope.dateInOut = {'datein':'2016-05-16','dateout':'2016-05-17'};
	var dateCheckIn = {
		callback: function (val) {
			var date = new Date(val);
			$scope.dateInOut.datein = new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());
			dateCheckIn.inputDate = $scope.dateInOut.datein;
		},
		from: new Date("2012-1-1"),
		to: new Date("2016-12-31"),
		inputDate: new Date($scope.dateInOut.datein),
		title: 'Check in on',
    };
    $scope.openDateCheckIn = function(){
      ionicDatePicker.openDatePicker(dateCheckIn);
    };
	var dateCheckOut = {
		callback: function (val) {
			var date = new Date(val);
			$scope.dateInOut.dateout = new Date(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());
			dateCheckOut.inputDate = $scope.dateInOut.dateout;
		},
		from: new Date("2012-1-1"),
		to: new Date("2016-12-31"),
		inputDate: new Date($scope.dateInOut.dateout),
		title: 'Check out on',
    };
    $scope.openDateCheckOut = function(){
      ionicDatePicker.openDatePicker(dateCheckOut);
    };

	$scope.numberRoom = 1;
	$scope.optionTravellers = {};
	$scope.showOptionTraveller = {};
	$scope.rangeRoom = function(num) {
		return new Array(num);   
	};
	$scope.choseOptionTraveller = function(name,value){
		$scope.showOptionTraveller[name] = 0;
		$scope.optionTravellers[name] = value;
	};
	$scope.addRoom = function(){
		$timeout(function(){
			$scope.numberRoom++;
			$scope.$apply();
		});
	};
	$scope.removeRoom = function(){
		$timeout(function(){
			$scope.numberRoom--;
			$scope.$apply();
		});
	};
	
	$scope.showPopupKind = function() {
	  var popup = $ionicPopup.show({
		templateUrl: 'templates/home/kind.html',
		title: 'Select the type of room',
		scope: $scope,
		cssClass: 'popup-kind',
		buttons: [
		  { text: 'CANCEL' },
		  {
			text: 'OK',
			type: 'balanced'
		  }
		]
	  });
	};
})

.controller('chatDetailCtrl', function($scope, $ionicPopup, IonicClosePopupService){
	$scope.showPopupChatPin = function() {
	var popup = $ionicPopup.show({
	cssClass: 'popup-chat-pin',
	buttons: [
      { text: 'Take a picture' },
      { text: 'Upload from gallery' }
    ]
	});
	IonicClosePopupService.register(popup);
	};
})

.controller('SignCtrl', function($scope, $state, $ionicPopup){
	$scope.user = {};
	$scope.signIn = function(){
		$scope.error = null;
		if(!$scope.user.email){
			$scope.error = 'email';
		} else if(!$scope.user.password){
			$scope.error = 'password';
		} else {
		var popup = $ionicPopup.confirm({
			title: 'Oops!',
			template: 'Invalid email/password',
			scope: null,
			cssClass: 'popup-confirm',
			buttons: [
			  {
				text: 'DISMISS',
				type: 'assertive float-right',
				onTap: function(e){	$state.go('app.home') }
			  }
			]
		});
		}
	};
	$scope.signUp = function(){
		$scope.error = null;
		if(!$scope.user.email){
			$scope.error = 'email';
		} else if(!$scope.user.password){
			$scope.error = 'password';
		} else {
			$state.go('app.sign')
		}
	};
})

.controller('AreaCtrl', function($scope, $http, $ionicModal){
	$scope.areacodeSelected = "+91";
	
	$ionicModal.fromTemplateUrl('templates/sign/areacode.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalAreaCode = modal;
	});
	$scope.openModalAreaCode = function() {
		$scope.modalAreaCode.show();
	};
	$scope.closeModalAreaCode = function() {
		$scope.modalAreaCode.hide();
	};

	$http.get('js/data/areacode.json').then(function(response){
		$scope.areacode = response.data;
	})
})

.controller('BookingCtrl', function($scope, $http, $state, $ionicModal){
	$http.get('js/data/booking.json').then(function(response){
		$scope.booking = response.data
	});
	$scope.viewBooking = function(bookingStatus){
		if(bookingStatus != 'Paid'){
			var bookingLink = "app.bookingDetail"+bookingStatus;
			$state.go(bookingLink);
		}
	};
	
	$ionicModal.fromTemplateUrl('templates/booking/select-time.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalSelectTime = modal;
	});
	$scope.openModalSelectTime = function() {
		$scope.modalSelectTime.show();
	};
	$scope.closeModalSelectTime = function() {
		$scope.modalSelectTime.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/booking/cancel.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalCancelBooking = modal;
	});
	$scope.openModalCancelBooking = function() {
		$scope.modalCancelBooking.show();
	};
	$scope.closeModalCancelBooking = function() {
		$scope.modalCancelBooking.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/booking/payment.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalPayment = modal;
	});
	$scope.openModalPayment = function() {
		$scope.modalPayment.show();
	};
	$scope.closeModalPayment = function() {
		$scope.modalPayment.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/booking/select-bank.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalSelectBank = modal;
	});
	$scope.openModalSelectBank = function() {
		$scope.modalSelectBank.show();
	};
	$scope.closeModalSelectBank = function() {
		$scope.modalSelectBank.hide();
	};
})

.controller('searchCtrl', function($scope, $http, $ionicModal){
	$http.get('js/data/search.json').then(function(response){
		$scope.searchs = response.data
	});
	
	$ionicModal.fromTemplateUrl('templates/search/sort.html', {
    scope: $scope,
	animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalSearchSort = modal;
	});
	$scope.openModalSearchSort = function() {
		$scope.modalSearchSort.show();
	};
	$scope.closeModalSearchSort = function() {
		$scope.modalSearchSort.hide();
	};
	
	$scope.rangeSlider = {
		min: 500,
		max: 5500,
		options: {
			floor: 500,
			ceil: 8000,
			step: 1
		}
	};
	$scope.filterNumber = {'guest':1,'room':1};
	$scope.minusGuest = function(){
		if($scope.filterNumber.guest > 1) $scope.filterNumber.guest--;
	}
	$scope.plusGuest = function(){
		$scope.filterNumber.guest++;
	}
	$scope.minusRoom = function(){
		if($scope.filterNumber.room > 1) $scope.filterNumber.room--;
	}
	$scope.plusRoom = function(){
		$scope.filterNumber.room++;
	}
})

.controller('detailCtrl', function($scope, $http, $ionicPopup, IonicClosePopupService, $timeout, $state){
	$http.get('js/data/service.json').then(function(response){
		$scope.services = response.data;
	});
	$scope.applyCoupon = function(){
		if(!$scope.applyCouponed) {
			$scope.detailCouponError = true;
			$scope.applyCouponed = true
		} else {
			$scope.detailCouponError = false;
			$scope.couponStatus = true;
		}
	};

	$scope.showPopupPrimaryGuest = function() {
	var popup = $ionicPopup.show({
	templateUrl: 'templates/detail/primary-guest.html',
	cssClass: 'popup-primary-guest',
	buttons: [
      {
		text: 'UPDATE DETAILS',
		type: 'balanced'
	  },
      { text: 'DISCARD' }
    ]
	});
	IonicClosePopupService.register(popup);
	};
	
	$scope.booking = function(){
		$scope.detailBooking = true;
		$timeout(function(){
			$scope.detailBooking = false;
			$scope.detailBooked = true
		},2000);
		$timeout(function(){ $state.go('app.bookingConfirmed') },2500);
	};
})

;