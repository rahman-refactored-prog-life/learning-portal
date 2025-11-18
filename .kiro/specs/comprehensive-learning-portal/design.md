# Comprehensive Learning Portal Design

## Overview

The Comprehensive Learning Portal is a full-stack web application designed to provide world-class FAANG interview preparation. The system implements a microservices-inspired architecture with Spring Boot backend, PostgreSQL database, React frontend, and comprehensive automation for question acquisition, code execution, visualization, and session continuity.

**Key Design Principles:**
- **Scalability**: Horizontal scaling support for 1000+ concurrent users
- **Maintainability**: Clean architecture with clear separation of concerns
- **Performance**: Sub-2-second page loads, sub-200ms API responses
- **Security**: Enterprise-grade security with JWT authentication and sandboxed code execution
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **AWS-Inspired UI**: Professional, cognitive-friendly design based on AWS principles

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ React SPA    │  │ Monaco Editor│  │ D3.js Viz    │          │
│  │ (TypeScript) │  │ Integration  │  │ Engine       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Spring Boot REST Controllers + OpenAPI/Swagger           │  │
│  │ Authentication Filter (JWT) + Rate Limiting              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ Learning │ │ Question │ │ Code     │ │ Progress │          │
│  │ Service  │ │ Service  │ │ Execution│ │ Service  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ User     │ │ Scraping │ │ Session  │ │ Analytics│          │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Data Access Layer                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Spring Data JPA Repositories + Hibernate                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│  │PostgreSQL│ │  Redis   │ │  File    │                        │
│  │ Database │ │  Cache   │ │  Storage │                        │
│  └──────────┘ └──────────┘ └──────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Components                           │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Navigation Components                                    │   │
│  │  - GlobalHeader  - Sidebar  - Breadcrumbs  - Navatar   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Learning Components                                      │   │
│  │  - TopicPage  - CodeEditor  - Visualization  - Notes   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Question Components                                      │   │
│  │  - QuestionList  - QuestionDetail  - SolutionViewer    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Progress Components                                      │   │
│  │  - Dashboard  - Analytics  - ProgressTracker           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## UI Components Library

### Core Reusable Components

The application uses a comprehensive library of reusable UI components following AWS design principles for consistency, accessibility, and maintainability.

#### 1. **Foundational Components** (Phase 1)

**Button**
- Variants: primary, secondary, tertiary, danger
- Sizes: small, medium, large
- States: default, hover, active, disabled, loading

**Input**
- Types: text, email, password, number, search
- States: default, focus, error, disabled
- Features: label, helper text, error message, icons

**Card**
- Variants: default, elevated, outlined
- Features: header, body, footer sections
- Use cases: content containers, question cards, topic cards

**Loading**
- Types: spinner, skeleton, progress bar
- Sizes: small, medium, large
- Use cases: page loading, component loading, inline loading

**ErrorMessage**
- Types: inline, banner, toast
- Severity: error, warning, info, success
- Features: dismissible, auto-dismiss, action buttons

#### 2. **Navigation Components** (Phase 1)

**GlobalHeader**
- Features: logo, search, user menu (navatar), notifications
- Responsive: hamburger menu on mobile
- Sticky positioning

**Sidebar**
- Features: collapsible sections, progress indicators, active state
- Responsive: drawer on mobile, collapsible on desktop
- Sections: Java, Data Structures, Algorithms, System Design, Databases

**Breadcrumbs** (Phase 2)
- Features: hierarchical navigation, current page indicator
- Max depth: 4 levels
- Responsive: collapse on mobile

#### 3. **Data Display Components** (Phase 2+)

**Badge**
- Use cases: difficulty levels (Easy, Medium, Hard), status indicators, counts
- Variants: filled, outlined, dot
- Colors: success (Easy), warning (Medium), danger (Hard), info, neutral

**ProgressBar**
- Types: linear, circular
- Features: percentage display, label, color coding
- Use cases: topic completion, overall progress, loading states

**Tooltip**
- Positions: top, bottom, left, right, auto
- Triggers: hover, focus, click
- Use cases: hints, explanations, additional info
- Max width: 300px

**Tabs**
- Variants: line, enclosed, pills
- Features: active state, disabled state, icons
- Use cases: language switching (Java/Python/C++/C/Node.js), content sections

**Accordion**
- Features: single/multiple expand, default expanded, icons
- Use cases: FAQ, collapsible content sections, topic details

**CodeBlock**
- Features: syntax highlighting (Prism.js), line numbers, copy button
- Languages: Java, JavaScript, Python, C, C++, SQL
- Themes: light, dark
- Use cases: code examples, solutions display

#### 4. **Interactive Components** (Phase 2+)

