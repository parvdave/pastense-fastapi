# PastTense FastAPI - Semantic Search for Web Page Visits

A FastAPI-based semantic search engine that stores web page visit data and enables intelligent search through visited content using OpenAI embeddings and FAISS vector database.

## 🌟 Features

- **Page Visit Storage**: Store web page visits with URL, title, content, and timestamp
- **Semantic Search**: Find similar pages using AI-powered semantic search
- **Vector Database**: Fast similarity search using FAISS (Facebook AI Similarity Search)
- **OpenAI Integration**: Generate high-quality embeddings using OpenAI's text-embedding-3-small model
- **REST API**: Clean FastAPI endpoints with automatic documentation
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **Modern Frontend**: React TypeScript UI with Tailwind CSS, glassmorphism design and responsive layout

## 🏗️ Architecture

The application consists of several key components:

### Core Files

- **`main.py`**: FastAPI application with three main endpoints
- **`models.py`**: SQLAlchemy model for PageVisit data
- **`db.py`**: Database configuration and session management
- **`embedding.py`**: OpenAI embedding generation
- **`vector_dao.py`**: FAISS vector database operations
- **`processing.py`**: Text cleaning and preprocessing utilities

### Data Flow

1. **Store Page Visit** → Clean content → Generate embedding → Store in both SQL and vector DB
2. **Semantic Search** → Generate query embedding → Search FAISS index → Return similar URLs
3. **Show Results** → Query SQL database → Return detailed page information

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenAI API key

### Backend Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd pastense-fastapi
```

2. **Install Python dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
Create a `.env` file in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. **Run the backend**
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

5. **Navigate to frontend directory**
```bash
cd frontend
```

6. **Install frontend dependencies**
```bash
npm install
```

7. **Run the frontend**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### 1. Store Page Visit
**POST** `/page_visit`

Store a web page visit and generate embeddings for semantic search.

```json
{
  "url": "https://example.com",
  "title": "Example Page",
  "content": "Page content here...",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "status": "stored + embedded"
}
```

### 2. Semantic Search
**POST** `/semantic_search`

Search for semantically similar pages using natural language queries.

```json
{
  "q": "machine learning tutorials",
  "k": 5
}
```

**Response:**
```json
{
  "results": [
    {"url": "https://example.com/ml-tutorial"},
    {"url": "https://example.com/ai-guide"}
  ]
}
```

### 3. Show Results
**POST** `/show_results`

Get detailed information about specific URLs.

```json
["https://example.com/page1", "https://example.com/page2"]
```

**Response:**
```json
{
  "results": [
    {
      "url": "https://example.com/page1",
      "title": "Page Title",
      "favicon": "https://www.google.com/s2/favicons?sz=64&domain=https://example.com/page1"
    }
  ]
}
```

## 🔧 Technical Details

### Database Schema

**PageVisit Model:**
- `url` (String, Primary Key): The visited page URL
- `title` (String): Page title
- `content` (Text): Page content
- `timestamp` (DateTime): When the page was visited

### Vector Database

- **Engine**: FAISS IndexFlatL2 for cosine similarity search
- **Dimension**: 1536 (OpenAI text-embedding-3-small)
- **Storage**: Persistent storage to `faiss.index` and `vector_ids.pkl`
- **Normalization**: L2 normalization for better similarity matching

### Text Processing

The `processing.py` module cleans content by:
- Stripping whitespace
- Collapsing multiple spaces
- Removing cookie banners and newsletter prompts
- Truncating to 5000 characters for OpenAI limits

### Embedding Generation

- **Model**: OpenAI's `text-embedding-3-small`
- **Input limit**: 1000 characters (truncated if longer)
- **Output**: 1536-dimensional vector

## 📁 File Structure

```
pastense-fastapi/
├── main.py              # FastAPI application and endpoints
├── models.py            # SQLAlchemy models
├── db.py                # Database configuration
├── embedding.py         # OpenAI embedding integration
├── vector_dao.py        # FAISS vector operations
├── processing.py        # Text cleaning utilities
├── dao.py               # (Currently unused)
├── requirements.txt     # Python dependencies
├── frontend/            # React TypeScript frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   └── services/    # API service layer
│   ├── package.json     # Frontend dependencies
│   └── README.md        # Frontend documentation
├── .github/             # GitHub issue templates
└── README.md           # This file
```

## 🛠️ Dependencies

Key dependencies include:
- **FastAPI**: Web framework
- **SQLAlchemy**: Database ORM
- **OpenAI**: Embedding generation
- **FAISS**: Vector similarity search
- **NumPy**: Numerical operations
- **python-dotenv**: Environment variable management

## 🚨 Important Notes

- The SQLite database (`visits.db`) and FAISS files (`faiss.index`, `vector_ids.pkl`) are created automatically
- Ensure your OpenAI API key has sufficient credits for embedding generation
- The application includes CORS middleware allowing all origins (adjust for production)
- Content is truncated to fit OpenAI's token limits

## 🌐 Web Interface

Once both backend and frontend are running:

1. **Visit the web app**: Navigate to `http://localhost:5173`
2. **Add page visits**: Use the "Add Page Visit" tab to store web pages
3. **Search semantically**: Use the "Search Pages" tab to find relevant content using natural language

## 📖 API Documentation

For developers, visit `http://localhost:8000/docs` for interactive API documentation powered by FastAPI's automatic OpenAPI generation.
