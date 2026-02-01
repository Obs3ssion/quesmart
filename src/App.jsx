import { useMemo, useState } from "react";
import "./App.css";

import DataLoader from "./components/DataLoader";
import AlertBanner from "./components/AlertBanner";
import ForecastChart from "./components/ForecastChart";
import StaffingTable from "./components/StaffingTable";
import StatCard from "./components/StatCard";

import { SAMPLE_DATA, calculateStaffing } from "./utils/demand";
import { parseCsvFile } from "./utils/csv";

export default function App() {
  const [data, setData] = useState(SAMPLE_DATA);
  const [error, setError] = useState("");

  const baselineCapacity = 3;

  const understaffedHours = useMemo(() => {
    return data
      .filter((row) => calculateStaffing(row.customers) > baselineCapacity)
      .map((row) => row.hour);
  }, [data]);

  const peak = useMemo(() => {
    if (!data.length) return null;
    return data.reduce((best, cur) => (cur.customers > best.customers ? cur : best));
  }, [data]);

  const avgCustomers = useMemo(() => {
    if (!data.length) return 0;
    const sum = data.reduce((acc, cur) => acc + cur.customers, 0);
    return Math.round(sum / data.length);
  }, [data]);

  function showError(msg) {
    setError(msg);
    window.setTimeout(() => setError(""), 20000);
  }

  async function onCsvSelected(file) {
    if (!file) return;
    try {
      const rows = await parseCsvFile(file);
      setData(rows);
      setError("");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load CSV.";
      showError(`Error loading CSV:\n${msg}`);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>QueueSmart</h1>
          <p className="subtitle">Demand Forecasting & Staffing Support Tool</p>
        </div>
      </header>

      <section className="stats">
        <StatCard
          label="Peak Hour"
          value={peak ? peak.hour : "-"}
          sub={peak ? `${peak.customers} customers` : ""}
        />
        <StatCard label="Avg Customers" value={avgCustomers} />
        <StatCard
          label="High Demand Hours"
          value={understaffedHours.length}
          sub={understaffedHours.length ? understaffedHours.join(", ") : "None"}
        />
        <StatCard label="Baseline Staff" value={baselineCapacity} />
      </section>

      <DataLoader onUseSample={() => setData(SAMPLE_DATA)} onCsvSelected={onCsvSelected} error={error} />

      <AlertBanner understaffedHours={understaffedHours} />

      <main className="grid">
        <ForecastChart data={data} />
        <StaffingTable data={data} baselineCapacity={baselineCapacity} />
      </main>

      <footer className="footer">
        Prototype build for Workshop 2.3. Forecasting logic is simulated for front end demo.
      </footer>
    </div>
  );
}