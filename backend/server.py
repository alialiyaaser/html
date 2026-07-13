"""UR SETUP — Premium bilingual gaming accessories brand backend."""
import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, field_validator

load_dotenv()

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="UR SETUP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")


# ---------------------- Models ----------------------
def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ReviewIn(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    country: Optional[str] = Field(default=None, max_length=60)
    product: str = Field(min_length=1, max_length=80)  # slug e.g. "grey-marble"
    rating: int = Field(ge=1, le=5)
    title: Optional[str] = Field(default=None, max_length=120)
    comment: str = Field(min_length=3, max_length=1000)
    language: str = Field(default="en")  # "en" or "ar"

    @field_validator("language")
    @classmethod
    def _lang(cls, v: str) -> str:
        return v if v in ("en", "ar") else "en"


class Review(ReviewIn):
    id: str
    verified: bool = False
    created_at: str


class NewsletterIn(BaseModel):
    email: EmailStr
    language: str = Field(default="en")


class NewsletterOut(BaseModel):
    id: str
    email: EmailStr
    created_at: str


class Stats(BaseModel):
    customers: int
    orders: int
    reviews_count: int
    average_rating: float


# ---------------------- Routes ----------------------
@api.get("/")
async def root():
    return {"service": "UR SETUP API", "status": "ok"}


@api.get("/reviews", response_model=List[Review])
async def list_reviews(product: Optional[str] = None, limit: int = 50):
    query = {"product": product} if product else {}
    cursor = db.reviews.find(query).sort("created_at", -1).limit(min(limit, 200))
    out: List[Review] = []
    async for doc in cursor:
        doc.pop("_id", None)
        out.append(Review(**doc))
    return out


@api.post("/reviews", response_model=Review, status_code=201)
async def create_review(payload: ReviewIn):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["verified"] = False
    doc["created_at"] = _now_iso()
    await db.reviews.insert_one(dict(doc))
    doc.pop("_id", None)
    return Review(**doc)


@api.get("/reviews/summary")
async def reviews_summary(product: Optional[str] = None):
    match = {"$match": {"product": product}} if product else {"$match": {}}
    pipeline = [
        match,
        {
            "$group": {
                "_id": None,
                "count": {"$sum": 1},
                "avg": {"$avg": "$rating"},
                "five": {"$sum": {"$cond": [{"$eq": ["$rating", 5]}, 1, 0]}},
                "four": {"$sum": {"$cond": [{"$eq": ["$rating", 4]}, 1, 0]}},
                "three": {"$sum": {"$cond": [{"$eq": ["$rating", 3]}, 1, 0]}},
                "two": {"$sum": {"$cond": [{"$eq": ["$rating", 2]}, 1, 0]}},
                "one": {"$sum": {"$cond": [{"$eq": ["$rating", 1]}, 1, 0]}},
            }
        },
    ]
    result = await db.reviews.aggregate(pipeline).to_list(length=1)
    if not result:
        return {"count": 0, "average": 0.0, "breakdown": {"5": 0, "4": 0, "3": 0, "2": 0, "1": 0}}
    r = result[0]
    return {
        "count": r["count"],
        "average": round(r["avg"] or 0, 2),
        "breakdown": {"5": r["five"], "4": r["four"], "3": r["three"], "2": r["two"], "1": r["one"]},
    }


@api.post("/newsletter", response_model=NewsletterOut, status_code=201)
async def subscribe_newsletter(payload: NewsletterIn):
    existing = await db.newsletter.find_one({"email": payload.email})
    if existing:
        existing.pop("_id", None)
        return NewsletterOut(**existing)
    doc = {
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "language": payload.language,
        "created_at": _now_iso(),
    }
    await db.newsletter.insert_one(dict(doc))
    doc.pop("_id", None)
    return NewsletterOut(**doc)


@api.get("/stats", response_model=Stats)
async def get_stats():
    summary_doc = await db.reviews.aggregate(
        [{"$group": {"_id": None, "count": {"$sum": 1}, "avg": {"$avg": "$rating"}}}]
    ).to_list(length=1)
    if summary_doc:
        s = summary_doc[0]
        reviews_count = s["count"]
        avg = round(s["avg"] or 5.0, 2)
    else:
        reviews_count = 0
        avg = 5.0

    meta = await db.meta.find_one({"key": "counters"}) or {}
    return Stats(
        customers=meta.get("customers", 250),
        orders=meta.get("orders", 500),
        reviews_count=reviews_count,
        average_rating=avg if reviews_count else 4.9,
    )


@api.post("/contact")
async def contact_submit(payload: dict):
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()
    if not (name and email and message):
        raise HTTPException(status_code=400, detail="missing fields")
    doc = {
        "id": str(uuid.uuid4()),
        "name": name[:120],
        "email": email[:200],
        "message": message[:2000],
        "created_at": _now_iso(),
    }
    await db.contacts.insert_one(dict(doc))
    return {"ok": True, "id": doc["id"]}


# ---------------------- Seed ----------------------
SEED_REVIEWS = [
    {"name": "Faisal A.", "country": "SA", "product": "dark-marble", "rating": 5,
     "title": "Museum-grade quality", "comment": "The stitching, the texture — feels like a luxury item. Ships fast in Riyadh.", "language": "en"},
    {"name": "Layla K.", "country": "AE", "product": "white-marble", "rating": 5,
     "title": "قطعة فنية", "comment": "الخامة فخمة جداً، ملمس الرخام حقيقي. غيّرت شكل مكتبي بالكامل.", "language": "ar"},
    {"name": "Marcus R.", "country": "DE", "product": "grey-marble", "rating": 5,
     "title": "Better than premium brands", "comment": "I own Razer and Logitech pads — this one glides smoother and looks 10x better.", "language": "en"},
    {"name": "Omar S.", "country": "SA", "product": "dark-marble", "rating": 4,
     "title": "ممتاز", "comment": "جودة ممتازة والشحن سريع. أنصح فيه بشدة.", "language": "ar"},
    {"name": "Sophie L.", "country": "FR", "product": "white-marble", "rating": 5,
     "title": "Editorial-worthy", "comment": "It photographs beautifully. My whole setup looks curated now.", "language": "en"},
    {"name": "Abdullah M.", "country": "SA", "product": "grey-marble", "rating": 5,
     "title": "فخامة سعودية", "comment": "براند سعودي يستاهل. الرخام الرمادي بشكل احترافي مذهل.", "language": "ar"},
]


@app.on_event("startup")
async def seed():
    if await db.reviews.count_documents({}) == 0:
        docs = []
        for r in SEED_REVIEWS:
            docs.append({
                **r,
                "id": str(uuid.uuid4()),
                "verified": True,
                "created_at": _now_iso(),
            })
        await db.reviews.insert_many(docs)
    await db.meta.update_one(
        {"key": "counters"},
        {"$setOnInsert": {"key": "counters", "customers": 250, "orders": 500}},
        upsert=True,
    )


app.include_router(api)
