import React, { useState, useEffect } from 'react';
import { isConnected, requestAccess } from "@stellar/freighter-api";

// --- STELLAR WEB3 PROJESİ ---
function App() {
  const [ekran, setEkran] = useState("giris"); 
  const [cuzdanAdresi, setCuzdanAdresi] = useState("");
  const [soruNo, setSoruNo] = useState(0);
  const [puan, setPuan] = useState(0);
  const [odulDurumu, setOdulDurumu] = useState("bekliyor"); 
  const [txHash, setTxHash] = useState("");
  const [kayitDefteri, setKayitDefteri] = useState([]);

  useEffect(() => {
    const eskiAdres = localStorage.getItem('kriptoCuzdan');
    if (eskiAdres) setCuzdanAdresi(eskiAdres);
    const eskiKayitlar = localStorage.getItem('testGecmisi');
    if (eskiKayitlar) setKayitDefteri(JSON.parse(eskiKayitlar));
  }, []);

  // --- 15 SORULUK TEST ---
  const sorular = [
    { soru: "1. Kripto cüzdanının 'gizli anahtarı'nı (Private Key) kime verirsin?", secenekler: [{ text: "Hiç kimseye!", puan: 30 }, { text: "Anneme.", puan: 10 }, { text: "Admine.", puan: 0 }] },
    { soru: "2. Stellar ağında işlem ücreti (Fee) düşük müdür?", secenekler: [{ text: "Evet, çok düşüktür.", puan: 30 }, { text: "Hayır, çok pahalıdır.", puan: 0 }, { text: "Bilmiyorum.", puan: 5 }] },
    { soru: "3. Piyasa çökerse ne yaparsın?", secenekler: [{ text: "Satar kaçarım.", puan: 0 }, { text: "HODL yaparım.", puan: 30 }, { text: "Ağlarım.", puan: 5 }] },
    { soru: "4. Web3 güvenli mi?", secenekler: [{ text: "Evet, bilinçliysen.", puan: 30 }, { text: "Hayır dolandırıcı dolu.", puan: 10 }, { text: "Bilmem.", puan: 0 }] },
    { soru: "5. Freighter hangi ağın cüzdanıdır?", secenekler: [{ text: "Stellar (XLM)", puan: 30 }, { text: "Ethereum", puan: 0 }, { text: "Bitcoin", puan: 5 }] },
    { soru: "6. Meme Coin (Köpekli coinler)?", secenekler: [{ text: "Kumar oynarım!", puan: 15 }, { text: "Çöp bunlar.", puan: 5 }, { text: "Topluluğu iyiyse alırım.", puan: 10 }] },
    { soru: "7. Kripto sence nedir?", secenekler: [{ text: "Geleceğin parası.", puan: 30 }, { text: "Köşeyi dönme yolu.", puan: 10 }, { text: "Dolandırıcılık.", puan: 0 }] },
    { soru: "8. Şifrelerini (Seed) nereye yazdın?", secenekler: [{ text: "Kağıda, kasaya.", puan: 30 }, { text: "Telefona kaydettim.", puan: 0 }, { text: "Ezberledim.", puan: 10 }] },
    { soru: "9. NFT hakkında düşüncen?", secenekler: [{ text: "Gereksiz jpeg.", puan: 5 }, { text: "Sanatın geleceği.", puan: 20 }, { text: "Al-sat yaparım.", puan: 15 }] },
    { soru: "10. ATH nedir biliyor musun?", secenekler: [{ text: "Satış zamanı.", puan: 10 }, { text: "All Time High (Zirve).", puan: 20 }, { text: "Bilmiyorum.", puan: 0 }] },
    { soru: "11. Kaldıraç kullanır mısın?", secenekler: [{ text: "Asla.", puan: 5 }, { text: "Bazen x5.", puan: 15 }, { text: "x100 candır.", puan: 25 }] },
    { soru: "12. Sevgili mi Kripto mu?", secenekler: [{ text: "Sevgilim.", puan: 5 }, { text: "Boğa sezonu bitene kadar bekle.", puan: 15 }, { text: "Grafikler trip atmaz.", puan: 30 }] },
    { soru: "13. Coin alırken neye bakarsın?", secenekler: [{ text: "Projesine/Ekibine.", puan: 25 }, { text: "İsmine.", puan: 0 }, { text: "Grafiğine.", puan: 15 }] },
    { soru: "14. Dolandırıldın mı (Rug Pull)?", secenekler: [{ text: "Evet çok.", puan: 15 }, { text: "Hayır sağlamcıyım.", puan: 20 }, { text: "O ne demek?", puan: 0 }] },
    { soru: "15. 1 Milyon Dolar kazansan?", secenekler: [{ text: "Emekli olurum.", puan: 5 }, { text: "Yarısıyla devam.", puan: 20 }, { text: "Hepsini tekrar basarım!", puan: 30 }] }
  ];

  const analiziGetir = (p) => {
    if (p < 100) return { baslik: "ACEMİ", emoji: "👶", detay: "Daha çok çalışmalısın." };
    else if (p < 300) return { baslik: "TRADER", emoji: "📈", detay: "İyi gidiyorsun." };
    else return { baslik: "STELLAR BALİNASI", emoji: "🐋", detay: "Sen bu işin kitabını yazmışsın!" };
  };

  const cuzdaniBagla = async () => {
    try {
      if (await isConnected()) {
        const key = await requestAccess();
        const addr = typeof key === 'string' ? key : key.address;
        setCuzdanAdresi(addr);
        localStorage.setItem('kriptoCuzdan', addr);
      } else { alert("Freighter Cüzdanı Yok!"); }
    } catch (e) { alert("Bağlantı hatası"); }
  };

  const testeBasla = () => { setSoruNo(0); setPuan(0); setEkran("sorular"); };

  const cevapVer = (p) => {
    const yeniPuan = puan + p;
    setPuan(yeniPuan);
    if (soruNo + 1 < sorular.length) {
      setSoruNo(soruNo + 1);
    } else {
      const analiz = analiziGetir(yeniPuan);
      const yeniKayit = { id: Date.now(), tarih: new Date().toLocaleTimeString(), puan: yeniPuan, sonuc: analiz.baslik };
      const guncelListe = [yeniKayit, ...kayitDefteri];
      setKayitDefteri(guncelListe);
      localStorage.setItem('testGecmisi', JSON.stringify(guncelListe));
      setEkran("sonuc");
    }
  };

  const odulTalepEt = async () => {
    if (!cuzdanAdresi) return;
    setOdulDurumu("yukleniyor");
    try {
      // STELLAR TESTNET MUSLUĞU (Friendbot)
      const res = await fetch(`https://friendbot.stellar.org/?addr=${cuzdanAdresi}`);
      const data = await res.json();
      if (res.ok) { setOdulDurumu("tamam"); setTxHash(data.hash); alert("10.000 TEST XLM GÖNDERİLDİ! 🚀"); }
      else { setOdulDurumu("hata"); alert("Hata oluştu."); }
    } catch (e) { setOdulDurumu("hata"); alert("Bağlantı hatası!"); }
  };

  const kisaAdres = cuzdanAdresi ? cuzdanAdresi.substring(0,5) + "..." : "";
  const sonucVerisi = ekran === "sonuc" ? analiziGetir(puan) : null;

  return (
    <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#7d00ff' }}>🌌 Stellar Web3 Testi</h1>
      
      {ekran === "giris" && (
        <div style={boxStyle}>
          <h2>Hoşgeldin!</h2>
          <p style={{color:'#aaa'}}>Cüzdanı bağla, 10.000 XLM ödülünü kap.</p>
          {!cuzdanAdresi ? <button onClick={cuzdaniBagla} style={btnStyle}>🔗 Cüzdanı Bağla</button> : 
          <button onClick={testeBasla} style={btnStyle}>🚀 BAŞLA ({kisaAdres})</button>}
        </div>
      )}

      {ekran === "sorular" && (
        <div style={boxStyle}>
          <div style={{width: `${((soruNo+1)/sorular.length)*100}%`, height:'5px', background:'#7d00ff', marginBottom:'10px'}}></div>
          <h3>Soru {soruNo+1}/{sorular.length}</h3>
          <h2>{sorular[soruNo].soru}</h2>
          {sorular[soruNo].secenekler.map((s,i)=>(
            <button key={i} onClick={()=>cevapVer(s.puan)} style={optStyle}>{s.text}</button>
          ))}
        </div>
      )}

      {ekran === "sonuc" && (
        <div style={boxStyle}>
          <h1>{sonucVerisi.emoji} {sonucVerisi.baslik}</h1>
          <p>{sonucVerisi.detay}</p>
          <p style={{fontSize:'20px', fontWeight:'bold'}}>Puan: {puan}</p>
          <hr style={{borderColor:'#444'}}/>
          
          {odulDurumu === "bekliyor" && <button onClick={odulTalepEt} style={btnStyle}>🎁 10.000 XLM ÖDÜLÜ AL</button>}
          {odulDurumu === "yukleniyor" && <p>Stellar Ağına Bağlanılıyor...</p>}
          {odulDurumu === "tamam" && (
            <div style={{ color: '#0f0', marginTop:'20px' }}>
              ✅ TRANSFER BAŞARILI! <br/>
              <span style={{fontSize:'12px', color:'#aaa'}}>TX: {txHash.substring(0,10)}...</span><br/>
              <a href={`https://stellar.expert/explorer/testnet/tx/${txHash}`} target="_blank" rel="noreferrer" style={{ color: '#fff' }}>[ Explorer'da Gör ]</a>
            </div>
          )}
          
          <button onClick={()=>setEkran("giris")} style={{marginTop:'20px', background:'transparent', border:'1px solid #fff', color:'#fff', padding:'5px 10px'}}>Başa Dön</button>
        </div>
      )}
      
      {cuzdanAdresi && kayitDefteri.length > 0 && (
        <div style={{marginTop:'30px', borderTop:'1px solid #444', maxWidth:'500px', margin:'30px auto'}}>
          <h4 style={{color:'#7d00ff'}}>Geçmiş Kayıtlar</h4>
          {kayitDefteri.map(k => <div key={k.id} style={{color:'#888', borderBottom:'1px solid #222', padding:'5px'}}>{k.tarih} - {k.sonuc} ({k.puan} Puan)</div>)}
        </div>
      )}
    </div>
  );
}

const boxStyle = { background: '#1a1a1a', padding: '30px', borderRadius: '15px', maxWidth: '500px', margin: '0 auto', border: '1px solid #333' };
const btnStyle = { padding: '15px 30px', background: '#7d00ff', color: '#fff', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '18px', margin: '10px', fontWeight:'bold' };
const optStyle = { display: 'block', width: '100%', padding: '15px', margin: '10px 0', background: '#333', color: '#fff', border: '1px solid #555', cursor: 'pointer', borderRadius: '10px', textAlign:'left' };

export default App;