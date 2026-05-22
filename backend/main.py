from fastapi import FastAPI
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Transforms

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Dashboard API is running"}

@app.get("/transforms")
def get_transforms():
    # connect to db and query all rows
    db: Session = SessionLocal()
    transforms = db.query(Transforms).all()

    # convert to list of dicts for json response
    results = []
    for t in transforms:
        results.append({
            "id": t.id,
            "name": t.name,
            "status": t.status,
            "start_time": t.start_time.isoformat() if t.start_time else None,
            "end_time": t.end_time.isoformat() if t.end_time else None
        })
    return results


