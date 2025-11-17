# Testing Standards

## Overview

This document defines comprehensive testing standards for the Comprehensive Learning Portal. All code must meet these standards before being considered complete.

## Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │  10% (Critical paths)
                    │   Cypress   │
                    └─────────────┘
                  ┌─────────────────┐
                  │Integration Tests│  30% (API + DB)
                  │  Spring Boot    │
                  └─────────────────┘
              ┌───────────────────────┐
              │     Unit Tests        │  60% (Business logic)
              │  JUnit + Mockito      │
              └───────────────────────┘
```

## Coverage Requirements

- **Overall Code Coverage**: Minimum 80%
- **Critical Components**: Minimum 90%
- **New Code**: Minimum 85%
- **Branch Coverage**: Minimum 75%

## Unit Testing

### Purpose
Test individual components in isolation

### Framework
- **Backend**: JUnit 5 + Mockito + AssertJ
- **Frontend**: Jest + React Testing Library

### Standards

**Naming Convention**:
```java
// Pattern: test<MethodName>_<Scenario>_<ExpectedResult>
@Test
void testGetUserById_UserExists_ReturnsUser() { }

@Test
void testGetUserById_UserNotFound_ThrowsException() { }
```

**Structure**: Use Given-When-Then or Arrange-Act-Assert
```java
@Test
void testCreateQuestion_ValidInput_ReturnsCreatedQuestion() {
    // Given (Arrange)
    CreateQuestionRequest request = new CreateQuestionRequest(
        "What is polymorphism?",
        Difficulty.MEDIUM
    );
    Question expectedQuestion = new Question(1L, request.getTitle());
    when(questionRepository.save(any())).thenReturn(expectedQuestion);
    
    // When (Act)
    Question actualQuestion = questionService.createQuestion(request);
    
    // Then (Assert)
    assertThat(actualQuestion).isNotNull();
    assertThat(actualQuestion.getTitle()).isEqualTo(request.getTitle());
    verify(questionRepository).save(any(Question.class));
}
```

**What to Test**:
- ✅ Business logic
- ✅ Edge cases
- ✅ Error conditions
- ✅ Boundary values
- ✅ Null handling

**What NOT to Test**:
- ❌ Getters/setters (unless they have logic)
- ❌ Constructors (unless they have logic)
- ❌ Framework code
- ❌ Third-party libraries

### Backend Unit Test Example

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
    void testGetModuleById_ModuleExists_ReturnsModule() {
        // Given
        Long moduleId = 1L;
        LearningModule expectedModule = LearningModule.builder()
            .id(moduleId)
            .name("Java Fundamentals")
            .type(ModuleType.JAVA)
            .build();
        when(moduleRepository.findById(moduleId))
            .thenReturn(Optional.of(expectedModule));
        
        // When
        LearningModule actualModule = learningService.getModuleById(moduleId);
        
        // Then
        assertThat(actualModule).isNotNull();
        assertThat(actualModule.getId()).isEqualTo(moduleId);
        assertThat(actualModule.getName()).isEqualTo("Java Fundamentals");
        verify(moduleRepository).findById(moduleId);
    }
    
    @Test
    void testGetModuleById_ModuleNotFound_ThrowsException() {
        // Given
        Long moduleId = 999L;
        when(moduleRepository.findById(moduleId))
            .thenReturn(Optional.empty());
        
        // When & Then
        assertThatThrownBy(() -> learningService.getModuleById(moduleId))
            .isInstanceOf(ResourceNotFoundException.class)
            .hasMessageContaining("Module not found");
        verify(moduleRepository).findById(moduleId);
    }
}
```

### Frontend Unit Test Example

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CodeEditor } from './CodeEditor';

