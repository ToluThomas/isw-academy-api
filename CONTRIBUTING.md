# Contributing Guide

Welcome to the ISW Academy API workshop! This guide explains how to set up your personal branch and contribute during the workshop.

## Creating Your Personal Branch

Each contributor should create a personal branch using their name. This branch serves as your workspace throughout the workshop to track your progress and updates.

### Branch Format

- Use your name: `firstname.lastname`
- Examples: `john.doe`, `sarah.smith`, `mike.johnson`

### Setup Steps

1. Clone the repository (if not already done)
2. Create your personal branch from main
3. Push your branch to remote
4. Work on your branch throughout the workshop

### Commands

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create your personal branch
git checkout -b firstname.lastname

# Push your branch to remote
git push -u origin firstname.lastname
```

## Working on Your Branch

Once your branch is set up, follow these practices:

### Making Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add feature X"

# Push updates to your branch
git push
```

### Keeping Your Branch Current

Your personal branch is your workspace for the entire workshop. Commit and push regularly to:

- Save your progress
- Keep your work backed up on the remote
- Allow instructors to review your work if needed

### Syncing with Main (Optional)

If updates are made to main that you need:

```bash
git checkout main
git pull origin main
git checkout firstname.lastname
git merge main
```

## Summary

| Step | Command |
|------|---------|
| Create branch | `git checkout -b firstname.lastname` |
| Push new branch | `git push -u origin firstname.lastname` |
| Commit changes | `git add . && git commit -m "message"` |
| Push updates | `git push` |