**Modal/Dialog**
- Sizes: small (400px), medium (600px), large (800px), fullscreen
- Features: header, body, footer, close button, backdrop
- Types: confirmation, form, content display
- Use cases: code execution results, delete confirmation, detailed explanations

**Toast Notifications**
- Positions: top-right, top-center, bottom-right, bottom-center
- Types: success, error, warning, info
- Features: auto-dismiss (3-5s), manual dismiss, action button
- Queue: max 3 visible at once
- Use cases: save success, error messages, system notifications

**Search Component** (Phase 5)
- Features: autocomplete, recent searches, filters, keyboard navigation
- Debounce: 300ms
- Results: instant preview, highlight matches
- Use cases: topic search, question search, global search

#### 5. **List & Table Components** (Phase 5+)

**QuestionCard**
- Features: title, difficulty badge, company tags, completion status, bookmark
- Actions: view, solve, bookmark
- Responsive: stack on mobile

**TopicCard**
- Features: icon, title, progress bar, completion count, locked state
- States: locked, in-progress, completed
- Actions: navigate to topic

**Filter/Sort Controls**
- Filters: difficulty, company, topic, status, language
- Sort: newest, oldest, difficulty, popularity, completion rate
- Features: multi-select, clear all, save filters
- Responsive: drawer on mobile

**Pagination**
- Types: numbered, load more, infinite scroll
- Features: page size selector (10, 25, 50, 100), jump to page
- Info: showing X-Y of Z items
- Use cases: question lists, search results

#### 6. **Specialized Components** (Phase 3-4)

**Visualization Controls**
- Features: play/pause, step forward/back, speed control, reset
- Use cases: data structure visualizations, algorithm animations

**Comparison View**
- Features: side-by-side display, synchronized scrolling
- Use cases: solution comparison, approach comparison (brute force vs optimal)

**Code Editor** (Monaco)
- Features: syntax highlighting, autocomplete, error detection, themes
- Languages: Java, JavaScript, Python, C, C++
- Actions: execute, reset, save, share

### Component Design Principles

**Consistency**
- All components follow AWS design system patterns
- Consistent spacing (8px grid system)
- Consistent colors (CSS variables)
- Consistent typography

**Accessibility**
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly (ARIA labels)
- Focus indicators
- Color contrast ratios (4.5:1 minimum)

**Responsiveness**
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly (min 44x44px tap targets)
- Adaptive layouts

**Performance**
- Lazy loading for heavy components
- Code splitting
- Memoization for expensive renders
- Virtual scrolling for long lists

### Component Implementation Strategy

**Phase 1** (Foundation):
- Button, Input, Card, Loading, ErrorMessage ✅
- GlobalHeader, Sidebar, Layout ✅

**Phase 2** (Java Content):
- Badge, ProgressBar, Tooltip, Tabs, Accordion
- CodeBlock, Breadcrumbs, Toast Notifications
- TopicCard, QuestionCard (basic)

**Phase 3-4** (Data Structures & Algorithms):
- Visualization Controls
- Enhanced CodeBlock with execution
- Comparison View

**Phase 5** (Question Hub):
- Search Component
- Filter/Sort Controls
- Pagination
- Enhanced QuestionCard with all features

**Phase 6-9** (Advanced Features):
- Advanced Modal variants
- Complex data tables
- Advanced analytics components


## Components and Interfaces

### 1. Learning Service

**Purpose**: Manages all learning content including Java, Data Structures, Algorithms, Databases, System Design, Spring Boot, Hibernate, React, and Node.js.

**Key Interfaces**:
```java
public interface LearningService {
    List<LearningModule> getAllModules();
    LearningModule getModuleById(Long id);
    List<Topic> getTopicsByModule(Long moduleId);
    Topic getTopicById(Long topicId);
    List<PracticeQuestion> getPracticeQuestionsByTopic(Long topicId);
    void trackTopicCompletion(Long userId, Long topicId);
}

@Entity
public class LearningModule {
    @Id @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private ModuleType type; // JAVA, DATA_STRUCTURES, ALGORITHMS, etc.
    private int orderIndex;
    
    @OneToMany(mappedBy = "module")
    private List<Topic> topics;
}

@Entity
public class Topic {
    @Id @GeneratedValue
    private Long id;
    private String title;
    @Lob
    private String content; // Markdown content
    private String difficulty; // BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    
    @ManyToOne
    private LearningModule module;
    
    @OneToMany(mappedBy = "topic")
    private List<PracticeQuestion> practiceQuestions;
    
    @OneToMany(mappedBy = "topic")
    private List<CodeExample> codeExamples;
}
```

### 2. Question Service