describe('CodeEditor', () => {
  const mockOnExecute = jest.fn();
  
  beforeEach(() => {
    mockOnExecute.mockClear();
  });
  
  it('should render code editor with initial code', () => {
    const initialCode = 'console.log("Hello");';
    
    render(
      <CodeEditor
        language="javascript"
        initialCode={initialCode}
        onExecute={mockOnExecute}
      />
    );
    
    expect(screen.getByText(/console\.log/)).toBeInTheDocument();
  });
  
  it('should call onExecute when execute button is clicked', async () => {
    mockOnExecute.mockResolvedValue({ success: true, output: 'Hello' });
    
    render(
      <CodeEditor
        language="javascript"
        initialCode="console.log('Hello');"
        onExecute={mockOnExecute}
      />
    );
    
    const executeButton = screen.getByRole('button', { name: /execute/i });
    fireEvent.click(executeButton);
    
    await waitFor(() => {
      expect(mockOnExecute).toHaveBeenCalledTimes(1);
    });
  });
  
  it('should display error when execution fails', async () => {
    mockOnExecute.mockRejectedValue(new Error('Execution failed'));
    
    render(
      <CodeEditor
        language="javascript"
        initialCode="invalid code"
        onExecute={mockOnExecute}
      />
    );
    
    const executeButton = screen.getByRole('button', { name: /execute/i });
    fireEvent.click(executeButton);
    
    await waitFor(() => {
      expect(screen.getByText(/execution failed/i)).toBeInTheDocument();
    });
  });
});
```

## Integration Testing

### Purpose
Test component interactions and API endpoints

### Framework
- **Backend**: Spring Boot Test + MockMvc + Testcontainers
- **Frontend**: React Testing Library + MSW (Mock Service Worker)

### Standards

**Backend Integration Test**:
```java
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class LearningControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private LearningModuleRepository moduleRepository;
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
    
    @BeforeEach
    void setUp() {
        moduleRepository.deleteAll();
    }
    
    @Test
    void testGetModuleById_ModuleExists_ReturnsModule() throws Exception {
        // Given
        LearningModule module = moduleRepository.save(
            LearningModule.builder()
                .name("Java Fundamentals")
                .type(ModuleType.JAVA)
                .build()
        );
        
        // When & Then
        mockMvc.perform(get("/api/modules/" + module.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(module.getId()))
            .andExpect(jsonPath("$.name").value("Java Fundamentals"))
            .andExpect(jsonPath("$.type").value("JAVA"));
    }
    
    @Test
    void testCreateModule_ValidInput_ReturnsCreatedModule() throws Exception {
        // Given
        String requestBody = """
            {
                "name": "React Fundamentals",
                "type": "REACT"
            }
            """;
        
        // When & Then
        mockMvc.perform(post("/api/modules")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("React Fundamentals"))
            .andExpect(jsonPath("$.type").value("REACT"));
        
        // Verify in database
        List<LearningModule> modules = moduleRepository.findAll();
        assertThat(modules).hasSize(1);
        assertThat(modules.get(0).getName()).isEqualTo("React Fundamentals");
    }
}
```

**What to Test**:
- ✅ API endpoints (all HTTP methods)
- ✅ Request/response formats
- ✅ Database operations
- ✅ Transaction handling
- ✅ Error responses
- ✅ Authentication/authorization

## E2E Testing

### Purpose
Test complete user workflows

### Framework
- **Cypress** for frontend E2E tests

### Standards

**E2E Test Example**:
```typescript
describe('Learning Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should complete full learning workflow', () => {
    // Login
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-button"]').click();
    
    // Navigate to Java module
    cy.get('[data-testid="sidebar"]').contains('Java').click();
    cy.url().should('include', '/modules/java');
    
    // Select a topic
    cy.contains('Variables and Data Types').click();
    cy.get('[data-testid="topic-content"]').should('be.visible');
    
    // Execute code
    cy.get('[data-testid="code-editor"]').type('System.out.println("Hello");');
    cy.get('[data-testid="execute-button"]').click();
    cy.get('[data-testid="output"]').should('contain', 'Hello');
    
    // Mark topic complete
    cy.get('[data-testid="mark-complete"]').click();
    cy.get('[data-testid="progress-indicator"]').should('contain', '1/100');
    
    // Verify progress saved
    cy.reload();
    cy.get('[data-testid="progress-indicator"]').should('contain', '1/100');
  });
  
  it('should handle errors gracefully', () => {
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('invalid@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
```

**What to Test**:
- ✅ Critical user journeys
- ✅ Authentication flows
- ✅ Core features
- ✅ Error handling
- ✅ Cross-browser compatibility

**What NOT to Test**:
- ❌ Every possible path (too slow)
- ❌ Unit-level logic
- ❌ Third-party integrations (mock them)

## Test Data Management

### Test Data Principles
- Use realistic but fake data
- Keep test data small
- Clean up after tests
- Use factories/builders for consistency

### Test Data Factory Example

```java
public class TestDataFactory {
    
    public static LearningModule createModule(String name, ModuleType type) {
        return LearningModule.builder()
            .name(name)
            .type(type)
            .description("Test description")
            .orderIndex(1)
            .build();
    }
    
    public static Topic createTopic(LearningModule module, String title) {
        return Topic.builder()
            .module(module)
            .title(title)
            .content("Test content")
            .difficulty(Difficulty.MEDIUM)
            .orderIndex(1)
            .build();
    }
    
    public static User createUser(String username, String email) {
        return User.builder()
            .username(username)
            .email(email)
            .passwordHash("$2a$10$hashedpassword")
            .build();
    }
}
```

## Performance Testing

### Load Testing
- Use JMeter or Gatling
- Test with 1000+ concurrent users
- Measure response times
- Identify bottlenecks

### Performance Test Example

```java
@Test
void testApiPerformance_1000Requests_UnderThreshold() {
    int requestCount = 1000;
    long startTime = System.currentTimeMillis();
    
    for (int i = 0; i < requestCount; i++) {
        mockMvc.perform(get("/api/modules"))
            .andExpect(status().isOk());
    }
    
    long endTime = System.currentTimeMillis();
    long avgResponseTime = (endTime - startTime) / requestCount;
    
    assertThat(avgResponseTime).isLessThan(200); // < 200ms average
}
```

## Security Testing

### What to Test
- ✅ Authentication bypass attempts
- ✅ Authorization violations
- ✅ SQL injection
- ✅ XSS attacks
- ✅ CSRF protection
- ✅ Input validation

### Security Test Example

```java
@Test
void testSqlInjection_MaliciousInput_Prevented() {
    String maliciousInput = "1' OR '1'='1";
    
    assertThatThrownBy(() -> 
        userService.getUserByUsername(maliciousInput)
    ).isInstanceOf(ValidationException.class);
}

@Test
void testUnauthorizedAccess_NoToken_Returns401() throws Exception {
    mockMvc.perform(get("/api/admin/users"))
        .andExpect(status().isUnauthorized());
}
```

## Test Execution

### Running Tests

**Backend**:
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=LearningServiceTest

# Run with coverage
mvn test jacoco:report

# Run integration tests only
mvn verify -P integration-tests
```

**Frontend**:
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run cypress:run

# Run specific test file
npm test -- CodeEditor.test.tsx
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up JDK 21
        uses: actions/setup-java@v3
        with:
          java-version: '21'
      
      - name: Run backend tests
        run: mvn test
      
      - name: Run frontend tests
        run: |
          cd frontend
          npm install
          npm test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Test Maintenance

### When to Update Tests
- When requirements change
- When bugs are found
- When refactoring code
- When adding new features

### Test Code Quality
- Tests should be readable
- Tests should be maintainable
- Tests should be fast
- Tests should be reliable (no flaky tests)

### Dealing with Flaky Tests
1. Identify the flaky test
2. Add proper waits/timeouts
3. Fix race conditions
4. Use test retries as last resort
5. Remove if unfixable

## Test Documentation

### Document Test Strategy
- What is being tested
- Why it's being tested
- How to run tests
- Known limitations

### Example Test Documentation

```java
/**
 * Integration tests for Learning Module API endpoints.
 * 
 * Tests cover:
 * - CRUD operations for learning modules
 * - Validation of input data
 * - Error handling for invalid requests
 * - Authorization checks
 * 
 * Prerequisites:
 * - PostgreSQL test container
 * - Test data factory
 * 
 * @see LearningController
 * @see LearningService
 */
@SpringBootTest
@AutoConfigureMockMvc
class LearningControllerIntegrationTest {
    // Tests...
}
```

## Checklist Before Marking Task Complete

- [ ] All new code has unit tests
- [ ] Unit test coverage > 80%
- [ ] Integration tests added for new APIs
- [ ] E2E tests added for new features
- [ ] All tests pass locally
- [ ] All tests pass in CI/CD
- [ ] No flaky tests
- [ ] Test code is clean and maintainable
- [ ] Test documentation updated

---

**Remember**: Tests are not optional. They are the safety net that allows you to refactor and add features with confidence. Write tests first, code second (TDD when possible)!
