use itertools_num::linspace;
use js_sys::Array;
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use statrs::distribution::{
    Beta, Cauchy, ChiSquared, Continuous, Exp, Gamma, InverseGamma, LogNormal, Normal, StudentsT,
    Weibull,
};
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
pub fn beta(from: f64, to: f64, len: usize, shape_a: f64, shape_b: f64) -> Array {
    let b = Beta::new(shape_a, shape_b).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: b.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn cauchy(from: f64, to: f64, len: usize, location: f64, scale: f64) -> Array {
    let c = Cauchy::new(location, scale).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: c.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn chi_squared(from: f64, to: f64, len: usize, freedom: f64) -> Array {
    let c = ChiSquared::new(freedom).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: c.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn exp_(from: f64, to: f64, len: usize, rate: f64) -> Array {
    let e = Exp::new(rate).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: e.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn gamma(from: f64, to: f64, len: usize, shape: f64, rate: f64) -> Array {
    let g = Gamma::new(shape, rate).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: g.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn inverse_gamma(from: f64, to: f64, len: usize, shape: f64, rate: f64) -> Array {
    let ig = InverseGamma::new(shape, rate).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: ig.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn log_normal(from: f64, to: f64, len: usize, location: f64, scale: f64) -> Array {
    let ln = LogNormal::new(location, scale).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: ln.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn normal(from: f64, to: f64, len: usize, location: f64, scale: f64) -> Array {
    let n = Normal::new(location, scale).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: n.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn students_t(from: f64, to: f64, len: usize, freedom: f64) -> Array {
    let t = StudentsT::new(0.0, 1.0, freedom).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: t.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn weibull(from: f64, to: f64, len: usize, shape: f64, scale: f64) -> Array {
    let w = Weibull::new(shape, scale).unwrap();
    let x = linspace(from, to, len);
    let xy = x
        .map(|x| to_value(&Point { x, y: w.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}
