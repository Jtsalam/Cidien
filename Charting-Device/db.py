# Charting-Device/db.py
import os
import psycopg2
from urllib.parse import urlparse
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in the environment")

# Parse DATABASE_URL (format: postgres://user:pass@host:port/dbname)
result = urlparse(DATABASE_URL)
username = result.username
password = result.password
database = result.path[1:]  # remove leading '/'
hostname = result.hostname
port = result.port or 5432

def get_connection():
    """Create a new psycopg2 connection."""
    return psycopg2.connect(
        dbname=database,
        user=username,
        password=password,
        host=hostname,
        port=port
    )

def insert_room_data(bed_id: int, audio_path: str) -> bool:
    """
    Insert a new record into room_data table.
    Manages its own connection/cursor for thread-safety.
    """
    sql = """
        INSERT INTO room_data (bed_id, audio_path)
        VALUES (%s, %s)
    """
    try:
        conn = get_connection()
        with conn:
            with conn.cursor() as cur:
                cur.execute(sql, (bed_id, audio_path))
        return True
    except Exception as e:
        print(f"Database insert failed: {e}")
        return False
