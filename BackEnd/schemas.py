
from typing import List, Optional

from pydantic import BaseModel,EmailStr


class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class profBase(BaseModel):
    email: str


class profCreate(profBase):
    password: str


class prof(profBase):
    id: int
    is_active: bool
    items: List[Item] = []

    class Config:
        orm_mode = True

class UpdateProfModel(BaseModel):
     email: Optional[str]
   