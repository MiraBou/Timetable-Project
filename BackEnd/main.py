from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/profs/", response_model=schemas.prof)
def create_prof(prof: schemas.profCreate, db: Session = Depends(get_db)):
    db_prof = crud.get_prof_by_email(db, email=prof.email)
   
    if db_prof:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_prof(db=db, prof=prof)


@app.get("/profs/", response_model=List[schemas.prof])
def read_profs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    profs = crud.get_profs(db, skip=skip, limit=limit)
    return profs


@app.get("/profs/{prof_id}", response_model=schemas.prof)
def read_prof(prof_id: int, db: Session = Depends(get_db)):
    db_prof = crud.get_prof(db, prof_id=prof_id)
    if db_prof is None:
        raise HTTPException(status_code=404, detail="prof not found")
    return db_prof

@app.get("/prof/{prof_email}", response_model=schemas.prof)
def read_prof2(prof_email:str ,db: Session = Depends(get_db)):
    db_prof = crud.get_prof_by_email(db, prof_email=prof_email)
    if db_prof is None:
        raise HTTPException(status_code=404, detail="prof not found")
    return db_prof

@app.post("/profs/{prof_id}/items/", response_model=schemas.Item)
def create_item_for_prof(
    prof_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_prof_item(db=db, item=item, prof_id=prof_id)


@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items