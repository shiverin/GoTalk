# GoTalk – Community Forum Platform

A modern, full-stack community forum platform inspired by Reddit, built with **React 18** and **Go 1.25.5**. GoTalk enables users to create and manage communities, share posts, engage in discussions through comments, vote on content, and discover trending posts and communities.
---
> **Note:** Portions of the backend implementation were developed with the assistance of AI tools to help with JWT handling and API endpoint design. All code has been reviewed to ensure correctness.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Component Architecture](#component-architecture)

---

## 🎯 Overview

GoTalk is a full-stack community forum application that combines a React-based frontend with a Go backend API. The platform allows users to:

- Create and manage communities
- Post content (text, links, or discussion threads)
- Comment on posts and engage in threaded discussions
- Vote on posts and comments
- Discover popular communities and trending posts
- Manage user profiles and community memberships

The application follows modern architectural patterns with:
- **Frontend**: Component-based React architecture with context-based state management
- **Backend**: RESTful API built with Chi router, JWT authentication, and SQLite database
- **Styling**: TailwindCSS for responsive, utility-first design

---

## ✨ Implemented Features

### 🔐 Authentication & User Management
- ✅ **User Registration**: Create accounts with username and password
- ✅ **Secure Login/Logout**: JWT-based token management
- ✅ **Session Persistence**: HttpOnly cookie storage for secure token handling
- ✅ **Password Security**: Bcrypt hashing with cost factor 12 (industry standard)
- ✅ **Token Refresh**: Automatic token refresh on `/auth/refresh` endpoint
- ✅ **Current User Info**: `/auth/me` endpoint to fetch logged-in user details
- ✅ **User Profiles**: View user information (ID, username, email, creation date)

### 🏘️ Communities
- ✅ **Create Communities**: Authenticated users can establish new communities with name, description, icon URL, and rules
- ✅ **Browse All Communities**: Public endpoint to list all communities
- ✅ **Top Communities**: Ranked communities by member count with configurable limit (`/communities/top/{limit}`)
- ✅ **Community Details**: Retrieve full community info including member count and post count
- ✅ **Join Community**: Authenticated users join communities (tracked in `community_members` table)
- ✅ **Leave Community**: Users can leave communities they've joined
- ✅ **Member Tracking**: Real-time member count per community
- ✅ **Community Roles**: Members table supports role assignment (default: 'member', extensible to 'moderator', 'admin')
- ✅ **Duplicate Prevention**: Unique constraint prevents duplicate memberships (user_id, community_id)

### 📝 Posts & Content Management
- ✅ **Create Posts**: Submit text content, external links, or discussion threads to communities
- ✅ **Edit Posts**: Authors can modify post title, content, and links (tracked via `updated_at`)
- ✅ **Delete Posts**: Authorized deletion with validation (owner/admin only)
- ✅ **Rich Post Metadata**: Each post tracks title, content, link, author, community, creation time, update time, and score
- ✅ **Post Scoring**: Vote-based scoring (sum of all user votes on post)
- ✅ **Posts by Community**: Dedicated endpoint to fetch all posts in a specific community (`/communities/{id}/posts`)
- ✅ **Post Retrieval**: Get all posts or individual post details with full metadata
- ✅ **Author Information**: Posts linked to user ID for attribution

### 💬 Comments & Discussion System
- ✅ **Create Comments**: Reply to posts with threaded comments
- ✅ **Edit Comments**: Modify comment content after creation
- ✅ **Delete Comments**: Remove unwanted comments with authorization
- ✅ **Comment Metadata**: Timestamp tracking (created_at, updated_at) for chronological sorting
- ✅ **Comment-to-Post Association**: Each comment linked to parent post for threaded discussions
- ✅ **Get Post Comments**: Retrieve all comments for a specific post
- ✅ **Comment Count**: Track total comments per post

### ⭐ Voting & Scoring System
- ✅ **Upvote/Downvote Posts**: Vote on posts with ±1 value system
- ✅ **Vote State Management**: Track existing votes per user to prevent duplicate voting
- ✅ **Vote Updates**: Change vote from +1 to -1 or vice versa (stored as composite key user_id + post_id)
- ✅ **Vote Removal**: Clear votes by setting value to 0 (unvote)
- ✅ **Aggregate Scoring**: Post score calculated as sum of all votes (dynamic computation)
- ✅ **Database Efficiency**: Primary key (user_id, post_id) ensures one vote per user per post

### 🔍 Discovery & Browsing
- ✅ **Popular Posts Feed**: Dedicated page displaying trending posts (sorted by score/recency)
- ✅ **Top Communities**: Browse communities ranked by member count with pagination support
- ✅ **Community Listing Page**: Browse all communities with join buttons
- ✅ **Post Filtering Controls**: Filter and sort posts by various criteria (planned: date, score, comments)
- ✅ **Landing Page**: Home feed with community carousel and post feed
- ✅ **Search Bar**: Component ready for search functionality integration

### 🎨 User Interface Features
- ✅ **Responsive Sidebar**: Collapsible navigation (toggles between 18.5% and 10.3% width)
- ✅ **Header Navigation**: Top navigation bar with search and user menu
- ✅ **Modal Auth System**: Login/Signup presented in modal overlay (non-intrusive)
- ✅ **Card-Based Layout**: Posts displayed in reusable card components
- ✅ **Community Carousel**: Featured communities displayed in horizontal scroll
- ✅ **Vote UI**: Upvote/downvote buttons with visual state feedback
- ✅ **Comment Thread UI**: Nested comment display with reply capability
- ✅ **Dropdown Menus**: Context menus for post/comment actions (edit, delete)
- ✅ **Loading States**: Component loading indicators during async operations

---

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Go | 1.25.5 | Core backend language |
| Chi Router | v5.2.3 | HTTP router and middleware |
| JWT (golang-jwt) | v5.3.0 | Token-based authentication |
| Bcrypt (crypto) | v0.46.0 | Password hashing |
| SQLite3 | v1.14.32 | Database |
| CORS Handler | v1.2.2 | Cross-Origin Resource Sharing |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework |
| React Router | 7.10.1 | Client-side routing |
| Vite | 5.4.21 | Build tool & dev server |
| TailwindCSS | 3.4.19 | Utility-first CSS framework |
| Lucide React | 0.561.0 | Icon library |
| React Icons | 5.5.0 | Additional icon sets |
| ESLint | 9.39.1 | Code linting |
| PostCSS | 8.5.6 | CSS preprocessing |

---

## 📁 Project Structure

```
GoTalk/
├── backend/                          # Go backend application
│   ├── cmd/
│   │   └── api/
│   │       ├── main.go              # Application entry point
│   │       └── forum.db             # SQLite database file
│   ├── internal/
│   │   ├── database/
│   │   │   ├── database.go          # Database connection & initialization
│   │   │   └── migrate.go           # Schema creation & migrations
│   │   ├── handlers/                # HTTP request handlers
│   │   │   ├── auth.go              # Authentication endpoints
│   │   │   ├── posts.go             # Post CRUD operations
│   │   │   ├── comments.go          # Comment management
│   │   │   ├── communities.go       # Community operations
│   │   │   ├── members.go           # Community membership
│   │   │   ├── vote.go              # Voting system
│   │   │   ├── users.go             # User endpoints
│   │   │   └── makecommunity.go     # Community creation
│   │   ├── middleware/
│   │   │   └── auth.go              # JWT authentication middleware
│   │   └── models/                  # Data structures
│   │       ├── user.go              # User model
│   │       ├── post.go              # Post model
│   │       ├── comment.go           # Comment model
│   │       ├── community.go         # Community model
│   │       ├── community_member.go  # Membership model
│   │       └── vote.go              # Vote model
│   └── go.mod                       # Go module dependencies
│
├── frontend/                         # React frontend application
│   ├── src/
│   │   ├── App.jsx                  # Root application component
│   │   ├── main.jsx                 # React DOM entry point
│   │   ├── index.css                # Global styles
│   │   ├── App.css                  # Application styles
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   ├── pages/                   # Page-level components
│   │   │   ├── LandingPage.jsx      # Home page
│   │   │   ├── PostPage.jsx         # Individual post view
│   │   │   ├── CreatePostPage.jsx   # Post creation/editing
│   │   │   ├── UserProfilePage.jsx  # User profile view
│   │   │   ├── CommunityPage.jsx    # Community view
│   │   │   ├── CommunityListPage.jsx# Communities listing
│   │   │   ├── PopularPostPage.jsx  # Trending posts
│   │   │   └── Layout.jsx           # Base layout template
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Button/              # Button component
│   │   │   ├── Card/                # Card & post card components
│   │   │   ├── LoginForm/           # Login form
│   │   │   ├── SignupForm/          # Signup form
│   │   │   ├── LoginModal/          # Auth modal
│   │   │   ├── SearchBar/           # Search component
│   │   │   ├── DropdownMenu/        # Menu components
│   │   │   ├── CommentBar/          # Comment input
│   │   │   ├── JoinButton/          # Community join button
│   │   │   ├── CreateCommunityModal/# Create community dialog
│   │   │   └── ...                  # Other UI components
│   │   ├── sections/                # Page sections/layouts
│   │   │   ├── Header/              # Navigation header
│   │   │   ├── SideBar/             # Sidebar navigation
│   │   │   ├── PostSection/         # Posts display area
│   │   │   ├── PostBar/             # Post filter controls
│   │   │   ├── CreatePost/          # Post creation section
│   │   │   └── ...                  # Other page sections
│   │   ├── utils/
│   │   │   └── color.js             # Utility functions
│   │   └── assets/                  # Static assets
│   ├── public/                      # Public static files
│   ├── index.html                   # HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # TailwindCSS configuration
│   ├── eslint.config.js            # ESLint rules
│   ├── postcss.config.js           # PostCSS configuration
│   └── .stylelintrc.json           # Style linting rules
│
├── package.json                     # Root package metadata
├── .env                            # Environment variables
├── DevLog.txt                      # Development log
├── LICENSE                         # License file
└── README.md                       # This file
```

---

## 🚀 Getting Started

### Prerequisites

**System Requirements:**
- Node.js 16+ (frontend)
- Go 1.25.5+ (backend)
- npm or yarn (package management)
- Git

**Recommended Development Tools:**
- VS Code with Go and React extensions
- Postman or similar API testing tool
- SQLite browser (optional, for database inspection)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Go dependencies:**
   ```bash
   go mod download
   ```

3. **Database Configuration:**
   
   The application currently uses a specific absolute path for the SQLite database. You may need to update `backend/internal/database/database.go` to match your local path if the application fails to find the database.

4. **Start the backend server:**
   ```bash
   cd cmd/api
   go run main.go
   ```
   
   The backend API will be available at `http://localhost:8080`

5. **Verify backend is running:**
   ```bash
   # Test a simple endpoint
   curl http://localhost:8080/api/communities
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

### Running Both Services

For development, you'll need two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend/cmd/api
go run main.go
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

---

## � Feature Completion Matrix

### Core Features Status

| Feature | Backend | Frontend | Status |
|---------|---------|----------|--------|
| **User Authentication** | ✅ | ✅ | Complete |
| Register User | ✅ | ✅ | Complete |
| Login/Logout | ✅ | ✅ | Complete |
| JWT Token Management | ✅ | ✅ | Complete |
| Get Current User | ✅ | ✅ | Complete |
| User Profiles | ✅ | ✅ | Complete |
| **Communities** | ✅ | ✅ | Complete |
| Create Community | ✅ | ✅ | Complete |
| Browse All Communities | ✅ | ✅ | Complete |
| Get Top Communities | ✅ | ✅ | Complete |
| Community Details | ✅ | ✅ | Complete |
| Join Community | ✅ | ✅ | Complete |
| Leave Community | ✅ | ✅ | Complete |
| **Posts** | ✅ | ✅ | Complete |
| Create Post | ✅ | ✅ | Complete |
| View All Posts | ✅ | ✅ | Complete |
| View Single Post | ✅ | ✅ | Complete |
| Get Posts by Community | ✅ | ✅ | Complete |
| Edit Post | ✅ | ✅ | Complete |
| Delete Post | ✅ | ✅ | Complete |
| **Comments** | ✅ | ✅ | Complete |
| Create Comment | ✅ | ✅ | Complete |
| View Post Comments | ✅ | ✅ | Complete |
| Edit Comment | ✅ | ✅ | Complete |
| Delete Comment | ✅ | ✅ | Complete |
| **Voting** | ✅ | ✅ | Complete |
| Vote on Post | ✅ | ✅ | Complete |
| Update Vote | ✅ | ✅ | Complete |
| Calculate Post Score | ✅ | ✅ | Complete |
| **Discovery** | ✅ | ✅ | Complete |
| Popular Posts Feed | ✅ | ✅ | Complete |
| Top Communities Ranking | ✅ | ✅ | Complete |

### In-Progress / Planned Features

| Feature | Priority | Status | Notes |
|---------|----------|--------|-------|
| **Notifications** | High | 🔄 Planning | Real-time notification system |
| **Direct Messaging** | Medium | 📋 Planned | Private user-to-user messages |
| **Advanced Search** | High | 🔄 In Progress | Full-text search across posts/comments |
| **User Reputation/Karma** | Medium | 📋 Planned | Scoring based on community engagement |
| **Media Upload** | High | 🔄 Designing | Image/video support in posts/comments |
| **Moderators & Roles** | Medium | ⚠️ Partial | Role field exists, permissions not enforced |
| **Private Communities** | Low | ⚠️ Partial | `is_private` field in DB, access control incomplete |
| **Content Moderation** | Medium | 📋 Planned | Report/flag system for inappropriate content |
| **Infinite Scroll** | Low | 🔄 Designing | Pagination for large feed lists |
| **Real-time Updates** | High | 🔄 Planning | WebSocket for live comments/votes |
| **Analytics Dashboard** | Low | 📋 Planned | Engagement metrics and trending analysis |

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints (Public)

#### Register User
```http
POST /auth/register
Content-Type: application/json

Request:
{
  "username": "string",
  "password": "string"
}

Response: 201 Created
{
  "message": "User registered successfully"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

Request:
{
  "username": "string",
  "password": "string"
}

Response: 200 OK
{
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string"
  }
}
```
**Note**: JWT token stored in HttpOnly cookie automatically. Include `credentials: "include"` in fetch requests.

#### Logout
```http
POST /auth/logout
(Credentials required)

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

#### Refresh Token
```http
POST /auth/refresh
(Credentials required)

Response: 200 OK
{
  "token": "jwt_token_string"
}
```

### Current User Endpoints (Auth Required)

#### Get Current User Info
```http
GET /auth/me
(Credentials required)

Response: 200 OK
{
  "user": {
    "id": "integer",
    "username": "string",
    "email": "string",
    "createdAt": "timestamp"
  }
}
```

### Communities Endpoints

#### Get All Communities (Public)
```http
GET /communities

Response: 200 OK
[
  {
    "id": "integer",
    "name": "string",
    "icon": "string (URL)",
    "description": "string",
    "rules": "string",
    "members": "integer",
    "postsCount": "integer",
    "isPrivate": "boolean",
    "createdAt": "timestamp"
  }
]
```

#### Get Top Communities (Public)
```http
GET /communities/top/{limit}

Query Parameters:
- limit: Integer (required) - Number of communities to return

Response: 200 OK
[Community, ...]  # Array of communities sorted by member count (DESC)
```

#### Get Community by ID (Public)
```http
GET /communities/{communityID}

Response: 200 OK
{Community}
```

#### Create Community (Auth Required)
```http
POST /communities
Content-Type: application/json
(Credentials required)

Request:
{
  "name": "string",
  "description": "string",
  "icon": "string (URL)",
  "rules": "string"
}

Response: 201 Created
{Community}
```

#### Update Community (Auth Required)
```http
PUT /communities/{communityID}
Content-Type: application/json
(Credentials required)

Request:
{
  "name": "string",
  "description": "string",
  "icon": "string (URL)",
  "rules": "string"
}

Response: 200 OK
{Community}
```

#### Delete Community (Auth Required)
```http
DELETE /communities/{communityID}
(Credentials required)

Response: 200 OK
{
  "message": "Community deleted successfully"
}
```

#### Join Community (Auth Required)
```http
POST /communities/{id}/join
(Credentials required)

Response: 200 OK
{
  "message": "Joined community successfully"
}
```

#### Leave Community (Auth Required)
```http
POST /communities/{id}/leave
(Credentials required)

Response: 200 OK
{
  "message": "Left community successfully"
}
```

#### Check Membership (Auth Required)
```http
GET /communities/{id}/joined
(Credentials required)

Response: 200 OK
{
  "isMember": "boolean"
}
```

### Posts Endpoints

#### Get All Posts (Public)
```http
GET /posts

Response: 200 OK
[
  {
    "id": "integer",
    "title": "string",
    "content": "string",
    "link": "string",
    "authorId": "integer",
    "communityId": "integer",
    "score": "integer",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

#### Get Single Post (Public)
```http
GET /posts/{postID}

Response: 200 OK
{Post}
```

#### Get Posts by Community (Public)
```http
GET /communities/{communityID}/posts

Response: 200 OK
[Post, ...]
```

#### Get Posts by User (Public)
```http
GET /users/{userID}/posts

Response: 200 OK
[Post, ...]
```

#### Create Post (Auth Required)
```http
POST /posts
Content-Type: application/json
(Credentials required)

Request:
{
  "title": "string",
  "content": "string",
  "link": "string",
  "communityId": "integer"
}

Response: 201 Created
{Post}
```

#### Update Post (Auth Required)
```http
PUT /posts/{postID}
Content-Type: application/json
(Credentials required)

Request:
{
  "title": "string",
  "content": "string",
  "link": "string"
}

Response: 200 OK
{Post}
```

#### Delete Post (Auth Required)
```http
DELETE /posts/{postID}
(Credentials required)

Response: 200 OK
{
  "message": "Post deleted successfully"
}
```

Response: 200 OK
{Post}
```

#### Delete Post
```
DELETE /posts/{postID}
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Post deleted successfully"
}
```

### Comments Endpoints

#### Create Comment (Auth Required)
```http
POST /posts/{postID}/comments
Content-Type: application/json
(Credentials required)

Request:
{
  "content": "string (required, cannot be empty)"
}

Response: 201 Created
{
  "id": "integer",
  "content": "string",
  "authorId": "integer",
  "postId": "integer",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### Get Post Comments (Public)
```http
GET /posts/{postID}/comments

Response: 200 OK
[
  {
    "id": "integer",
    "content": "string",
    "authorId": "integer",
    "postId": "integer",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
]
```

#### Update Comment (Auth Required)
```http
PATCH /comments/{commentID}
Content-Type: application/json
(Credentials required)

Request:
{
  "content": "string"
}

Response: 200 OK
{Comment}
```

#### Delete Comment (Auth Required)
```http
DELETE /comments/{commentID}
(Credentials required)

Response: 200 OK
{
  "message": "Comment deleted successfully"
}
```

#### Get Comments by User (Public)
```http
GET /users/{userID}/comments

Response: 200 OK
[Comment, ...]
```

### Voting Endpoints

#### Cast Vote (Auth Required)
```http
POST /vote
Content-Type: application/json
(Credentials required)

Request:
{
  "userId": "integer",
  "postId": "integer",
  "value": "integer (1 for upvote, -1 for downvote)"
}

Response: 200 OK
{
  "postId": "integer",
  "userId": "integer",
  "value": "integer",
  "message": "Vote recorded"
}
```
**Note**: Update existing vote by posting again with same postId and different value.

#### Remove Vote (Auth Required)
```http
DELETE /vote
Content-Type: application/json
(Credentials required)

Request:
{
  "userId": "integer",
  "postId": "integer"
}

Response: 200 OK
{
  "message": "Vote removed"
}
```

#### Get Vote (Public)
```http
GET /vote/{userID}/{postID}

Response: 200 OK
{
  "userId": "integer",
  "postId": "integer",
  "value": "integer"
}
```

### User Endpoints

#### Get User by ID (Public)
```http
GET /users/{userID}

Response: 200 OK
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "createdAt": "timestamp"
}
```

---

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Communities Table
```sql
CREATE TABLE communities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  icon TEXT,
  description TEXT,
  rules TEXT,
  members INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  is_private BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Posts Table
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT,
  link TEXT,
  author_id INTEGER NOT NULL,
  community_id INTEGER NOT NULL,
  score INTEGER DEFAULT 0,           -- NEW: Vote aggregate
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (community_id) REFERENCES communities(id)
);
```

### Comments Table
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
```

