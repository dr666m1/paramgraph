use itertools_num::linspace;
use js_sys::Array;
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use statrs::distribution::{
    Beta, Cauchy, ChiSquared, Continuous, Exp, Gamma, InverseGamma, LogNormal, Normal, StudentsT,
    Uniform, Weibull,
};
use wasm_bindgen::prelude::*;

const LENGTH: usize = 100;

#[derive(Serialize)]
struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
pub fn beta(from: f64, to: f64, a: f64, b: f64) -> Array {
    let b = Beta::new(a, b).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: b.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn cauchy(from: f64, to: f64, x0: f64, gamma: f64) -> Array {
    let c = Cauchy::new(x0, gamma).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: c.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn chi_squared(from: f64, to: f64, k: f64) -> Array {
    let c = ChiSquared::new(k).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: c.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn exp(from: f64, to: f64, lambda: f64) -> Array {
    let e = Exp::new(lambda).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: e.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn gamma(from: f64, to: f64, k: f64, theta: f64) -> Array {
    let g = Gamma::new(k, theta).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: g.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn inverse_gamma(from: f64, to: f64, k: f64, theta: f64) -> Array {
    let ig = InverseGamma::new(k, theta).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: ig.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn log_normal(from: f64, to: f64, mu: f64, sigma: f64) -> Array {
    let ln = LogNormal::new(mu, sigma).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: ln.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn normal(from: f64, to: f64, mu: f64, sigma: f64) -> Array {
    let n = Normal::new(mu, sigma).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: n.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn students_t(from: f64, to: f64, nu: f64) -> Array {
    let t = StudentsT::new(0.0, 1.0, nu).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: t.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn uniform(from: f64, to: f64) -> Array {
    let u = Uniform::new(from, to).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: u.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}

#[wasm_bindgen]
pub fn weibull(from: f64, to: f64, k: f64, lambda: f64) -> Array {
    let w = Weibull::new(k, lambda).unwrap();
    let x = linspace(from, to, LENGTH);
    let xy = x
        .map(|x| to_value(&Point { x, y: w.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}
