import { calculateStaffing } from "../utils/demand";

export default function StaffingTable({ data, baselineCapacity }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Staffing Recommendations</h2>
          <p className="muted">Simple rule-based staffing support.</p>
        </div>
        <div className="pill">Baseline: {baselineCapacity} staff</div>
      </div>

      <div className="table-scroll">
        <table className="table">
          <thead>
            <tr>
              <th>Hour</th>
              <th>Customers</th>
              <th>Staff Needed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const staffNeeded = calculateStaffing(row.customers);
              const isHigh = staffNeeded > baselineCapacity;

              return (
                <tr key={row.hour} className={isHigh ? "row-high" : ""}>
                  <td className="cell-strong">{row.hour}</td>
                  <td>{row.customers}</td>
                  <td>{staffNeeded}</td>
                  <td>
                    <span className={isHigh ? "badge danger" : "badge ok"}>
                      {isHigh ? "HIGH" : "OK"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="how-it-works">
        <strong>How it works:</strong> 1 staff per 20 customers (min 1). Hours above baseline are flagged as HIGH.
      </div>
    </section>
  );
}