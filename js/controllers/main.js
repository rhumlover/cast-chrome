// Generated by CoffeeScript 1.6.3
/*
@constructor
@param {angular.Scope} $scope The scope.
*/


(function() {
  DMCast.controller('MainCtrl', function($scope) {
    /*
    The Cast API object.
    
    @type {?cast.Api}
    */

    $scope.castApi = null;
    /*
    @type {boolean}
    */

    $scope.castApiDetected = false;
    /*
    @type {boolean}
    */

    $scope.showReceiverPicker = false;
    /*
    @type {boolean}
    */

    $scope.showActivityControls = false;
    /*
    The Cast application name to launch.
    
    @type {?string}
    */

    $scope.appName = null;
    /*
    Parameters to pass with the cast.LaunchRequest.
    
    @type {?string}
    */

    $scope.launchParameters = null;
    /*
    The set of available Cast receivers.
    
    @type {Array.<cast.Receiver>}
    */

    $scope.receiverList = [];
    /*
    The id for the launched activity.
    
    @type {?string}
    */

    $scope.activityId = null;
    /*
    The last status reported by the activity.
    
    @type {?string}
    */

    $scope.activityStatus = null;
    /*
    The current media volume.
    
    @type {number}
    */

    $scope.mediaVolume = 0.5;
    /*
    The last MediaPlayerStatus reported by the activity.
    
    @type {cast.MediaPlayerStatus}
    */

    $scope.mediaStatus = null;
    /*
    Whether the activity supports pause.
    
    @type {boolean}
    */

    $scope.hasPause = false;
    /*
    @type {?string}
    */

    $scope.errorMessage = null;
    /*
    Handles a Cast "Hello" message from the window.
    
    @param {Event} event The event.
    */

    $scope.onWindowMessage = function(event) {
      if (event.source === window && event.data && event.data.source && event.data.source === cast.NAME && event.data.event && event.data.event === "Hello") {
        return $scope.initializeApi();
      }
    };
    $scope.initializeApi = function() {
      if (!$scope.castApi) {
        $scope.castApi = new cast.Api();
        $scope.castApi.logMessage("Cast API initialized.");
        $scope.castApiDetected = true;
        $scope.$watch("mediaVolume", function() {
          return $scope.setMediaVolume();
        }).bind($scope);
        return $scope.$apply();
      }
    };
    /*
    Sets the application name that will be launched.
    */

    $scope.setApplication = function() {
      if ($scope.appName) {
        $scope.castApi.addReceiverListener($scope.appName, $scope.onReceiverUpdate);
        return $scope.showReceiverPicker = true;
      } else {
        return $scope.castApi.logMessage("Application name not set.");
      }
    };
    /*
    Handles a receiver list update from the Cast API.
    @param {Array.<cast.Receiver>} receivers The receiver list.
    */

    $scope.onReceiverUpdate = function(receivers) {
      $scope.castApi.logMessage("Got receiver list.");
      $scope.receiverList = receivers;
      return $scope.$apply();
    };
    /*
    Returns a callback to handle a activity status result.
    
    @param {string} originalAction The original action.
    @return {function(cast.ActivityStatus)} A result callback.
    */

    $scope.getResultCallback = function(originalAction) {
      return function(status) {
        if (status.status === "error") {
          $scope.errorMessage = status.errorString;
          return $scope.$apply();
        } else {
          switch (originalAction) {
            case "stopActivity":
              $scope.activityId = null;
              return $scope.showActivityControls = false;
            case "getActivityStatus":
              $scope.activityStatus = status.status;
              return $scope.$apply();
            case "launchActivity":
              $scope.activityId = status.activityId;
              $scope.activityStatus = status.status;
              $scope.showActivityControls = true;
              $scope.getMediaStatus();
              return $scope.$apply();
          }
        }
      };
    };
    /*
    Returns a callback to handle a media status result.
    
    @param {string} originalAction The original action.
    @return {function(cast.MediaResult)} A result callback.
    */

    $scope.getMediaResultCallback = function(originalAction) {
      return function(result) {
        if (!result.success) {
          $scope.errorMessage = result.errorString;
        } else {
          switch (originalAction) {
            case "playMedia":
            case "pauseMedia":
            case "muteMedia":
            case "loadMedia":
            case "unmuteMedia":
            case "setMediaVolume":
            case "getMediaStatus":
              $scope.mediaStatus = result.status;
              $scope.hasPause = result.status && (result.status.hasPause != null);
          }
        }
        return $scope.$apply();
      };
    };
    /*
    Handles a stop activity request.
    */

    $scope.stopActivity = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.stopActivity($scope.activityId, $scope.getResultCallback("stopActivity"));
    };
    /*
    Handles a play media request.
    */

    $scope.playMedia = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.playMedia($scope.activityId, new cast.MediaPlayRequest(), $scope.getMediaResultCallback("playMedia"));
    };
    /*
    Handles a pause media request.
    */

    $scope.pauseMedia = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.pauseMedia($scope.activityId, $scope.getMediaResultCallback("pauseMedia"));
    };
    /*
    Handles a mute media request.
    */

    $scope.muteMedia = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.setMediaVolume($scope.activityId, new cast.MediaVolumeRequest($scope.mediaVolume, true), $scope.getMediaResultCallback("muteMedia"));
    };
    /*
    Handles an unmute media request.
    @private
    */

    $scope.unmuteMedia = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.setMediaVolume($scope.activityId, new cast.MediaVolumeRequest($scope.mediaVolume, false), $scope.getMediaResultCallback("unmuteMedia"));
    };
    /*
    Handles a set media volume request.
    */

    $scope.setMediaVolume = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.setMediaVolume($scope.activityId, new cast.MediaVolumeRequest($scope.mediaVolume, false), $scope.getMediaResultCallback("setMediaVolume"));
    };
    /*
    Handles a get media status request.
    */

    $scope.getMediaStatus = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.getMediaStatus($scope.activityId, $scope.getMediaResultCallback("getMediaStatus"));
    };
    /*
    Handles get-activity-status user requests.
    */

    $scope.getActivityStatus = function() {
      if (!$scope.activityId) {
        return;
      }
      return $scope.castApi.getActivityStatus($scope.activityId, $scope.getResultCallback("getActivityStatus"));
    };
    /*
    Launch application on the selected receiver.
    @param {cast.Receiver} receiver The receiver.
    */

    $scope.launchActivityAt = function(receiver) {
      var request, resultCallback;
      if (!$scope.appName) {
        $scope.castApi.logMessage("Application name not set");
        return;
      }
      if ($scope.activityId) {
        $scope.stopActivity();
      }
      $scope.errorMessage = null;
      $scope.activityStatus = null;
      $scope.mediaStatus = null;
      resultCallback = $scope.getResultCallback("launchActivity");
      request = new cast.LaunchRequest($scope.appName, receiver);
      if ($scope.launchParameters) {
        request.parameters = $scope.launchParameters;
      }
      return $scope.castApi.launch(request, resultCallback);
    };
    if ((window.cast != null) && cast.isAvailable) {
      return $scope.initializeApi();
    } else {
      return window.addEventListener("message", $scope.onWindowMessage, false);
    }
  });

}).call(this);