**Purpose**: Manages the centralized question hub with 10,000+ interview questions from multiple sources.

**Key Interfaces**:
```java
public interface QuestionService {
    Page<InterviewQuestion> searchQuestions(QuestionSearchCriteria criteria);
    InterviewQuestion getQuestionById(Long id);
    List<Solution> getSolutionsByQuestion(Long questionId);
    void addQuestion(InterviewQuestion question);
    void updateQuestionMetadata(Long questionId, QuestionMetadata metadata);
}

@Entity
public class InterviewQuestion {
    @Id @GeneratedValue
    private Long id;
    private String title;
    @Lob
    private String description;
    private Difficulty difficulty;
    
    @ElementCollection
    private Set<String> companies; // Amazon, Google, Meta, Microsoft, Apple
    
    @ElementCollection
    private Set<String> topics; // Arrays, Dynamic Programming, etc.
    
    @ElementCollection
    private Set<String> patterns; // Sliding Window, Two Pointers, etc.
    
    @OneToMany(mappedBy = "question")
    private List<Solution> solutions;
    
    private String sourceUrl;
    private String sourceAttribution;
    private LocalDateTime acquiredDate;
}

@Entity
public class Solution {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private InterviewQuestion question;
    
    private ProgrammingLanguage language; // JAVA, JAVASCRIPT, PYTHON, C, CPP
    
    @Lob
    private String code;
    
    @Lob
    private String explanation;
    
    private String timeComplexity;
    private String spaceComplexity;
    private SolutionApproach approach; // BRUTE_FORCE, OPTIMIZED, OPTIMAL
}
```

### 3. Code Execution Engine

**Purpose**: Provides sandboxed code execution in 5 programming languages with security and resource limits.

**Key Interfaces**:
```java
public interface CodeExecutionEngine {
    ExecutionResult executeCode(CodeExecutionRequest request);
    boolean validateSyntax(String code, ProgrammingLanguage language);
    List<ProgrammingLanguage> getSupportedLanguages();
}

public class CodeExecutionRequest {
    private String code;
    private ProgrammingLanguage language;
    private String stdin;
    private int timeoutSeconds = 5;
    private int memoryLimitMB = 256;
}

public class ExecutionResult {
    private boolean success;
    private String stdout;
    private String stderr;
    private String compilationError;
    private long executionTimeMs;
    private long memoryUsedMB;
    private ExecutionStatus status; // SUCCESS, TIMEOUT, MEMORY_LIMIT, RUNTIME_ERROR
}
```

**Implementation Strategy**:
- **Docker Containers**: Each execution runs in isolated Docker container
- **Resource Limits**: CPU time limits, memory limits, network disabled
- **Security**: No file system access, no network access, restricted system calls
- **Language Support**: 
  - Java: OpenJDK 21
  - Node.js: Node 20 LTS
  - Python: Python 3.11
  - C: GCC 13
  - C++: G++ 13

### 4. Question Acquisition Engine

**Purpose**: Automated system for sourcing interview questions from 10+ platforms.

**Key Interfaces**:
```java
public interface QuestionAcquisitionEngine {
    void scrapeSource(QuestionSource source);
    List<RawQuestion> getRawQuestions();
    InterviewQuestion processRawQuestion(RawQuestion raw);
    void deduplicateQuestions();
    void extractCompanyTags(InterviewQuestion question);
    void classifyDifficulty(InterviewQuestion question);
}

public enum QuestionSource {
    LEETCODE,
    GEEKSFORGEEKS,
    HACKERRANK,
    GLASSDOOR,
    BLIND,
    REDDIT,
    GITHUB,
    COMPANY_BLOGS,
    STACKOVERFLOW,
    YOUTUBE
}

@Entity
public class RawQuestion {
    @Id @GeneratedValue
    private Long id;
    private QuestionSource source;
    private String sourceUrl;
    @Lob
    private String rawContent;
    private LocalDateTime scrapedDate;
    private boolean processed;
}
```

