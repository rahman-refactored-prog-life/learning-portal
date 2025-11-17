# Project Standards - Comprehensive Learning Portal

## Coding Standards

### Java Standards

**Naming Conventions:**
- Classes: PascalCase (e.g., `UserService`, `LearningController`)
- Methods: camelCase (e.g., `getUserById`, `createQuestion`)
- Variables: camelCase (e.g., `userId`, `questionList`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- Packages: lowercase (e.g., `com.learningportal.service`)

**Code Style:**
- Indentation: 4 spaces
- Line length: Max 120 characters
- Braces: Always use braces, even for single-line blocks
- Comments: JavaDoc for all public methods and classes

**Example:**
```java
/**
 * Service for managing learning content.
 * Provides CRUD operations for modules, topics, and questions.
 */
@Service
public class LearningService {
    
    private static final int MAX_TOPICS_PER_MODULE = 100;
    
    private final LearningModuleRepository moduleRepository;
    
    /**
     * Retrieves a learning module by ID.
     *
     * @param id the module ID
     * @return the learning module
     * @throws ResourceNotFoundException if module not found
     */
    public LearningModule getModuleById(Long id) {
        return moduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Module not found: " + id));
    }
}
```

### TypeScript/React Standards

**Naming Conventions:**
- Components: PascalCase (e.g., `CodeEditor`, `QuestionCard`)
- Functions: camelCase (e.g., `handleSubmit`, `fetchQuestions`)
- Variables: camelCase (e.g., `userId`, `isLoading`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- Interfaces/Types: PascalCase with 'I' prefix for interfaces (e.g., `IUser`, `QuestionProps`)

**Code Style:**
- Indentation: 2 spaces
- Line length: Max 100 characters
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use arrow functions for callbacks

**Example:**
```typescript
/**
 * Code editor component with multi-language support
 */
interface CodeEditorProps {
  language: ProgrammingLanguage;
  initialCode: string;
  onExecute: (code: string) => Promise<ExecutionResult>;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialCode,
  onExecute,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const result = await onExecute(code);
      // Handle result
    } catch (error) {
      // Handle error
    } finally {
      setIsExecuting(false);
    }
  };
  
  return (
    <div className="code-editor">
      {/* Editor implementation */}
    </div>
  );
};
```

## Git Commit Standards

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): implement JWT authentication

- Add JWT token generation
- Create authentication filter
- Configure Spring Security

Closes #123

---

fix(editor): resolve Monaco Editor syntax highlighting issue

The syntax highlighting was not working for Python code.
Fixed by updating the language configuration.

---

docs(readme): update setup instructions

Added PostgreSQL installation steps and environment configuration.
```

### Branch Naming

- `main` or `master`: Production-ready code
- `develop`: Development branch
- `feature/<feature-name>`: New features
- `fix/<bug-name>`: Bug fixes
- `refactor/<component-name>`: Refactoring
- `docs/<doc-name>`: Documentation updates

## Testing Standards

### Unit Tests

- **Coverage**: Minimum 80% code coverage
- **Naming**: `test<MethodName>_<Scenario>_<ExpectedResult>`
- **Structure**: Given-When-Then or Arrange-Act-Assert

**Example:**
```java
@Test
void testGetUserById_UserExists_ReturnsUser() {
    // Given
    Long userId = 1L;
    User expectedUser = new User(userId, "testuser");
    when(userRepository.findById(userId)).thenReturn(Optional.of(expectedUser));
    
    // When
    User actualUser = userService.getUserById(userId);
    
    // Then
    assertThat(actualUser).isEqualTo(expectedUser);
    verify(userRepository).findById(userId);
}
```

### Integration Tests

- Test complete workflows
- Use test database (Testcontainers with PostgreSQL)
- Clean up data after each test

### E2E Tests

- Test critical user journeys
- Use Cypress for frontend E2E tests
- Keep tests independent and idempotent

## Documentation Standards

### Code Documentation

**Java:**
- JavaDoc for all public classes and methods
- Include `@param`, `@return`, `@throws` tags
- Explain complex logic with inline comments

**TypeScript:**
- JSDoc for all exported functions and components
- Document props interfaces
- Explain complex logic with inline comments

### API Documentation

- Use OpenAPI/Swagger annotations
- Document all endpoints, parameters, responses
- Include example requests and responses

### README Files

- Every major component should have a README
- Include purpose, usage, and examples
- Keep up-to-date with code changes

## Code Review Standards

### Before Submitting PR

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console.log or debug statements
- [ ] No commented-out code
- [ ] Meaningful commit messages

### Review Checklist

- [ ] Code is readable and maintainable
- [ ] Logic is correct and efficient
- [ ] Error handling is appropriate
- [ ] Tests are comprehensive
- [ ] Documentation is clear
- [ ] No security vulnerabilities
- [ ] Performance is acceptable

## Security Standards

### Authentication & Authorization

- Always use JWT for authentication
- Never store passwords in plain text
- Use BCrypt for password hashing
- Implement proper role-based access control

### Input Validation

- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (prevent SQL injection)
- Validate file uploads

### Code Execution

- Always use sandboxed environments (Docker)
- Implement resource limits (CPU, memory, time)
- No network access for user code
- Validate code before execution

## Performance Standards

### Backend

- API response time: < 200ms (95th percentile)
- Database queries: < 100ms
- Use connection pooling
- Implement caching where appropriate

### Frontend

- Page load time: < 2 seconds
- Use code splitting and lazy loading
- Optimize images and assets
- Minimize bundle size

## Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- High contrast ratios (4.5:1 minimum)

## File Organization

### Backend Structure
```
src/main/java/com/learningportal/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── config/
├── security/
├── exception/
└── util/
```

### Frontend Structure
```
src/
├── components/
├── pages/
├── services/
├── hooks/
├── utils/
├── types/
├── styles/
└── assets/
```

## Continuous Improvement

- Review and update standards quarterly
- Incorporate feedback from team
- Stay current with industry best practices
- Document lessons learned

---

**Remember**: These standards ensure code quality, maintainability, and consistency across the entire project. Follow them diligently!
