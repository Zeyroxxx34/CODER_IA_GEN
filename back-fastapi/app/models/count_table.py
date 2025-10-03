from sqlalchemy import Column, Integer, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class CountTable(Base):
    __tablename__ = "count_table"
    id = Column(Integer, primary_key=True, index=True)
    count_number = Column(Integer, nullable=False)

DATABASE_URL = "postgresql://user:password@postgres:5432/mydb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Créer la base et la table
Base.metadata.create_all(bind=engine)

# Vider la table et ajouter une ligne avec count_number = 0
def reset_and_init_count():
    session = SessionLocal()
    session.query(CountTable).delete()
    session.add(CountTable(count_number=0))
    session.commit()
    session.close()

if __name__ == "__main__":
    reset_and_init_count()