# Developer Guidelines

## Important Git Workflow Rules

### ⚠️ DO NOT Push to `main` Branch

The `main` branch is protected and should only contain production-ready, fully tested code. **Never push directly to main.**

### ✅ Correct Workflow

1. **Create a new branch from `dev`**
   ```bash
   # Fetch latest changes
   git fetch origin
   
   # Create and checkout a new branch from dev
   git checkout -b feature/your-feature-name origin/dev
   ```

2. **Make your changes locally**
   ```bash
   # Create your feature/fix on your branch
   # Test thoroughly before committing
   ```

3. **Push to your feature branch**
   ```bash
   # Push your changes to the remote feature branch
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request (PR) to `dev`**
   - Go to GitHub/GitLab
   - Create a PR from your feature branch to `dev`
   - Request code review from team members
   - Ensure all tests pass and there are **no errors**

5. **Merge to `dev` only if approved**
   - Only merge after code review is approved
   - Ensure all CI/CD checks pass
   - Your branch will be merged into `dev`

### 🔴 What NOT to Do

- ❌ Don't commit directly to `main`
- ❌ Don't push to `main` from anywhere
- ❌ Don't commit code with errors to `dev`
- ❌ Don't merge unreviewed PRs

### ✔️ Checklist Before Pushing

- [ ] Code has been tested locally
- [ ] No console errors or warnings
- [ ] No syntax errors
- [ ] Dependencies are properly installed
- [ ] Follows project coding standards
- [ ] Changes are documented (if needed)
- [ ] No sensitive data committed (no .env files, API keys, etc.)

### 📋 Branch Naming Convention

Use descriptive branch names:
```
feature/feature-name          # New feature
bugfix/bug-description        # Bug fix
hotfix/critical-issue         # Urgent production fix
refactor/code-section         # Code refactoring
docs/documentation-update     # Documentation
```

### 🔄 Git Commands Quick Reference

```bash
# Check current branch
git branch

# List all branches (local and remote)
git branch -a

# Switch to dev branch
git checkout dev

# Create and switch to new branch from dev
git checkout -b feature/my-feature origin/dev

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Description of changes"

# Push to your feature branch
git push origin feature/my-feature

# Pull latest changes from dev (before creating PR)
git fetch origin
git merge origin/dev
```

### 🎯 Development Flow Diagram

```
main (Production) ← stable, tested code only
  ↑
  ├── PR review required
  ↓
dev (Development) ← accepted PRs only
  ↑
  ├── PR must pass all checks, no errors
  ↓
feature/bugfix branches ← your working branches
```

### ⚡ Remember

- **dev** is the integration branch for features
- **main** is for production releases only
- Always test your code before submitting a PR
- Keep branches focused on a single feature/fix
- Update your branch before creating a PR to avoid conflicts

---

**Questions?** Contact the project lead or check the main README.md for more information.
