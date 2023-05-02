use js_sys::Array;
use statrs::distribution::{Continuous, Normal};
use std::iter::FromIterator;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    "hello stats!".to_string()
}

#[wasm_bindgen]
pub fn normal(from: f64, to: f64, mu: f64, sigma: f64) -> Array {
    let n = Normal::new(mu, sigma).unwrap();
    let arr = Array::from_iter([JsValue::from_f64(n.pdf(from)), JsValue::from_f64(n.pdf(to))]);
    arr
}
