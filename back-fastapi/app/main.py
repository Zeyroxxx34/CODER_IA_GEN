from fastapi import FastAPI
from .models.count_table import CountTable, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.middleware.cors import CORSMiddleware
from .models.count_table import reset_and_init_count

reset_and_init_count()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://coder_ia_gen:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = "postgresql://user:password@postgres:5432/mydb"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/count")
def get_count():
    session = SessionLocal()
    count_row = session.query(CountTable).first()
    count_value = count_row.count_number if count_row else None
    session.close()
    return {"count_number": count_value}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@app.post("/count/increment")
def increment_count():
    session = SessionLocal()
    count_row = session.query(CountTable).first()
    if count_row:
        count_row.count_number += 1
        session.commit()
        new_count = count_row.count_number
    else:
        new_count = None
    session.close()
    return {"count_number": new_count}
