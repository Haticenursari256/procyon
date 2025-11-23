#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct KriptoTestContract;

#[contractimpl]
impl KriptoTestContract {
    // Bu fonksiyon test sonucunu alır ve Blockchain'e "Merhaba BALİNA" diye yazar
    pub fn sonuc_kaydet(env: Env, karakter: Symbol) -> Vec<Symbol> {
        // Blockchain'e kalıcı log (kayıt) atıyoruz
        vec![&env, symbol_short!("KAYIT"), karakter]
    }
}