class Curve {
    constructor(name, fun, eqstring) {
      this.name = name;
      this.fun = fun;
      this.eqstring = eqstring;
    }

    eval_f(t) {
      return this.fun(t);
    }
}


function f1(t) {
  return [Math.cos(0.5*t)*Math.cos(0.5*t),
    Math.sin(0.5*t)*Math.cos(0.5*t),
    Math.sin(0.5*t)];
}

const F1 = new Curve("f1", f1, "f_1(t) = (cos(0.5t)cos(0.5t), sin(0.5t)cos(0.5t), sin(0.5t))");


function f2(t) {
  return [Math.cos(3*t)*Math.cos(t),
  Math.cos(3*t)*Math.sin(t),
  Math.sin(3*t)];
}

const F2 = new Curve("f2", f2, "f_2(t) = (cos(3t)cos(t), cos(3t)sin(t), sin(3t))");


function f3(t) {
  const x = Math.cos(t) / Math.sqrt(1+(Math.cos(4*t))**2);
  const y = Math.sin(t) / Math.sqrt(1+(Math.cos(4*t))**2);
  const z = Math.cos(4*t) / Math.sqrt(1+(Math.cos(4*t))**2);
  return [x, y, z];
}

const F3 = new Curve("f3", f3, "f_3(t) = (cos(t), sin(t), cos(4t))[1+(cos(4t))^2]^(-1/2)");


const curves = new Map();
curves.set('f1', F1);
curves.set('f2', F2);
curves.set('f3', F3);

export { curves };
