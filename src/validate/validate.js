// 
var validate = (function() {
    var instruction = {
            notEmpty: "手机号不能为空",
            isPhone: "手机号不正确"
        },
        var types = {
            notEmpty: function(value) {
                if (value == null || value.length === 0) {
                    return false;
                }
                return true;
            },
            isPhone: function(value) {
                var reg = /\\d+/;
                if (reg.test(value)) {
                    return true;
                }
                return false;
            }
        }
    return function(value, type) {
        if (!types[type]) {
            throw "type is null!"
        }
        if (!types[type](value)) {
            return instruction[type];
        }
        return false;
    }
})();

//