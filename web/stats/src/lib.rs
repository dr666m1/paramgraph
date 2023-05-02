use itertools_num::linspace;
use js_sys::Array;
use serde::Serialize;
use serde_wasm_bindgen::to_value;
use statrs::distribution::{Continuous, Normal};
use wasm_bindgen::prelude::*;

#[derive(Serialize)]
struct Point {
    x: f64,
    y: f64,
}

#[wasm_bindgen]
pub fn normal(from: f64, to: f64, mu: f64, sigma: f64) -> Array {
    let n = Normal::new(mu, sigma).unwrap();
    let x = linspace(from, to, 100);
    let xy = x
        .map(|x| to_value(&Point { x, y: n.pdf(x) }).expect("something went wrong"))
        .collect::<Array>();
    xy
}
