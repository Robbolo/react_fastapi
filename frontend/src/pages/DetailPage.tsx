import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type DatasetRun = {
  id: number;
  name: string;
  status: "success" | "in_progress" | "failed";
  start_time: string;
  end_time: string | null;
};

function DetailPage() {
  const { name } = useParams();

  const [runs, setRuns] = useState<DatasetRun[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/transforms/${name}`)
      .then((res) => res.json())
      .then((data: DatasetRun[]) => setRuns(data));
  }, [name]);

  return (
    <div style={{ padding: 20 }}>
      <h1>{name} Run History</h1>

      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 1fr",
          gap: 12,
          padding: "8px 12px",
          borderBottom: "2px solid #e6e6e6",
          fontWeight: 600,
        }}
      >
        <div>Status</div>
        <div>Start</div>
        <div>End</div>
        <div>Duration</div>
      </div>

      <div style={{ marginTop: 8 }}>
        {runs.map((run, idx) => {
          const startMs = run.start_time ? new Date(run.start_time).getTime() : NaN;
          const endMs = run.end_time ? new Date(run.end_time).getTime() : NaN;

          const formatDuration = (ms: number) => {
            if (!isFinite(ms) || ms < 0) return "—";
            const totalSec = Math.floor(ms / 1000);
            const hrs = Math.floor(totalSec / 3600);
            const mins = Math.floor((totalSec % 3600) / 60);
            const secs = totalSec % 60;
            if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
            if (mins > 0) return `${mins}m ${secs}s`;
            return `${secs}s`;
          };

          const duration = run.start_time
            ? run.end_time
              ? formatDuration(endMs - startMs)
              : `in progress (${formatDuration(Date.now() - startMs)})`
            : "—";

          return (
            <div
              key={run.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 2fr 1fr",
                gap: 12,
                padding: "12px",
                borderRadius: 6,
                background: idx % 2 === 0 ? "#ffffff" : "#fbfdff",
                marginBottom: 8,
                alignItems: "center",
              }}
            >
              <div style={{ textTransform: "capitalize" }}>{run.status}</div>
              <div>{run.start_time ? new Date(run.start_time).toLocaleString() : "—"}</div>
              <div>{run.end_time ? new Date(run.end_time).toLocaleString() : "—"}</div>
              <div>{duration}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DetailPage;