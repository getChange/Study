### JavaScript实现阶乘
```
1. 0的阶乘是1
2. n! = n * (n-1) * (n-2) * (n-3) * ... * 3 * 2 * 1
```

```javascript
//函数的阶乘factorial()
factorial(0) = 1;
factorial(n) = n * factorial(n-1);
```
- 实现方法一
```javascript
function factorial(num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        for (var i = num - 1; i >= 1; i--) {
            num *= i;
        }
    }
    return num;
}
```
- 实现方法二
```javascript
function factorial(num) {
    var result = num;
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        while (num > 1) {
            num--;
            result *= num;
        }
    }
    return result;
}
```
- 实现方法三
```javascript
function factorial(num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
}
```

### JavaScript算法:回文处理
- 回文处理:对应位置上的字符串与倒数相对应位置的字符串相同
- 重点使用的方法:`.replace()` `.toLowerCase()`
- `.replace()`使用正则表达式来忽略文中的字母的大小写,标点符号,空白

  - 正则表达式

    - `/[^A-Za-z0–9]/g`或`/[\W_]/g`(删除所有非字母数字字符,匹配一个非单字字符)

  - String.prototype.toLowerCase()
  - String.prototype.replace()
  - String.prototype.split()
  - Array.prototype.reverse()
  - Array.prototype.join()
  - String.length
  - for
  
### JavaScript算法:找到字符串中最长的单词的长度
- `.split()`将字符串分割成数组
- `.length`方法获得字符串的长度
- 解题思路:
```
1.先把字符串arr转为数组(get)
2.将数组中的每个元素长度转换成一个新的数组()
3.将这个数组按由小到大排序
4.取此数组中最后的数值，也就是最长的字符串
5.将这个长度值返回
```
- 错误点
    - 1.设置变量时没有赋值;
    - 2.使用的条件错误;
    ```
        //错误的条件判断
        if (arr[i].length > arr[i + 1].length) {
            strLen = arr[i].length;
        } else if (arr[i].length < arr[i + 1].length) {
            strLen = arr[i + 1].length;
        }
    ```
    ```
        //正确的条件判断
        if(arr[i].length > strLen) {
            strLen = arr[i].length;
        }
    ```
    - 3.返回的值出现错误
    ```
        return strLen;//正解
        return str.length;/传入字符串的整个长度
    ```
### JavaScript算法:单词首字母大写,其余全部小写
- 解题思路:
    - 1.使用`.split(" ")`将所有字符放入数组里面
    - 2.创建一个新数组用来存储改变过后的单词
    - 3.使用for循环将所有单词改变成规定要求后存入新创建的数组

        - 1.将所有单词不管大小全部转化为小写单词
        - 2.提取所有单词的首字母并使用`title[0].toUpperCase()`(对象的方法)转变为大写字母
        - 3.和提起小写字母进行拼接`title.slice(1)`

    - 4.使用`.join(" ")`方法,将数组转化为字符串
### JavaScript算法:选取数组中最大值
- 解题思路:
    - 1.拿到数组进行遍历,将数组内的数组进行分组
    - 2.对已经分好组的数组再次进行遍历
    - 3.使用每个值与数组中第一个数字对比,大于第一个数字,数字改变,小于第一个数字,不改变
    - 4.`return newArr`返回到新数组中
```javascript
function largestOfFour(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        for (var j = 0; j < item.length; j++) {
            if (item[j] > item[0]) {
                item[0] = item[j];
            } else if (item[j] < item[0]) {
                item[0] = item[0];
            }
        }
        newArr.push(item[0]);
    }
    // You can do this!
    return newArr;
}

largestOfFour([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]);
```
- 另一种解法      
```javascript
function largestOfFour(arr) {
  var results = [];
  for (var n = 0; n < arr.length; n++) {
    var largestNumber = 0;
    for (var sb = 0; sb < arr[n].length; sb++) {
      if (arr[n][sb] > largestNumber) {
        largestNumber = arr[n][sb];
      }
    }
    results[n] = largestNumber;
  }
  return results;
}
```