### Votes Table
```sql
CREATE TABLE votes (
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  value INTEGER NOT NULL,      -- 1 = upvote, -1 = downvote
  PRIMARY KEY (user_id, post_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  UNIQUE(user_id, post_id)
);
```

### Community Members Table
```sql
CREATE TABLE community_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  community_id INTEGER NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',   -- 'member', 'moderator', 'admin'
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (community_id) REFERENCES communities(id),
  UNIQUE(user_id, community_id)
);
```

---

## 🏗 Component Architecture

### Frontend Pages Implemented

| Page | Route | Features |
|------|-------|----------|
| **LandingPage** | `/` | Home feed with community carousel, post feed, popular communities sidebar |
| **PostPage** | `/posts/:id` | Single post view with full comments thread, vote buttons, edit/delete actions |
| **CreatePostPage** | `/create`, `/c/:communityId/create`, `/posts/:postId/edit/:communityId` | Post editor with community selector, support for create and edit modes |
| **CommunityPage** | `/communities/:id` | Community view with header, join/leave button, all posts in community |
| **CommunityListPage** | `/communities` | Browse all communities with member counts, join buttons |
| **PopularPostPage** | `/popular` | Trending posts feed sorted by engagement |
| **UserProfilePage** | `/users/:id` | User profile showing user info and their posts |
| **Layout** | (Template) | Base template for all pages: Header + Sidebar + Content area |

