# Admin Panel Documentation

## Overview
The admin panel provides comprehensive management tools for Academic Atelier. Admins can manage content, moderate questions, view statistics, and maintain platform integrity.

## Access the Admin Panel

### Admin Login
- **URL**: `http://localhost:3000/admin/login`
- **Default Credentials**:
  - Email: `admin@example.com`
  - Password: `admin123`

### Quick Access
- Click the **Admin Panel** icon (⚙️) in the top-right corner of the forum navbar
- Or navigate directly to `/admin/login`

## Admin Dashboard Features

### 1. Dashboard Overview
The main dashboard displays key statistics:
- **Total Questions**: Number of questions on the platform
- **Total Answers**: Number of answers provided
- **Active Users**: Count of active users
- **Flagged Content**: Number of flagged/suspicious questions

### 2. Question Management
Access via the "Manage Questions" section:

#### Review Questions
- View all questions with full details
- See question status (pending, approved, rejected)
- View author, creation date, upvotes, and tags

#### Actions Available
- **Approve**: Mark a question as approved
- **Reject**: Mark a question as rejected
- **Delete**: Permanently remove a question
- **View**: Open the question on the forum to see full context

### 3. Answer Management (Placeholder)
Ready for implementation to manage answers across the platform

### 4. Content Moderation
Monitor and manage content quality:
- Review flagged questions
- Apply moderation rules
- Ensure educational standards

### 5. User Management (Placeholder)
Future feature for managing user accounts and permissions

### 6. Admin Settings
Configure admin preferences:
- Enable/disable content moderation
- Toggle user report notifications
- Manage moderation rules

## Security Features

### Authentication
- **JWT-based Authentication**: Admin sessions are secured with JWT tokens
- **Token Storage**: Tokens are stored in localStorage (valid for 24 hours)
- **Authorization Header**: All admin requests include authorization bearer token
- **Auto-Logout**: Explicit logout clears authentication tokens

### Protected Routes
- Admin dashboard automatically redirects to login if not authenticated
- Invalid tokens trigger re-authentication

## Backend Configuration

### Environment Variables
Add these to your `.env` file in the backend directory:

```env
# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# JWT secret (should be a strong random string in production)
JWT_SECRET=your_secret_key_here

# Existing variables
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## API Endpoints

### Authentication
```
POST /api/admin/login
Body: { email, password }
```

### Statistics
```
GET /api/admin/stats
Headers: Authorization: Bearer {token}
```

### Question Management
```
GET /api/admin/questions
PUT /api/admin/questions/:id/approve
PUT /api/admin/questions/:id/reject
DELETE /api/admin/questions/:id
Headers: Authorization: Bearer {token}
```

## Frontend File Structure

```
frontend/src/
├── pages/
│   ├── AdminLoginPage.jsx          # Login page
│   └── AdminDashboardPage.jsx      # Main dashboard
├── components/
│   ├── AdminTopbar.jsx             # Header with logout
│   ├── AdminSidebar.jsx            # Navigation menu
│   ├── AdminStats.jsx              # Statistics cards
│   ├── AdminQuestionsList.jsx      # Question management table
└── services/
    └── api.js                      # API calls with admin endpoints
```

## Backend File Structure

```
backend/
├── routes/
│   ├── adminRoutes.js              # All admin endpoints
│   ├── questionRoutes.js           # Question endpoints
│   └── answerRoutes.js             # Answer endpoints
├── models/
│   ├── Question.js                 # Updated with status & isFlagged
│   └── Answer.js
└── index.js                        # Updated with admin routes
```

## UI/UX Features

### Design Consistency
- **Color Scheme**: Matches the forum UI with blue accent colors
- **Components**: Reuses Tailwind CSS classes and design patterns
- **Responsiveness**: Fully responsive layout with sidebar (hidden on mobile)
- **Icons**: Uses Material Symbols for consistency with forum

### Navigation
- **Sidebar Navigation**: Fixed left sidebar with active state highlighting
- **Tab System**: Switch between overview, questions, and settings
- **Back Navigation**: Easy return to forum from login page

### User Feedback
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Visual feedback during data loading
- **Action Buttons**: Clear CTA buttons with hover effects
- **Confirmations**: Double-check for destructive actions like delete

## Development

### Installation
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (if needed to install dependencies)
cd frontend
npm install
npm run dev
```

### Testing
Use the default admin credentials to log in and test the panel:
- Email: `admin@example.com`
- Password: `admin123`

### Customization
To change admin credentials, update the `.env` file or modify the hardcoded values in `backend/routes/adminRoutes.js`

## Future Enhancements

- [ ] Add more detailed user management features
- [ ] Implement advanced filtering and search
- [ ] Add bulk action capabilities
- [ ] Create admin activity logs
- [ ] Add email notifications for moderation actions
- [ ] Implement custom moderation rules
- [ ] Add analytics and reporting dashboard
- [ ] Implement role-based access control (RBAC)
- [ ] Add audit trails for compliance

## Troubleshooting

### Login fails
- Verify credentials match `.env` file
- Check backend is running on port 5000
- Clear browser cache and try again

### Dashboard doesn't load
- Ensure MongoDB is connected
- Check network tab for API errors
- Verify JWT_SECRET matches between login and protected routes

### Questions list is empty
- Ensure questions exist in MongoDB
- Check API response in browser DevTools
- Verify authentication token is valid

## Support
For issues or questions about the admin panel, consult the existing codebase documentation or check the API error messages in browser console.
