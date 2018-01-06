Array.prototype.mySort = function (compareFunction) {

  var array = this;
  var type = new TypeOfArray(compareFunction);

  return quickSort(array, 0, array.length);

  function TypeOfArray(compareFunc) {

    var _self = this;
    var _type;

    _defineType();

    function _defineType () {

      var tempType = typeof array[0];

      if(typeof array[array.length - 1] !== tempType) {
        throw new TypeError("Different types in array");
      } else {
        _type = tempType;
      }

      if(compareFunc !== undefined) {
        TypeOfArray.prototype.compareFunction = function (elem1, elem2) {

          return (compareFunc(elem1, elem2) + 1);
        };

        return;
      }
      switch (_type) {
        case "number":
          TypeOfArray.prototype.compareFunction = function (elem1, elem2) {

            if(isNaN(elem1,elem2)) {
              throw new TypeError("NaN in array of numbers");
            }

            return compareDefault(+elem1, +elem2);
          };
          break;
        default:
          TypeOfArray.prototype.compareFunction = function (elem1, elem2) {
            return compareDefault(elem1.toString(), elem2.toString());
          };
          break;
      }
    };

    function compareDefault(elem1, elem2) {
      return elem1 <= elem2;
    }
  }
  function partition(array, left, right) {

      var cmp = array[right - 1],
          minEnd = left,
          maxEnd;

      for (maxEnd = left; maxEnd < right - 1; maxEnd += 1) {
            if (type.compareFunction(array[maxEnd], cmp)) {
                swap(array, maxEnd, minEnd);
                minEnd += 1;
            }

      }
      swap(array, minEnd, right - 1);

      return minEnd;
  }

  function swap(array, i, j) {

      var temp = array[i];

      array[i] = array[j];
      array[j] = temp;

      return array;
  }

  function quickSort(array, left, right) {

      if (left < right) {
        
          var p = partition(array, left, right);

          quickSort(array, left, p);
          quickSort(array, p + 1, right);
      }

      return array;
  }
};
