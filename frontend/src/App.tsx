import { useEffect, useState } from 'react'
import './App.css'

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
  fetch("http://localhost:8000/transforms")
    .then((res) => res.json())
    .then((data: DatasetRun[]) => setData(data));
}, []);

return (
  <div style={{ padding: "20px" }}>
    <h1>Dataset Dashboard</h1>

    {data.map((item) => (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <span>{item.name}</span>
        <span>
  {item.status === "success" && "✅ success"}
  {item.status === "in_progress" && "🟡 in_progress"}
  {item.status === "failed" && "❌ failed"}
</span>
      </div>
    ))}
  </div>
);
}

export default App;
