from sqlalchemy.orm import Session
import models, schemas


def get_prof(db: Session, prof_id: int):
    return db.query(models.prof).filter(models.prof.id == prof_id).first()


def get_prof_by_email(db: Session, email: str):
    return db.query(models.prof).filter(models.prof.email == email).first()


def get_profs(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.prof).offset(skip).limit(limit).all()


def create_prof(db: Session, prof: schemas.profCreate):
    fake_hashed_password = prof.password + "notreallyhashed"
    db_prof = models.prof(email=prof.email, hashed_password=fake_hashed_password)
    db.add(db_prof)
    db.commit()
    db.refresh(db_prof)
    return db_prof


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_prof_item(db: Session, item: schemas.ItemCreate, prof_id: int):
    db_item = models.Item(**item.dict(), owner_id=prof_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item