### Frontend Component Hierarchy

```
App
├── Router (React Router v7)
│   ├── LandingPage
│   │   ├── Layout
│   │   │   ├── Header (Navigation, Search, User Menu)
│   │   │   ├── SideBar (Navigation links, Community list)
│   │   │   └── Content
│   │   │       ├── CardSlides (Carousel - Featured Communities)
│   │   │       ├── PostSection
│   │   │       │   ├── PostBar (Filter/Sort controls)
│   │   │       │   └── Post[] (Feed of PostCards)
│   │   │       │       └── PostCard
│   │   │       │           ├── PostCardContent
│   │   │       │           ├── Vote Buttons
│   │   │       │           └── Action Dropdown
│   │   │       └── PopularCommunities
│   │
│   ├── PostPage
│   │   ├── Layout
│   │   │   ├── Header
│   │   │   ├── SideBar
│   │   │   └── Post (Single with full metadata)
│   │   │       ├── Vote Buttons
│   │   │       ├── Author Info
│   │   │       ├── Comments[]
│   │   │       │   ├── Comment Item
│   │   │       │   └── CommentBar (Reply input)
│   │   │       └── Actions (Edit, Delete)
│   │
│   ├── CreatePostPage
│   │   ├── PostEditor
│   │   ├── CommunitySelector
│   │   └── Submit Button
│   │
│   ├── CommunityPage
│   │   ├── Layout
│   │   │   ├── Community Header (Name, icon, description)
│   │   │   ├── JoinButton
│   │   │   ├── Member Count
│   │   │   └── Posts in Community[]
│   │
│   ├── CommunityListPage
│   │   ├── Layout
│   │   │   └── Communities[] with Join Buttons
│   │
│   ├── PopularPostPage
│   │   ├── Layout
│   │   │   └── Popular Posts[] (sorted by engagement)
│   │
│   └── UserProfilePage
│       ├── Layout
│       │   ├── Profile Header
│       │   └── User Posts[]
│
└── LoginModal (Global)
    ├── LoginForm
    └── SignupForm

AuthContext (Global State)
├── user (current user object or null)
├── loading (boolean)
├── login() (async function)
└── logout() (async function)
```

