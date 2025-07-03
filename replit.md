# Little Flower Library Management System

## Overview

This is a role-based library management system for Little Flower International School. The application provides separate interfaces for administrators, teachers, and students to manage library operations, browse books, and track borrowing activities. Built with Flask, it features a clean Bootstrap UI and comprehensive activity monitoring.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Bootstrap 5 for responsive UI
- **Base Template**: Unified navigation and layout through `base.html`
- **Role-based Views**: Separate dashboard interfaces for admin, teacher, and student roles
- **Static Assets**: Custom CSS styling and JavaScript for enhanced user experience

### Backend Architecture
- **Framework**: Flask web framework with Flask-Login for session management
- **Authentication**: Role-based authentication system (admin, teacher, student)
- **Session Management**: Flask-Login with secure session handling
- **Middleware**: ProxyFix for handling reverse proxy headers

### Data Storage
- **In-Memory Storage**: Currently uses Python dictionaries for data persistence
- **Models**: Object-oriented design with User, Book, Transaction, and ActivityLog classes
- **Password Security**: Werkzeug password hashing for secure credential storage

## Key Components

### Authentication System
- **Multi-role Login**: Separate login endpoints for admin, teacher, and student roles
- **Session Management**: Flask-Login integration for user session handling
- **Password Security**: Hashed password storage using Werkzeug security functions

### User Management
- **Role-based Access**: Three distinct user roles with different permissions
- **User Model**: Comprehensive user profile with full name, email, and role tracking
- **Activity Logging**: IP address tracking and action logging for security monitoring

### Book Management
- **Inventory Tracking**: Total and available copy management
- **Search Functionality**: Title, author, and genre-based search capabilities
- **Book Model**: Complete book information including ISBN, genre, and publication year

### Transaction System
- **Borrow/Return Tracking**: Complete transaction history with due dates
- **Overdue Management**: Automatic overdue detection and flagging
- **Transaction Model**: Timestamped borrowing and return records

### Activity Monitoring
- **Real-time Logging**: User action tracking with IP addresses and timestamps
- **Security Monitoring**: Login attempts and system access logging
- **Admin Oversight**: Comprehensive activity dashboard for administrators

## Data Flow

1. **User Authentication**: Users access role-specific login pages and authenticate through Flask-Login
2. **Session Creation**: Successful authentication creates secure user sessions
3. **Role-based Routing**: Flask routes direct users to appropriate dashboards based on their role
4. **Data Operations**: CRUD operations on books, users, and transactions through in-memory storage
5. **Activity Logging**: All user actions are logged with timestamps and IP addresses
6. **Real-time Updates**: Dashboard statistics and transaction status updates in real-time

## External Dependencies

- **Flask**: Core web framework for routing and request handling
- **Flask-Login**: User session management and authentication
- **Werkzeug**: Password hashing and security utilities
- **Bootstrap 5**: Frontend CSS framework for responsive design
- **Font Awesome**: Icon library for enhanced UI elements
- **Google Fonts**: Roboto font family for consistent typography

## Deployment Strategy

- **Development Mode**: Flask development server with debug mode enabled
- **Host Configuration**: Configured to run on all interfaces (0.0.0.0:5000)
- **Environment Variables**: Session secret key configurable via environment variables
- **Static Files**: CSS and JavaScript served through Flask's static file handling
- **Template Rendering**: Jinja2 templates with automatic reloading in development

## User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: Modern UI with skeleton loading effects and enhanced visual elements.

## Recent Enhancements

### Book Request & Assignment Workflow (July 02, 2025)
- **Request-Based Borrowing**: Students and teachers can only request books, not directly borrow them
- **Admin-Only Assignment**: Only administrators can approve requests and assign books to users
- **Request Management System**: Comprehensive interface for admin to review, approve, or reject book requests
- **Status Tracking**: Real-time tracking of request status (pending, approved, rejected) with admin responses
- **Book Availability Display**: Clear visual indicators showing when books are borrowed vs. available for request
- **15-Day Borrowing Period**: Automatic 15-day due date calculation for approved book assignments
- **Automatic Fine Calculation**: 1 rs per day fine after due date expires, calculated in real-time
- **Comprehensive Reporting**: Detailed analytics dashboard with overdue tracking, popular books, and user statistics
- **Enhanced Transaction Management**: Real-time fine calculation and payment tracking

### Excel Import System (July 02, 2025)
- **Bulk Book Import**: Upload Excel files to add multiple books at once
- **Template Download**: Pre-formatted Excel template with proper column structure
- **Data Validation**: Comprehensive validation for ISBN uniqueness, required fields, and data types
- **Error Reporting**: Detailed error messages for failed imports with row-specific feedback
- **Styled Templates**: Professional Excel template with color-coded headers and auto-sized columns
- **Duplicate Prevention**: Automatic detection and prevention of duplicate ISBN entries
- **Admin Integration**: Import functionality integrated into admin dashboard and book management

### Enhanced Visual Design (July 02, 2025)
- **Skeleton Loading System**: Implemented comprehensive skeleton loading for tables, cards, and dynamic content
- **Modern Card Designs**: Added glass morphism effects, gradient cards, and enhanced hover animations
- **Enhanced Navigation**: Updated navbar with modern gradient background and status indicators
- **Interactive Elements**: Added enhanced buttons with shimmer effects and improved form styling
- **Data Tables**: Implemented modern table design with sortable headers and enhanced hover effects
- **Status Indicators**: Added real-time activity status and user avatar displays
- **Animation System**: Comprehensive fade-in, slide-up, and scale-in animations with staggered delays
- **Search Enhancement**: Modern search interface with enhanced visual feedback
- **Mobile Responsive**: Optimized skeleton loading and enhanced elements for mobile devices

### Color Scheme & Branding
- Primary: #2E7D32 (School Green)
- Secondary: #1565C0 (Professional Blue) 
- Accent: #FF6F00 (Warm Orange)
- Enhanced gradient combinations for modern appearance

### Performance Features
- Skeleton loading reduces perceived loading time
- Smooth transitions and animations improve user experience
- Optimized CSS with reduced motion support for accessibility
- Progressive enhancement approach

## Changelog

- July 02, 2025: Enhanced design with skeleton loading, modern cards, improved animations, and comprehensive visual upgrades
- July 02, 2025: Initial setup