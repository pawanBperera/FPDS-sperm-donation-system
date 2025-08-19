import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler, Title } from "chart.js";
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler, Title);

//  Y-axis max per parameter
const yMaxFor = (paramKey) => {
  if (paramKey.includes("concentration")) return 120; // million/mL
  if (paramKey.includes("volume")) return 5;          // mL
  return 100;                                         // percentages
};



export default function MaleFertilityTrends() {
  const [allParams, setAllParams] = useState([]);  //semen parameters hold krn thiynne that loaded from the json file.
  const [paramKey, setParamKey] = useState("total_motility_pct"); //mona parameters the load krla display krnne kiyla chart ekata info denna



  useEffect(() => {
    const url = `${process.env.PUBLIC_URL}/data/male_fertility_who_p5.json`;
    console.log("[WHO] fetching:", url);
                                                                                    // components load unama eka paarak run wela ara json file eken data adinwa. 
    fetch(url, { cache: "no-store" })
      .then((r) => {
        console.log("[WHO] status:", r.status, r.statusText);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })


      .then((json) => {
        console.log("[WHO] raw json type:", Array.isArray(json) ? "array" : typeof json, "len:", Array.isArray(json) ? json.length : "n/a");
        if (!Array.isArray(json)) throw new Error("JSON is not an array");

        // Coerce numbers + hard-validate shape
        const normalized = json.map((item, idx) => {
          const series = Array.isArray(item.series) ? item.series.map((s, i) => {
            const yr = Number(s.year);
            const p5 = Number(s.p5);

            if (!Number.isFinite(yr) || !Number.isFinite(p5)) {
              console.warn(`[WHO] non-numeric at item ${idx} series ${i}:`, s);
            }

            return { year: yr, p5: p5 };

          }) : [];
          return { ...item, series };
        });



        // Quick preview logs
        console.log("[WHO] first item:", normalized[0]);
        console.log("[WHO] keys:", normalized.map(x => x.parameter));

        setAllParams(normalized);
      })
      .catch((err) => {
        console.error("[WHO] load error:", err);
        setAllParams([]);
      });
  }, []);



  // Find current param object safely
  const current = useMemo(() => {
    if (!Array.isArray(allParams) || allParams.length === 0) return null;
    const found = allParams.find(p => p.parameter === paramKey);
    if (!found) {
      console.warn("[WHO] param not found for key:", paramKey, "available:", allParams.map(p => p.parameter));
    }
    return found || null;
  }, [allParams, paramKey]);



  const years  = useMemo(() => current?.series?.map(s => s.year) ?? [], [current]); //awrudu tika (2010, 2021, 2020) gannnawa
  const values = useMemo(() => current?.series?.map(s => s.p5)  ?? [], [current]);

  console.log("[WHO] plotting", { paramKey, years, values });

  const data = useMemo(() => ({
    labels: years,
    datasets: [{
      label: "Lower Reference (5th percentile)",
      data: values,        
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      tension: 0.4, 
    }]
  }), [years, values]);


// responsiveness eka handle krnna place eka
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: "easeInOutQuart" },
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: current ? current.label : "WHO Lower Reference Trend" },
      tooltip: { callbacks: { label: (ctx) => `P5: ${ctx.parsed.y}` } }
    },


    scales: {
      x: { type: "category", ticks: { precision: 0 } },
      y: {
        beginAtZero: true,
        suggestedMax: yMaxFor(paramKey) 
      }
    }
  }), [current, paramKey]);




  const optionsList = Array.isArray(allParams) ? allParams.map(p => ({ value: p.parameter, label: p.label })) : [];



  return (
    <div className="card p-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h6 className="mb-0">WHO Lower Reference Trend</h6>
        <select className="form-select form-select-sm" style={{ maxWidth: 360 }} value={paramKey} onChange={(e) => setParamKey(e.target.value)}>
          {optionsList.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>



      <div style={{ width: "100%", height: 340 }}>
        <Line data={data} options={options}
         />
      </div>



      {current && (
        <small className="text-muted d-block mt-2">
          Note: 2020 values are computed from the fertile cohort (5th percentile).
          WHO 2010 & 2021 are global lower reference limits (P5).
        </small>
      )}


      {!current && (
        <small className="text-danger d-block mt-2">
          No data for selected parameter. Check console logs.
        </small>
      )}
    </div>
  );
}
