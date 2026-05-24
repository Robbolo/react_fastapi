type DatasetRun = {
  id: number;
  name: string;
  status: "success" | "in_progress" | "failed";
  start_time: string;
  end_time: string | null;
};

type Props = {
  data: DatasetRun;
};

function DatasetCard({ data }: Props) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: "0 0 10px 0" }}>{data.name}</h3>

      <div>{formatStatus(data.status)}</div>

      <div style={{ marginTop: 10, fontSize: 12 }}>
        <div>Start: {data.start_time}</div>
        <div>End: {data.end_time ?? "—"}</div>
      </div>
    </div>
  );
}

function formatStatus(status: DatasetRun["status"]) {
  switch (status) {
    case "success":
      return "✅ success";
    case "in_progress":
      return "🟡 in progress";
    case "failed":
      return "❌ failed";
  }
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  width: "250px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

export default DatasetCard;