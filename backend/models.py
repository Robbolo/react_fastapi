from sqlalchemy import Column, Integer, String, DateTime

from database import Base

# sets up table definition and models for each row
class Transforms(Base):
    __tablename__ = "transforms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    status = Column(String, index=True)
    start_time = Column(DateTime)
    end_time = Column(DateTime)