mod utils;

use statrs::distribution::{ContinuousCDF, Exp};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    utils::set_panic_hook();
    "hello stats!".to_string()
}

#[wasm_bindgen]
pub fn culc_exp() -> f64 {
    let n = Exp::new(1.0).unwrap();
    n.cdf(1.0)
}
