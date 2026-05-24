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

      {runs.map((run) => (
        <div
          key={run.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          <div>Status: {run.status}</div>
          <div>Start: {run.start_time}</div>
          <div>End: {run.end_time ?? "—"}</div>
        </div>
      ))}
    </div>
  );
}

export default DetailPage;