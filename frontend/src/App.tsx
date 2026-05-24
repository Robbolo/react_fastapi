import { useEffect, useState } from 'react'
import DatasetCard from './DatasetCard';

type DatasetRun = {
  id: number;
  name: string;
  status: "success" | "in_progress" | "failed";
  start_time: string;
  end_time: string | null;
};

function formatTimeAgo(date: Date | null) {
  if (!date) return "never";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  }

  return `${diffHours} hours ago`;
}

function App() {
  const [data, setData] = useState<DatasetRun[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const systemStatus = getSystemStatus(data);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/transforms")
        .then((res) => res.json())
        .then((data: DatasetRun[]) => {
          setData(data);
          setLastUpdated(new Date());
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px"}}>
  <h1>Dataset Dashboard</h1>
      <div style={bannerStyle(systemStatus)}>
        Shop is {systemStatus}
      </div>
      <div style={gridStyle}>
        {data.map((item) => (
          <DatasetCard key={item.id} data={item} />
        ))}
      </div>
      <div style={tagStyle}>
    last updated {formatTimeAgo(lastUpdated)}
    </div>
    </div>
  );
}

function bannerStyle(status: string): React.CSSProperties {
  let background = "#e5e7eb";
  let color = "#111827";

  if (status === "HEALTHY") {
    background = "#0c964e";
    color = "#ffffff";
  }

  if (status === "LOADING") {
    background = "#e66c1a";
    color = "#ffffff";
  }

  if (status === "UNHEALTHY") {
    background = "#e02020";
    color = "#ffffff";
  }

  return {
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    marginBottom: "15px",
    background,
    color,
  };
}

function getSystemStatus(data: DatasetRun[]) {
  const hasFailed = data.some(d => d.status === "failed");
  const hasInProgress = data.some(d => d.status === "in_progress");
  const allSuccess = data.every(d => d.status === "success");

  if (hasFailed) {
    return "UNHEALTHY";
  }

  if (allSuccess) {
    return "HEALTHY";
  }

  if (hasInProgress) {
    return "LOADING";
  }

  return "UNKNOWN";
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const tagStyle: React.CSSProperties = {
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "999px",
  backgroundColor: "#f3f4f6",
  color: "#374151",
};
export default App;
