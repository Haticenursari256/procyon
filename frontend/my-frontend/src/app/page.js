"use client";

import React, { useState, useEffect } from "react";
// Hata vermesin diye kütüphaneleri try-catch ile çağırıyoruz
import { isConnected, requestAccess, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";

const CONTRACT_ID = "CA3D5KRYM6CB7OWQ6TWYRR3Z4T7GNZLKERYNZGGA5SOAOPIFY6YQ7ES5"; 
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [ekran, setEkran] = useState("giris");
  const [cuzdan, setCuzdan] = useState("");
  const [puan, setPuan] = useState(0);
  const [soruNo, setSoruNo] = useState(0);
  const [islemDurumu, setIslemDurumu] = useState(""); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const sorular = [
    { soru: "1. Kripto cüzdan şifreni kime verirsin?", secenekler: [{ t: "Kimseye!", p: 30 }, { t: "Anneme", p: 10 }, { t: "Admine", p: 0 }] },
    { soru: "2. Piyasa çökerse?", secenekler: [{ t: "Satar kaçarım", p: 0 }, { t: "HODL", p: 30 }, { t: "Ağlarım", p: 5 }] },
    { soru: "3. Gas Fee nedir?", secenekler: [{ t: "İşlem ücreti", p: 30 }, { t: "Benzin", p: 0 }, { t: "Bedava", p: 5 }] },
    { soru: "4. Kaldıraç?", secenekler: [{ t: "Asla", p: 5 }, { t: "x100", p: 10 }, { t: "x5", p: 20 }] },
    { soru: "5. Web3?", secenekler: [{ t: "Merkeziyetsiz", p: 30 }, { t: "Bitcoin", p: 5 }, { t: "Bilmem", p: 0 }] }
  ];

  const analizEt = (p) => {
    if (p < 50) return "ACEMI";
    if (p < 100) return "TRADER";
    return "BALINA";
  };

  const baglan = async () => {
    try {
      if (await isConnected()) {
        const key = await requestAccess();
        setCuzdan(key.address || key);
      } else {
        alert("Freighter Yok!");
      }
    } catch (e) {
      console.log("Bağlantı hatası:", e);
    }
  };

  const sozlesmeyeKaydet = async (sonucKarakter) => {
    if (!cuzdan) return;
    setIslemDurumu("loading");
    try {
      const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC_URL);
      const account = await server.getAccount(cuzdan);
      
      const transaction = new StellarSdk.TransactionBuilder(account, { fee: "100" })
        .addOperation(
          StellarSdk.Operation.invokeHostFunction({
            func: StellarSdk.HOST_FUNCTION_TYPE_INVOKE_CONTRACT,
            auth: [],
            hostFunction: new StellarSdk.xdr.HostFunction.invokeContract(
              new StellarSdk.xdr.InvokeContractArgs({
                contractAddress: new StellarSdk.Address(CONTRACT_ID),
                functionName: "sonuc_kaydet",
                args: [StellarSdk.xdr.ScVal.scvSymbol(sonucKarakter)],
              })
            ),
          })
        )
        .setTimeout(30)
        .setNetworkPassphrase(NETWORK_PASSPHRASE)
        .build();

      const signedXdr = await signTransaction(transaction.toXDR(), { networkPassphrase: NETWORK_PASSPHRASE });
      const result = await server.sendTransaction(new StellarSdk.Transaction(signedXdr, NETWORK_PASSPHRASE));
      
      if (result.status !== "ERROR") setIslemDurumu("success");
      else setIslemDurumu("error");

    } catch (e) {
      console.log(e);
      setIslemDurumu("error");
    }
  };

  const cevapla = (p) => {
    const yeniPuan = puan + p;
    setPuan(yeniPuan);
    if (soruNo + 1 < sorular.length) {
      setSoruNo(soruNo + 1);
    } else {
      setEkran("sonuc");
    }
  };

  if (!mounted) return <div style={{background:'black', color:'white', height:'100vh', padding:'20px'}}>Yükleniyor...</div>;

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', background: '#111', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ color: '#00d4ff' }}>Web3 Test</h1>

      {ekran === "giris" && (
        <div style={boxStyle}>
          <h2>Blockchain'e Yaz!</h2>
          {!cuzdan ? <button onClick={baglan} style={btnStyle}>🔗 Bağlan</button> : 
          <div><p style={{color:'#0f0'}}>✅ {cuzdan.substring(0,5)}...</p><button onClick={() => setEkran("test")} style={btnStyle}>🚀 BAŞLA</button></div>}
        </div>
      )}

      {ekran === "test" && (
        <div style={boxStyle}>
          <h3>Soru {soruNo + 1}</h3>
          <h2>{sorular[soruNo].soru}</h2>
          {sorular[soruNo].secenekler.map((s, i) => (
            <button key={i} onClick={() => cevapla(s.p)} style={optStyle}>{s.t}</button>
          ))}
        </div>
      )}

      {ekran === "sonuc" && (
        <div style={boxStyle}>
          <h1>{analizEt(puan)}</h1>
          <p>Puan: {puan}</p>
          <hr style={{borderColor:'#333'}}/>
          {islemDurumu === "loading" && <p style={{color:'yellow'}}>⏳ İmzala...</p>}
          {islemDurumu === "success" && <p style={{color:'#0f0'}}>✅ KAYDEDİLDİ!</p>}
          {islemDurumu === "error" && <p style={{color:'red'}}>❌ Hata</p>}
          {islemDurumu === "" && <button onClick={() => sozlesmeyeKaydet(analizEt(puan))} style={btnStyle}>💾 Zincire Kaydet</button>}
          <br/><button onClick={() => window.location.reload()} style={{marginTop:'20px', background:'none', color:'#aaa', border:'none'}}>Tekrar</button>
        </div>
      )}
    </div>
  );
}

const boxStyle = { background: '#222', padding: '30px', borderRadius: '15px', maxWidth: '500px', margin: '30px auto', border: '1px solid #333' };
const btnStyle = { background: '#7d00ff', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '30px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' };
const optStyle = { display: 'block', width: '100%', padding: '15px', margin: '10px 0', background: '#333', color: 'white', border: '1px solid #555', borderRadius: '10px', cursor: 'pointer' };