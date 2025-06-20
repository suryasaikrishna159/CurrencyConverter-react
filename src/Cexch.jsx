import React, { useState, useEffect } from "react";

function Cexch() {
  const [cdata, setcdata] = useState();
  const [tovalue, settovalue] = useState();
  const [curlist, setcurlist] = useState([]);
  const [frmcur, setcur] = useState("USD");
  const [tocur, settcur] = useState("INR");

  useEffect(() => {
    const currencys = {
      AUD: "Australian Dollar",
      BGN: "Bulgarian Lev",
      BRL: "Brazilian Real",
      CAD: "Canadian Dollar",
      CHF: "Swiss Franc",
      CNY: "Chinese Renminbi Yuan",
      CZK: "Czech Koruna",
      DKK: "Danish Krone",
      EUR: "Euro",
      GBP: "British Pound",
      HKD: "Hong Kong Dollar",
      HUF: "Hungarian Forint",
      IDR: "Indonesian Rupiah",
      ILS: "Israeli New Sheqel",
      INR: "Indian Rupee",
      ISK: "Icelandic Króna",
      JPY: "Japanese Yen",
      KRW: "South Korean Won",
      MXN: "Mexican Peso",
      MYR: "Malaysian Ringgit",
      NOK: "Norwegian Krone",
      NZD: "New Zealand Dollar",
      PHP: "Philippine Peso",
      PLN: "Polish Złoty",
      RON: "Romanian Leu",
      SEK: "Swedish Krona",
      SGD: "Singapore Dollar",
      THB: "Thai Baht",
      TRY: "Turkish Lira",
      USD: "United States Dollar",
      ZAR: "South African Rand"
    };

    const keys = Object.keys(currencys);
    setcurlist(keys);
  }, []);

  useEffect(() => {
    if ( frmcur === tocur) return;

    async function getdata() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?from=${frmcur}&to=${tocur}`
        );
        const data = await res.json();
        setcdata(data.rates[tocur]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getdata();
  }, [frmcur, tocur]);


  function getvalue(e){
        let val=e.target.value;
        if(val>=0){
            settovalue(cdata*val);
        }
        else{
            return;
        }
        
    }


  return (
    <div className="box">
      <h2>Currency Converter</h2>
      <div>
        <p>
          
          <select value={frmcur} onChange={(e) => setcur(e.target.value)} className="selectbar">
            {curlist.map((element, idx) => (
              <option key={idx} value={element}>
                {element}
              </option>
            ))}
          </select>
          &nbsp;
          <input type="number" onChange={getvalue} />

        </p>

        <p>
          
          <select value={tocur} onChange={(e) => settcur(e.target.value)} className="selectbar">
            {curlist.map((element, idx) => (
              <option key={idx} value={element}>
                {element}
              </option>
            ))}
          </select>
          &nbsp;&nbsp;{tovalue}

        </p>

      </div>
    </div>
  );
}

export default Cexch;
