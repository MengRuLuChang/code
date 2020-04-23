//call 模拟实现
Function.prototype.myCall = function (arguments) {
  var context = context || window;
  context.fn = this;
  var args = [];
  for (let i = 1; l < arguments.length - 1; i++) {
    args.push('arguments[' + i + ']')
  }
  var result = eval('context.fn(' + args + ')');
  delete context.fn
  return result
}

//apply的模拟实现
Function.prototype.myApply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;
  var result;
  if (!arr) {
    result = context.fn()
  } else {
    var args = [];
    arr.forEach(element => args.push(element));
  }
  delete context.fn;
  return result;
}

/* bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。 */
//返回一个函数
//可以传入参数