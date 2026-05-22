from datetime import datetime, timedelta

from database import engine, SessionLocal
from models import * 



# use function to main guard the imports to prevent circular imports
def init_db():
    
    # create tables
    Base.metadata.create_all(bind=engine)

    # create db session
    db = SessionLocal()

    # add some sample data

    sample_rows = [
        Transforms(
            name="cookies",
            status="success",
            start_time=datetime.now() - timedelta(hours=24),
            end_time=datetime.now() - timedelta(hours=23)
        ),
        Transforms(
            name="cookies",
            status="success",
            start_time=datetime.now() - timedelta(hours=15),
            end_time=datetime.now() - timedelta(hours=14)
        ),
        Transforms(
            name="cookies",
            status="success",
            start_time=datetime.now() - timedelta(hours=10),
            end_time=datetime.now() - timedelta(hours=9)
        ),
        Transforms(
            name="cookies",
            status="success",
            start_time=datetime.now() - timedelta(minutes=10),
            end_time=datetime.now() - timedelta(minutes=5)
        ),
        Transforms(
            name="ice_cream",
            status="in_progress",
            start_time=datetime.now() - timedelta(hours=1),
            end_time=None
        ),
        Transforms(
            name="ice_cream",
            status="success",
            start_time=datetime.now() - timedelta(hours=6),
            end_time=datetime.now() - timedelta(hours=4)
        ),
        Transforms(
            name="pizza",
            status="success",
            start_time=datetime.now() - timedelta(hours=3),
            end_time=datetime.now() - timedelta(hours=2, minutes=30)
        ),
        Transforms(
            name="pizza",
            status="failed",
            start_time=datetime.now() - timedelta(hours=2),
            end_time=datetime.now() - timedelta(minutes=30)
        ),
    ]

    db.add_all(sample_rows)
    db.commit()
    db.close()

    print("database initialized with sample data")

if __name__ == "__main__":
    init_db()