**Scraping Architecture**:
```
┌─────────────────────────────────────────────────────────────┐
│              Question Acquisition Pipeline                   │
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│  │ Scrapers │───▶│ Raw Data │───▶│ Cleaning │             │
│  │ (10+)    │    │ Storage  │    │ Pipeline │             │
│  └──────────┘    └──────────┘    └──────────┘             │
│                                        │                     │
│                                        ▼                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│  │Production│◀───│ Quality  │◀───│Dedup +   │             │
│  │ Database │    │ Review   │    │Tagging   │             │
│  └──────────┘    └──────────┘    └──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

**Scraping Technologies**:
- **Jsoup**: HTML parsing for static content
- **Selenium**: JavaScript-rendered content
- **Spring @Scheduled**: Periodic scraping jobs
- **Rate Limiting**: Respect source servers (1 request per 2 seconds)
- **User-Agent**: Identify as legitimate bot with contact info
- **robots.txt**: Respect all robots.txt directives

### 5. Visualization Engine

**Purpose**: Interactive visualizations for data structures and algorithms.

**Key Interfaces**:
```typescript
interface VisualizationEngine {
  renderDataStructure(type: DataStructureType, data: any): void;
  animateAlgorithm(algorithm: AlgorithmType, input: any): void;
  stepForward(): void;
  stepBackward(): void;
  play(): void;
  pause(): void;
  reset(): void;
  setSpeed(speed: number): void;
}

interface VisualizationState {
  currentStep: number;
  totalSteps: number;
  data: any;
  highlights: number[];
  annotations: string[];
}
```

**Visualization Technologies**:
- **D3.js**: Primary visualization library
- **React Flow**: Graph and tree visualizations
- **Canvas API**: Performance-critical animations
- **Framer Motion**: Smooth React animations
- **Three.js**: 3D visualizations (Phase 9)

### 6. Progress Tracking System

**Purpose**: Comprehensive analytics tracking user learning progress and mastery.

**Key Interfaces**:
```java
public interface ProgressTrackingService {
    UserProgress getUserProgress(Long userId);
    void trackTopicCompletion(Long userId, Long topicId);
    void trackQuestionAttempt(Long userId, Long questionId, boolean solved);
    MasteryLevel assessMastery(Long userId, String topic);
    InterviewReadiness calculateReadiness(Long userId, String company);
    List<String> identifyWeaknesses(Long userId);
    List<Topic> recommendNextTopics(Long userId);
}

@Entity
public class UserProgress {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private User user;
    
    @OneToMany(mappedBy = "userProgress")
    private List<TopicProgress> topicProgress;
    
    @OneToMany(mappedBy = "userProgress")
    private List<QuestionAttempt> questionAttempts;
    
    private int totalTopicsCompleted;
    private int totalQuestionsAttempted;
    private int totalQuestionsSolved;
    private double overallMasteryScore;
}

@Entity
public class TopicProgress {
    @Id @GeneratedValue
    private Long id;
    
    @ManyToOne
    private UserProgress userProgress;
    
    @ManyToOne
    private Topic topic;
    
    private boolean completed;
    private LocalDateTime completedDate;
    private int timeSpentMinutes;
    private MasteryLevel masteryLevel;
}
```

### 7. Session Continuity Manager

**Purpose**: Bulletproof session continuity with conversation logging and context recovery.

**Key Interfaces**:
```java
public interface SessionContinuityManager {
    void startSession(String sessionId);
    void endSession(String sessionId);
    void logConversation(String sessionId, String conversation);
    void saveSessionState(SessionState state);
    SessionState loadSessionState(String sessionId);
    void createCheckpoint(String sessionId);
    ContextSummary generateContextSummary(String sessionId);
}

public class SessionState {
    private String sessionId;
    private LocalDateTime timestamp;
    private String currentPhase;
    private List<String> completedTasks;
    private List<String> activeFiles;
    private Map<String, Object> contextData;
    private List<String> nextActions;
}

public class ContextSummary {
    private String sessionId;
    private String lastPhase;
    private String lastTask;
    private List<String> recentChanges;
    private String gitCommitHash;
    private String resumeInstructions;
}
```

**Session Continuity Architecture**:
```
.kiro/
├── session-logs/
│   ├── session-2024-01-15-10-30.md
│   ├── session-2024-01-16-14-20.md
│   └── current-session.md
├── session-state/
│   ├── current-phase.json
│   ├── completed-tasks.json
│   ├── active-files.json
│   └── context-summary.md
├── hooks/
│   ├── session-start.sh
│   ├── session-end.sh
│   ├── session-checkpoint.sh
│   ├── session-resume.sh
│   ├── task-complete.sh
│   └── git-sync.sh
└── steering/
    ├── project-standards.md
    ├── session-continuity.md
    ├── phase-guidelines.md
    └── testing-standards.md
