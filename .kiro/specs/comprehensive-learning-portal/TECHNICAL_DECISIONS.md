# Technical Decisions

## Database Strategy

**Decision**: PostgreSQL Only - No H2, No In-Memory Databases
**Date**: 2024-01-15
**Status**: Active

### Rationale
- Use PostgreSQL for all environments (development, testing, production)
- Ensures consistency across all environments
- Avoids H2/PostgreSQL compatibility issues
- Real database behavior in all scenarios

### Implementation
- Development: Local PostgreSQL instance
- Testing: Testcontainers with PostgreSQL
- Production: PostgreSQL (AWS RDS or similar)

---

## Code Generation Strategy

**Decision**: No Lombok - Manual Getters/Setters
**Date**: 2024-01-15
**Status**: Active

### Rationale
- Explicit code is easier to understand and debug
- No annotation processor complexity
- Better IDE support without plugins
- Clearer for learning purposes (this is an educational platform)
- No magic - what you see is what you get

### Implementation
- Write getters/setters manually
- Use IDE code generation features
- Follow standard JavaBean conventions
- Consider using Records for immutable DTOs (Java 14+)

---

## Future Decisions

Document all major technical decisions here with:
- Decision title
- Date
- Rationale
- Implementation details
- Status (Active, Deprecated, Superseded)
