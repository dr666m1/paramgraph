mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet() -> String {
    utils::set_panic_hook();
    "hello stats!".to_string()
}
