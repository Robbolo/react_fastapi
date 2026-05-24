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

// describe what each UI card should look like
function DatasetCard({ data }: Props) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: "0 0 10px 0" }}>{data.name}</h3>

      <div>{formatStatus(data.status)}</div>

      <div style={{ marginTop: 10, fontSize: 12 }}>
        <div>Start: {formatDateTime(data.start_time)}</div>
        <div>End: {formatDateTime(data.end_time)}</div>
      </div>
    </div>
  );
}

// helper function to format date for better UI display
function formatDateTime(dateTimeStr: string |null) {
    if (!dateTimeStr) return "—";
    const date = new Date(dateTimeStr);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day} ${month} ${year}`;
}

// function to format status with emojis for better UI display
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