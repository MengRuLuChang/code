/*
 * @Author: ding yipeng 
 * @Date: 2019-12-10 11:11:56 
 * @Last Modified by: ding yipeng
 * @Last Modified time: 2019-12-10 15:48:28
 */
/* 判断对象的数据类型 */
/* 函数柯里化
eg:
  function add(a) {
    return function(b) {
      return a + b
    }
  }
  let add3 = add(3)
  add3(4) === 3 + 4
  add(3)(4)
*/

/* 判断数据类型
  typeof 只能区分基本数据类型，即：number、string、undefined、boolean、unll
  特殊：typeof null //object
        typeof function(){} //function
  要区分对象，数组，函数，单纯使用typeof是不行的，可以通过Object.prototype.toString方法，判断某个对象 是属于那种内置类型。
  分为null,string,boolean,number,undefined,array,function,object,date,math

  instanceof 用于判断一个变量是否是某个对象的实例
  object instanceof constructor

*/
// const isType = (type) => {
//   return (target) => {
//     return `[object ${type}]` === Object.prototype.toString.call(target)
//   }
// }
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
const isArray = isType('Array')
console.log(isArray([]))




/* 循环实现数组map方法 */
/* 
Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组,把调用方法的参数截取出来，
call了后，就是把当前函数推入所传参数的作用域中去了，我所理解的不知道对不对，反正this就指向所传进去的对象就完事了

*/


const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = Array()
  for (let i = 0; i < arr.length; i++) {
    //判断稀疏数组的情况
    if (!arr.hasOwnProperty(i)) continue
    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

Array.prototype.selfMap = selfMap

console.log(
  [1, 2, 3].selfMap((item) => item + 2))