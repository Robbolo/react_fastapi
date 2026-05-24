import { useEffect, useState } from 'react'
import DatasetCard from './DatasetCard';

type DatasetRun = {
  id: number;
  name: string;
  status: "success" | "in_progress" | "failed";
  start_time: string;
  end_time: string | null;
};

function App() {
  const [data, setData] = useState<DatasetRun[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/transforms")
        .then((res) => res.json())
        .then((data: DatasetRun[]) => setData(data));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Dataset Dashboard</h1>

      <div style={gridStyle}>
        {data.map((item) => (
          <DatasetCard key={item.id} data={item} />
        ))}
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

export default App;
