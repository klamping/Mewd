angular.module('moodTracker')
.factory('LocalRecords', function ($q, $localStorage) {
    return function (records) {
        if (_.isEmpty(records)) {
            records = [];
        }

        records.$add = function (mood) {
            records.push(mood);
            $localStorage.setObject('moodRecord', records);
        };

        records.$remove = function (mood) {
            _.remove(records, mood);
            $localStorage.setObject('moodRecord', records);
        };

        records.$loaded = function () {
            var deferred = $q.defer();
            deferred.resolve(records);
            return deferred.promise;
        };

        return records;
    };
})
.factory('$localStorage', function ($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    };
});