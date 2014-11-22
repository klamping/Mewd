/*globals store:false*/
angular.module('moodTracker')
.factory('store', function ($ionicPlatform, $q) {
    var isPro = false;
    var deferred = $q.defer();

    var initializeStore = function () {
        // Let's set a pretty high verbosity level, so that we see a lot of stuff
        // in the console (reassuring us that something is happening).
        store.verbosity = store.INFO;

        store.register({
            id:    'proyearly',
            alias: 'proyearly',
            type:  store.PAID_SUBSCRIPTION
        });

        store.when('proyearly').approved(function (order) {
            console.log('approved', order);
            order.finish();
        });

        store.when('proyearly').updated(function(p) {
            isPro = p.owned;
            deferred.resolve(isPro);
        });

        store.error(function(error) {
            console.log('ERROR ' + error.code + ': ' + error.message);
        });

        // After we've done our setup, we tell the store to do
        // it's first refresh. Nothing will happen if we do not call store.refresh()
        store.refresh();
    };

    $ionicPlatform.ready(function() {
        if (_.has(window, 'store')) {
            initializeStore();
        } else {
            deferred.resolve(true);
        }
    });

    return {
        isSubscribed: function () {
            return deferred.promise;
        },
        subscribe: function () {
            store.order('proyearly');
        }
    };
});