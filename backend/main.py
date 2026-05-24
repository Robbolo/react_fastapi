from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import SessionLocal
from models import Transforms

# start fastAPI object
app = FastAPI()

# allow CORS for react frontend running on localhost:5173 to access API endpoint
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# test endpoint to confirm api is running
@app.get("/")
def root():
    return {"message": "Dashboard API is running"}

# endpoint to get most recent row for each unique name in Transforms table
@app.get("/transforms")
def get_transforms():

    # connect to db
    with SessionLocal() as db:

        # create window subquery to rank rows by start_time for each unique name
        latest_row = db.query(
            Transforms,
            func.row_number()
                .over(partition_by=Transforms.name, order_by=Transforms.start_time.desc())
                .label("row_number")
        ).subquery()

        # send query that filters for most recent row for each unique name
        query = db.query(latest_row).filter(latest_row.c.row_number == 1)

        # send query and close db connection
        db_results = query.all()

        # make list of dicts for returning in api response
        api_results = []

        # iterate through db results and convert to dict format for api response
        for row in db_results:
            api_results.append({
                "id": row.id,
                "name": row.name,
                "status": row.status,
                "start_time": row.start_time.isoformat() if row.start_time else None,
                "end_time": row.end_time.isoformat() if row.end_time else None
            })
        return api_results