```

## Data Models

### Complete Database Schema

```sql
-- Users and Authentication
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Learning Content
CREATE TABLE learning_modules (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    module_type VARCHAR(50) NOT NULL,
    order_index INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topics (
    id BIGSERIAL PRIMARY KEY,
    module_id BIGINT REFERENCES learning_modules(id),
    title VARCHAR(200) NOT NULL,
    content TEXT,
    difficulty VARCHAR(20),
    order_index INT NOT NULL,
    estimated_time_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE practice_questions (
    id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT REFERENCES topics(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20),
    order_index INT NOT NULL
);

CREATE TABLE code_examples (
    id BIGSERIAL PRIMARY KEY,
    topic_id BIGINT REFERENCES topics(id),
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    explanation TEXT,
    order_index INT NOT NULL
);

-- Interview Questions
CREATE TABLE interview_questions (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    source_url VARCHAR(500),
    source_attribution VARCHAR(100),
    acquired_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE question_companies (
    question_id BIGINT REFERENCES interview_questions(id),
    company VARCHAR(50) NOT NULL,
    PRIMARY KEY (question_id, company)
);

CREATE TABLE question_topics (
    question_id BIGINT REFERENCES interview_questions(id),
    topic VARCHAR(100) NOT NULL,
    PRIMARY KEY (question_id, topic)
);

CREATE TABLE question_patterns (
    question_id BIGINT REFERENCES interview_questions(id),
    pattern VARCHAR(100) NOT NULL,
    PRIMARY KEY (question_id, pattern)
);

CREATE TABLE solutions (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT REFERENCES interview_questions(id),
    language VARCHAR(20) NOT NULL,
    code TEXT NOT NULL,
    explanation TEXT,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    approach VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progress Tracking
CREATE TABLE user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    total_topics_completed INT DEFAULT 0,
    total_questions_attempted INT DEFAULT 0,
    total_questions_solved INT DEFAULT 0,
    overall_mastery_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE topic_progress (
    id BIGSERIAL PRIMARY KEY,
    user_progress_id BIGINT REFERENCES user_progress(id),
    topic_id BIGINT REFERENCES topics(id),
    completed BOOLEAN DEFAULT FALSE,
    completed_date TIMESTAMP,
    time_spent_minutes INT DEFAULT 0,
    mastery_level VARCHAR(20),
    UNIQUE(user_progress_id, topic_id)
);

CREATE TABLE question_attempts (
    id BIGSERIAL PRIMARY KEY,
    user_progress_id BIGINT REFERENCES user_progress(id),
    question_id BIGINT REFERENCES interview_questions(id),
    attempted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    solved BOOLEAN DEFAULT FALSE,
    time_spent_minutes INT,
    language VARCHAR(20),
    code_submitted TEXT
);

-- Notes
CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    topic_id BIGINT REFERENCES topics(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session Continuity
CREATE TABLE session_logs (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(100) UNIQUE NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    conversation_log TEXT,
    phase VARCHAR(50),
    tasks_completed TEXT[],
    files_modified TEXT[],
    git_commit_hash VARCHAR(40)
);

-- Indexes for Performance
CREATE INDEX idx_topics_module ON topics(module_id);
CREATE INDEX idx_practice_questions_topic ON practice_questions(topic_id);
CREATE INDEX idx_interview_questions_difficulty ON interview_questions(difficulty);
CREATE INDEX idx_solutions_question ON solutions(question_id);
CREATE INDEX idx_topic_progress_user ON topic_progress(user_progress_id);
CREATE INDEX idx_question_attempts_user ON question_attempts(user_progress_id);
```

### ER Diagram

```
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│   Users     │       │  Learning        │       │   Topics    │
│             │       │  Modules         │       │             │
│ - id        │       │                  │       │ - id        │
│ - username  │       │ - id             │       │ - title     │
│ - email     │       │ - name           │       │ - content   │
│ - password  │       │ - type           │       │ - difficulty│
└─────────────┘       └──────────────────┘       └─────────────┘
       │                       │                         │
       │                       │ 1:N                     │
       │                       └─────────────────────────┘
       │
       │ 1:1
       ▼
┌─────────────┐       ┌──────────────────┐       ┌─────────────┐
│User Progress│       │  Topic Progress  │       │  Question   │
│             │       │                  │       │  Attempts   │
│ - id        │◀──────│ - id             │       │             │
│ - user_id   │  1:N  │ - topic_id       │       │ - id        │
│ - total_*   │       │ - completed      │       │ - solved    │
└─────────────┘       └──────────────────┘       └─────────────┘
       │                                                 │
       │ 1:N                                            │
       └─────────────────────────────────────────────────┘

┌──────────────────┐       ┌─────────────┐       ┌─────────────┐
│   Interview      │       │  Solutions  │       │  Question   │
│   Questions      │       │             │       │  Companies  │
│                  │       │ - id        │       │             │
│ - id             │◀──────│ - code      │       │ - question  │
│ - title          │  1:N  │ - language  │       │ - company   │
│ - description    │       │ - approach  │       └─────────────┘
│ - difficulty     │       └─────────────┘              │
└──────────────────┘                                    │ N:M
       │                                                │
       └────────────────────────────────────────────────┘
```


## AWS-Inspired UI Design System

### Design Principles

**1. Cognitive Load Reduction**
- Clean, spacious layouts with ample whitespace
- Clear visual hierarchy with consistent typography
- Progressive disclosure of complexity
- Focused attention on primary actions

**2. Professional Aesthetics**
- AWS-inspired color palette
- Modern, clean typography
- Subtle shadows and depth
- Smooth transitions and animations

**3. Accessibility First**
- WCAG 2.1 AA compliance
- High contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Screen reader compatibility

### Color Palette

```css
/* Primary Colors (AWS-Inspired) */
--aws-orange: #FF9900;
--aws-dark-blue: #232F3E;
--aws-light-blue: #527FFF;

/* Neutral Colors */
--white: #FFFFFF;
--gray-50: #FAFAFA;
--gray-100: #F5F5F5;
--gray-200: #EEEEEE;
--gray-300: #E0E0E0;
--gray-400: #BDBDBD;
--gray-500: #9E9E9E;
--gray-600: #757575;
--gray-700: #616161;
--gray-800: #424242;
--gray-900: #212121;
--black: #000000;

/* Semantic Colors */
--success: #4CAF50;
--warning: #FF9800;
--error: #F44336;
--info: #2196F3;

/* Code Editor Colors */
--code-bg: #1E1E1E;
--code-text: #D4D4D4;
--code-keyword: #569CD6;
--code-string: #CE9178;
--code-comment: #6A9955;
```

### Typography Scale

```css
/* Font Families */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-code: 'Fira Code', 'Consolas', 'Monaco', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

### Spacing System

```css
/* Spacing Scale (8px base) */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### Component Library

#### 1. Global Header

```typescript
interface GlobalHeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

// Features:
// - AWS logo/branding
// - Global search
// - User avatar (navatar)
// - Notifications
// - Mobile hamburger menu
```

#### 2. Sidebar Navigation

```typescript
interface SidebarProps {
  modules: LearningModule[];
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
}

// Features:
// - Collapsible sections
// - Progress indicators
// - Active state highlighting
// - Sticky positioning
```

#### 3. Topic Page Layout

```typescript
interface TopicPageProps {
  topic: Topic;
  practiceQuestions: PracticeQuestion[];
  codeExamples: CodeExample[];
}

// Layout:
// ┌─────────────────────────────────────────────┐
// │ Breadcrumbs                                 │
// ├─────────────────────────────────────────────┤
// │ Topic Title                                 │
// │ Difficulty Badge | Est. Time | Progress    │
// ├─────────────────────────────────────────────┤
// │                                             │
// │ Content (Markdown)                          │
// │                                             │
// │ ┌─────────────────────────────────────┐   │
// │ │ Code Example (Monaco Editor)        │   │
// │ │                                      │   │
// │ └─────────────────────────────────────┘   │
// │                                             │
// │ ┌─────────────────────────────────────┐   │
// │ │ Visualization                        │   │
// │ │                                      │   │
// │ └─────────────────────────────────────┘   │
// │                                             │
// │ Practice Questions (Embedded)               │
// │                                             │
// ├─────────────────────────────────────────────┤
// │ Notes Section                               │
// └─────────────────────────────────────────────┘
```

#### 4. Monaco Code Editor Component

```typescript
interface CodeEditorProps {
  language: ProgrammingLanguage;
  initialCode: string;
  onExecute: (code: string) => Promise<ExecutionResult>;
  readOnly?: boolean;
}

// Features:
// - Syntax highlighting
// - IntelliSense
// - Error highlighting
// - Execute button
// - Language selector
// - Output panel
// - Execution metrics
```

#### 5. Question Card

```typescript
interface QuestionCardProps {
  question: InterviewQuestion;
  onSelect: (questionId: string) => void;
}

// Features:
// - Title and difficulty badge
// - Company tags
// - Topic tags
// - Solved indicator
// - Attempt count
// - Hover effects
```

#### 6. Progress Dashboard

```typescript
interface ProgressDashboardProps {
  userProgress: UserProgress;
  topicProgress: TopicProgress[];
  questionAttempts: QuestionAttempt[];
}

// Features:
// - Overall progress chart
// - Topics completed
// - Questions solved
// - Mastery levels
// - Weak areas
// - Recommendations
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

### Layout Patterns

#### 1. Three-Column Layout (Desktop)

```
┌────────────────────────────────────────────────────────────┐
│ Global Header                                              │
├──────────┬────────────────────────────────┬────────────────┤
│          │                                │                │
│ Sidebar  │ Main Content                   │ Floating Nav   │
│ Nav      │                                │ (Topic TOC)    │
│ (240px)  │                                │ (200px)        │
│          │                                │                │
│          │                                │                │
│          │                                │                │
└──────────┴────────────────────────────────┴────────────────┘
```

#### 2. Two-Column Layout (Tablet)

```
┌────────────────────────────────────────────────────────────┐
│ Global Header                                              │
├──────────┬─────────────────────────────────────────────────┤
│          │                                                 │
│ Sidebar  │ Main Content                                    │
│ Nav      │ (Floating Nav hidden, accessible via button)   │
│ (200px)  │                                                 │
│          │                                                 │
└──────────┴─────────────────────────────────────────────────┘
```

#### 3. Single-Column Layout (Mobile)

```
┌────────────────────────────────────────────────────────────┐
│ Global Header (Hamburger Menu)                            │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ Main Content                                               │
│ (Full width, sidebar accessible via hamburger)            │
│                                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Error Handling Strategy

### Error Categories

**1. Client-Side Errors**
- Validation errors (form inputs)
- Network errors (API failures)
- Authentication errors (expired tokens)
- Browser compatibility errors

**2. Server-Side Errors**
- Business logic errors (invalid operations)
- Database errors (constraint violations)
- External service errors (scraping failures)
- Resource exhaustion errors (rate limits)

**3. Code Execution Errors**
- Compilation errors
- Runtime errors
- Timeout errors
- Memory limit errors

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input provided",
    "details": {
      "field": "email",
      "reason": "Email format is invalid"
    },
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req-123456"
  }
}
```

### Error Handling Implementation

```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationException ex) {
        return ResponseEntity
            .badRequest()
            .body(ErrorResponse.builder()
                .code("VALIDATION_ERROR")
                .message(ex.getMessage())
                .details(ex.getDetails())
                .build());
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.builder()
                .code("RESOURCE_NOT_FOUND")
                .message(ex.getMessage())
                .build());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        log.error("Unexpected error", ex);
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ErrorResponse.builder()
                .code("INTERNAL_ERROR")
                .message("An unexpected error occurred")
                .build());
    }
}
```

## Testing Strategy

### Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │  (10%)
                    │   Cypress   │
                    └─────────────┘
                  ┌─────────────────┐
                  │Integration Tests│  (30%)
                  │  Spring Boot    │
                  └─────────────────┘
              ┌───────────────────────┐
              │     Unit Tests        │  (60%)
              │  JUnit + Mockito      │
              └───────────────────────┘
```

### Unit Testing

```java
@ExtendWith(MockitoExtension.class)
class LearningServiceTest {
    
    @Mock
    private LearningModuleRepository moduleRepository;
    
    @Mock
    private TopicRepository topicRepository;
    
    @InjectMocks
    private LearningServiceImpl learningService;
    
    @Test
    void shouldGetAllModules() {
        // Given
        List<LearningModule> modules = Arrays.asList(
            createModule("Java", ModuleType.JAVA),
            createModule("Data Structures", ModuleType.DATA_STRUCTURES)
        );
        when(moduleRepository.findAll()).thenReturn(modules);
        
        // When
        List<LearningModule> result = learningService.getAllModules();
        
        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Java");
    }
}
```

### Integration Testing

```java
@SpringBootTest
@AutoConfigureMockMvc
class LearningControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private LearningModuleRepository moduleRepository;
    
    @Test
    void shouldGetModuleById() throws Exception {
        // Given
        LearningModule module = moduleRepository.save(
            createModule("Java", ModuleType.JAVA)
        );
        
        // When & Then
        mockMvc.perform(get("/api/modules/" + module.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Java"))
            .andExpect(jsonPath("$.type").value("JAVA"));
    }
}
```

### E2E Testing

```typescript
describe('Learning Flow', () => {
  it('should complete a topic and track progress', () => {
    cy.login('testuser', 'password');
    cy.visit('/modules/java');
    cy.contains('Variables and Data Types').click();
    cy.get('[data-testid="topic-content"]').should('be.visible');
    cy.get('[data-testid="mark-complete"]').click();
    cy.get('[data-testid="progress-indicator"]').should('contain', '1/100');
  });
});
```

## Performance Optimization

### Backend Optimization

**1. Database Query Optimization**
```java
// Use JOIN FETCH to avoid N+1 queries
@Query("SELECT m FROM LearningModule m JOIN FETCH m.topics WHERE m.id = :id")
LearningModule findByIdWithTopics(@Param("id") Long id);

// Use pagination for large result sets
Page<InterviewQuestion> findAll(Pageable pageable);

// Use database indexes
@Table(indexes = {
    @Index(name = "idx_topic_module", columnList = "module_id"),
    @Index(name = "idx_question_difficulty", columnList = "difficulty")
})
```

**2. Caching Strategy**
```java
@Cacheable(value = "modules", key = "#id")
public LearningModule getModuleById(Long id) {
    return moduleRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Module not found"));
}

@CacheEvict(value = "modules", key = "#module.id")
public LearningModule updateModule(LearningModule module) {
    return moduleRepository.save(module);
}
```

**3. Connection Pooling**
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
```

### Frontend Optimization

**1. Code Splitting**
```typescript
// Lazy load routes
const JavaModule = lazy(() => import('./modules/JavaModule'));
const DataStructures = lazy(() => import('./modules/DataStructures'));

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/java" element={<JavaModule />} />
    <Route path="/data-structures" element={<DataStructures />} />
  </Routes>
</Suspense>
```

**2. Image Optimization**
```typescript
// Use lazy loading for images
<img 
  src={imageUrl} 
  loading="lazy" 
  alt="Description"
/>

// Use WebP format with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

**3. React Performance**
```typescript
// Memoize expensive computations
const sortedQuestions = useMemo(() => {
  return questions.sort((a, b) => a.difficulty - b.difficulty);
}, [questions]);

// Memoize callbacks
const handleQuestionSelect = useCallback((id: string) => {
  setSelectedQuestion(id);
}, []);

// Memoize components
const QuestionCard = memo(({ question }: QuestionCardProps) => {
  return <div>{question.title}</div>;
});
```

## Security Considerations

### Authentication & Authorization

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### Input Validation

```java
@RestController
@Validated
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(
        @Valid @RequestBody CreateUserRequest request
    ) {
        // Request is automatically validated
        return ResponseEntity.ok(userService.createUser(request));
    }
}

public class CreateUserRequest {
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50)
    private String username;
    
    @Email(message = "Invalid email format")
    private String email;
    
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$",
             message = "Password must be at least 8 characters with uppercase, lowercase, and digit")
    private String password;
}
```

### Code Execution Sandbox

```java
public class SecureCodeExecutor {
    
    public ExecutionResult execute(CodeExecutionRequest request) {
        // Create isolated Docker container
        DockerClient docker = DockerClientBuilder.getInstance().build();
        
        CreateContainerResponse container = docker.createContainerCmd(getImage(request.getLanguage()))
            .withNetworkDisabled(true)  // No network access
            .withReadonlyRootfs(true)   // Read-only filesystem
            .withMemory(256 * 1024 * 1024L)  // 256MB memory limit
            .withCpuQuota(50000L)       // 50% CPU limit
            .exec();
        
        try {
            // Execute code in container
            docker.startContainerCmd(container.getId()).exec();
            
            // Wait with timeout
            WaitContainerResultCallback callback = new WaitContainerResultCallback();
            docker.waitContainerCmd(container.getId())
                .exec(callback)
                .awaitCompletion(5, TimeUnit.SECONDS);
            
            // Get output
            String output = getContainerOutput(docker, container.getId());
            
            return ExecutionResult.success(output);
            
        } finally {
            // Always cleanup container
            docker.removeContainerCmd(container.getId()).withForce(true).exec();
        }
    }
}
```

## Deployment Architecture

### Production Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                      Load Balancer (AWS ALB)                │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│  Spring Boot Instance 1   │   │  Spring Boot Instance 2   │
│  (Docker Container)       │   │  (Docker Container)       │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Amazon RDS PostgreSQL (Multi-AZ)               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Amazon ElastiCache Redis (Cluster)             │
└─────────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '21'
      - name: Run tests
        run: mvn test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t learning-portal:${{ github.sha }} .
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker push learning-portal:${{ github.sha }}
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster learning-portal --service backend --force-new-deployment
```

## Success Metrics

### Technical Metrics
- **Page Load Time**: < 2 seconds (95th percentile)
- **API Response Time**: < 200ms (95th percentile)
- **Code Execution Time**: < 5 seconds
- **Uptime**: 99.9%
- **Error Rate**: < 0.1%
- **Database Query Time**: < 100ms (95th percentile)

### User Engagement Metrics
- **Daily Active Users**: Track growth
- **Topics Completed**: Average per user
- **Questions Attempted**: Average per user
- **Session Duration**: Average time spent
- **Return Rate**: 7-day and 30-day return rates

### Content Metrics
- **Total Questions**: 10,000+ target
- **Question Sources**: 10+ platforms
- **Solution Coverage**: 100% (all 5 languages)
- **Topic Coverage**: 100% (all planned topics)

This comprehensive design document provides the complete technical blueprint for implementing the world's most comprehensive FAANG preparation platform across all 9 phases.
