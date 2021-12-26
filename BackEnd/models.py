from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, CheckConstraint , Enum
from database import Base
from sqlalchemy.orm import relationship

class prof(Base):
    __tablename__ = "profs"
 
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(50), unique=True, index=True)
    hashed_password = Column(String(50))
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), index=True)
    description = Column(String(50), index=True)
    owner_id = Column(Integer, ForeignKey("profs.id"))

    owner = relationship("prof", back_populates="items")