### Key Reusable Components

| Component | Location | Purpose |
|-----------|----------|---------|
| **Button** | `components/Button/` | Styled button with variants |
| **Card** | `components/Card/Card.jsx` | Generic card container |
| **PostCard** | `components/Card/PostCard.jsx` | Post display card with metadata |
| **PostCardContent** | `components/Card/PostCardContent.jsx` | Post content rendering |
| **LoginModal** | `components/LoginModal/` | Auth modal (login/signup) |
| **LoginForm** | `components/LoginForm/` | Login form component |
| **SignupForm** | `components/SignupForm/` | Registration form component |
| **CommentBar** | `components/CommentBar/` | Comment input and submission |
| **SearchBar** | `components/SearchBar/` | Search input with dynamic placeholder |
| **JoinButton** | `components/JoinButton/` | Join/Leave community toggle |
| **CreateCommunityModal** | `components/CreateCommunityModal/` | Create new community dialog |
| **DropdownMenu** | `components/DropdownMenu/` | Reusable dropdown menu system |
| **AbsoluteDropdown** | `components/DropdownMenu/AbsoluteDropdown.jsx` | Absolute-positioned dropdown |
| **DropdownItem** | `components/DropdownMenu/DropdownItem.jsx` | Individual dropdown items |
| **CircleButton** | `components/CircleButton/` | Circular button (sidebar toggle) |
| **PillButton** | `components/PillButton/` | Pill-shaped button |
| **Carousel** | `components/Carousel/` | Community carousel display |
| **VerticalMenu** | `components/VerticalMenu/` | Vertical navigation menu |
| **Community** | `components/Community/` | Community card display |

### Page Sections

Located in `src/sections/`, these are specialized layout components:

- **Header/** - Top navigation bar with search and user menu
- **SideBar/** - Left navigation with links and community list  
- **PostSection/** - Main post feed display
- **PostBar/** - Filter and sort controls above posts
- **CreatePost/** - Post editor with community selector
- **PopularCommunities/** - Featured communities carousel
- **Main/** - Central content area
- **Body/** - Page body container
- **UserProfile/** - User profile section
- **UserBar/** - User action bar
- **Content/** - Generic content wrapper

---