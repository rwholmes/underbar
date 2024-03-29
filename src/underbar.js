/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // return n === undefined ? array[array.length-1] : array.slice(array.length - n, array.length);
    if (n === undefined) {
      return array[array.length-1];
    }
    else if (n > array.length) {
      return array;
    }
    else { return array.slice(array.length - n, array.length); }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // need to apply two cases, one for objects and one for arrays
    // Check if its an array by using Array.isArray()
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    // case for objects
    else {
      for (var k in collection) {
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var answers = [];
    _.each(collection, function(item) {
      if (test(item)) {
        answers.push(item);
      }
    });
    return answers;
  };

  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.filter() here, without simply
  // copying code in and modifying it
  // maybe use .apply or .call to negate array?
  // Version 1 Using code from _.filter
  _.reject1 = function(collection, test) {
    var answers = [];
    _.each(collection, function(item) {
      if (!test(item)) {
        answers.push(item);
      }
    });
    return answers;
  };
  // Version 2 Using _.filter function
  _.reject = function (collection,test) {
    return _.filter(collection, function(item) {
      return !test.call(context, item);
    });
  }

  // Produce a duplicate-free version of the array.
  // New version using _.each instead of for loop
  _.uniq = function(array) {
    var nodups = [];
    _.each(array, function(x) {
      var isdup = false;
      _.each(nodups, function(y) {
        if (x === y) {
          isdup = true;
        }
      });
      if (isdup === false) {
        nodups.push(x);
      }
    });
    return nodups;
  };

  // Return the results of applying an iterator to each element.
  _.map1 = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var outputarr = [];
    for (var i=0; i<array.length; i++) {
      outputarr.push(iterator(array[i]));
    }
    return outputarr;
  };
  // Second version of _.map using _.each
   _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var outputarr = [];
    _.each(array, function(item) {
      outputarr.push(iterator(item));
    });
    return outputarr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  // some helpers
  _.invoke = function(collection, functionOrKey, args) {
    var isFunc = typeof functionOrKey === 'function';
    return _.map(collection, function(value) {
      if (isFunc) {
        return functionOrKey.apply(value,args);
      }
      else {
        return value[functionOrKey].apply(value, args);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      var prevalue = collection.shift();
      _.each(collection, function(item) {
        prevalue = iterator(prevalue, item);
      });
    }
    else {
      var prevalue = accumulator;
      _.each(collection, function(item) {
        prevalue = iterator(prevalue, item);
      });
    }
    return prevalue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(preval, item) {
      if ( !preval ) {
        return false;
      }
      // Check if iterator is undefined and use item as callback result
      if (iterator === undefined) {
        return Boolean(item);
      }
      else {
        return Boolean(iterator(item));
      }
    }, true); 
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some1 = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return _.reduce(collection, function(preval, item) {
      if ( preval ) {
        return true;
      }
      // Check if iterator is undefined and use item as callback result
      if (iterator === undefined) {
        return Boolean(item);
      }
      else {
        return Boolean(iterator(item));
      }
    }, false); 
  };
  // Second solution that uses every()
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return !(_.every(collection, function(item) {
      if (iterator === undefined) {
        return !item;
      }
      else {
        return !iterator(item);
      }
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var sources = Array.prototype.slice.call(arguments,1);
    _.each(sources, function(item) {
      _.each(item, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var sources = Array.prototype.slice.call(arguments,1);
    _.each(sources, function(item) {
      _.each(item, function(value, key) {
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var resobj = {};
    return function() {
      var key = _.identity.apply(this, arguments);
      if (resobj[key] !== undefined) {
        return resobj[key];
      }
      else {
        return resobj[key] = func.apply(this, arguments);
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Need to get all of the arguments after the first two
    var params = Array.prototype.slice.call(arguments,2);
    return setTimeout(function() {
      return func.apply(this, params);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Create the copied array
    var copied = array.slice();
    // Need to use Math to randomize
    var tempValue;
    var randomIndex;
    for (var i = copied.length-1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i+1));
      tempValue = copied[i];
      copied[i] = copied[randomIndex];
      copied[randomIndex] = tempValue;
    }
    return copied;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    var argscop = args.slice();
    var results = [];
    // Find the longest array out of the inputs
    var longest = _.reduce(argscop, function(a,b) {
      return (a.length > b.length) ? a : b;
    });
    // Loop through the number of indexes of the longest array
    for (var i=0; i<longest.length; i++) {
      var toBeZipped = [];
      // Loop through all of the inputs
      for (var k=0; k<args.length; k++) {
        toBeZipped.push(args[k][i]);
      }
      results.push(toBeZipped);
    }
    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    if (result === undefined) {
      result = [];
    }
    _.each(nestedArray, function(item) {
      if (Array.isArray(item)) {
        _.flatten(item, result);
      }
      else {
        result.push(item);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function(array) {
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    // Filter will return all of the elements in 1st array that pass a truth test
    return _.filter(_.uniq(array), function(item) {
      // Not that item here is a value from the first array
      // The truth test will pass if ALL the other arrays contain that value
      return _.every(otherArrays, function(oneArray) {
        return _.indexOf(oneArray, item) >=0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var otherArrays = Array.prototype.slice.call(arguments, 1);
    // Filter will return all of the elements in 1st array that pass truth function
    return _.filter(array, function(item) {
      // Here we want our truth function to be that the values aren't in the other arrays
      return _.every(otherArrays, function(oneArray) {
        return _.indexOf(oneArray, item) === -1;
      });
    });
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
