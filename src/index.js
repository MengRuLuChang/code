/*
 * @Author: ding yipeng 
 * @Date: 2019-12-10 11:11:56 
 * @Last Modified by: ding yipeng
 * @Last Modified time: 2020-03-11 14:53:32
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
对于 call的理解

*/
/* 值得一提的是，map 的第二个参数为第一个参数回调中的 this 指向，如果第一个参数为箭头函数，
那设置第二个 this 会因为箭头函数的词法绑定而失效 */

const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = Array()
  console.log('this==>', this, "fn==>", fn, "context==>", context)
  for (let i = 0; i < arr.length; i++) {
    //判断稀疏数组的情况
    if (!arr.hasOwnProperty(i)) continue
    mappedArr[i] = fn.call(context, arr[i], i)
    console.log('fn.call', context, arr[i], i)

  }
  return mappedArr
}

Array.prototype.selfMap = selfMap

console.log(
  [1, 2, 3].selfMap((item, index) => item + index))


/* 使用 reduce 实现数组 map 方法 */
const selfMap2 = function (fn, context) {
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fun.call(context, cur, index, this)]
  }, [])
}

/* 构造函数 
prototype 这个东西，其实创建一个构造函数，他就会有

JavaScript 规定：::每一个构造函数都有一个 prototype 属性::，他就是一个对象，这个对象的所有属性和方法都会被构造函数创建的所有对象拥有
*/
function Star(name, age) {
  this.name = name
  this.age = age

}
Star.prototype.sing = function () {
  console.log('我们都会唱歌')
}

let xiaolan = new Star('小蓝', 80)
xiaolan.sing()

let xiaofen = new Star('小粉', 70)
xiaofen.sing()
//官方说：构造函数通过原型分配的函数是所有对象共享的

/* 对象的原型 */
//所有创建出来的对象都有 __proto__这个东西，他指向的就是构造函数的 prototype 原型对象，
//简言就是哪个构造函数创建了它，它就有个属性指向构造函数的原型对象，这样就可以使用构造函数的原型对象上绑定的所有方法和属性
function Star(name, age) {
  this.name = name
  this.age = age

}
Star.prototype.sing = function () {
  console.log('我们都会唱歌')
}

let xiaolan = new Star('小蓝', 80)
xiaolan.sing()

console.log(xiaolan.__proto__ === Star.prototype) // true