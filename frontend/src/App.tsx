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
