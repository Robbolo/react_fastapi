from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# establish db url
DATABASE_URL = "sqlite:///./dashboard.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# used for creating sessions
SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()


