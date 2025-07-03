from datetime import datetime, timedelta
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin):
    def __init__(self, user_id, username, email, password, role, full_name=None, admission_number=None):
        self.id = user_id
        self.username = username
        self.email = email
        self.password_hash = generate_password_hash(password)
        self.role = role  # 'admin', 'teacher', 'student'
        self.full_name = full_name or username
        self.admission_number = admission_number if role == 'student' else None
        self.created_at = datetime.now()
        self._is_active = True

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @property
    def is_active(self):
        return self._is_active

    @staticmethod
    def get(user_id):
        return users.get(user_id)

    @staticmethod
    def get_by_username(username):
        for user in users.values():
            if user.username == username:
                return user
        return None

class Book:
    def __init__(self, book_id, title, author, isbn, genre, publication_year, total_copies, available_copies=None):
        self.id = book_id
        self.title = title
        self.author = author
        self.isbn = isbn
        self.genre = genre
        self.publication_year = publication_year
        self.total_copies = total_copies
        self.available_copies = available_copies if available_copies is not None else total_copies
        self.created_at = datetime.now()

class Transaction:
    def __init__(self, transaction_id, user_id, book_id, transaction_type, due_date=None):
        self.id = transaction_id
        self.user_id = user_id
        self.book_id = book_id
        self.transaction_type = transaction_type  # 'borrow', 'return'
        self.transaction_date = datetime.now()
        self.due_date = due_date or (datetime.now() + timedelta(days=15))  # 15-day borrowing period
        self.is_returned = False
        self.return_date = None
        self.fine_amount = 0.0
        self.fine_paid = False
        self.payment_date = None
        self.payment_collected_by = None

    @property
    def is_overdue(self):
        """Check if the book is overdue"""
        if self.is_returned:
            return False
        return datetime.now() > self.due_date

    @property
    def days_overdue(self):
        """Calculate number of days overdue"""
        if not self.is_overdue:
            return 0
        return (datetime.now() - self.due_date).days

    @property
    def calculated_fine(self):
        """Calculate fine amount (1 rs per day after 15 days)"""
        if not self.is_overdue:
            return 0.0
        return float(self.days_overdue * 1)  # 1 rs per day

    def update_fine(self):
        """Update the fine amount based on current date"""
        self.fine_amount = self.calculated_fine
        return self.fine_amount

class BookRequest:
    def __init__(self, request_id, user_id, book_id, message=None):
        self.id = request_id
        self.user_id = user_id
        self.book_id = book_id
        self.message = message
        self.request_date = datetime.now()
        self.status = 'pending'  # pending, approved, rejected
        self.admin_response = None
        self.processed_date = None
        self.processed_by = None

class PaymentRecord:
    def __init__(self, payment_id, transaction_id, user_id, amount, payment_type='fine'):
        self.id = payment_id
        self.transaction_id = transaction_id
        self.user_id = user_id
        self.amount = amount
        self.payment_type = payment_type  # 'fine', 'deposit', etc.
        self.payment_date = datetime.now()
        self.collected_by = None  # Admin who collected the payment
        self.payment_method = 'cash'  # cash, card, online
        self.notes = ''

class ActivityLog:
    def __init__(self, user_id, action, ip_address, details=None):
        self.user_id = user_id
        self.action = action
        self.ip_address = ip_address
        self.timestamp = datetime.now()
        self.details = details or {}

class SystemSettings:
    def __init__(self):
        self.school_name = "Little Flower International School"
        self.library_name = "Little Flower Library"
        self.primary_color = "#2E7D32"
        self.secondary_color = "#1565C0"
        self.accent_color = "#FF6F00"
        self.logo_url = ""
        self.developer_name = "Shamim Ejaz"
        self.developer_portal_enabled = True
        self.footer_text = "Developed by Shamim Ejaz"
        self.address = "123 Education Street, Knowledge City"
        self.phone = "+1-234-567-8900"
        self.email = "info@littleflower.edu"

# In-memory storage
users = {}
books = {}
transactions = {}
book_requests = {}
activity_logs = []
payment_records = {}
system_settings = SystemSettings()

# Initialize with some default data
def initialize_data():
    # Create default admin user
    admin = User(
        user_id='admin1',
        username='admin',
        email='admin@littleflower.edu',
        password='admin123',
        role='admin',
        full_name='System Administrator'
    )
    users[admin.id] = admin

    # Create sample teacher
    teacher = User(
        user_id='teacher1',
        username='teacher1',
        email='teacher1@littleflower.edu',
        password='teacher123',
        role='teacher',
        full_name='John Smith'
    )
    users[teacher.id] = teacher

    # Create sample student
    student = User(
        user_id='student1',
        username='2024001',  # Admission number as username
        email='student1@littleflower.edu',
        password='student123',
        role='student',
        full_name='Alice Johnson',
        admission_number='2024001'
    )
    users[student.id] = student

    # Create sample books
    sample_books = [
        Book('book1', 'To Kill a Mockingbird', 'Harper Lee', '978-0-06-112008-4', 'Fiction', 1960, 5),
        Book('book2', '1984', 'George Orwell', '978-0-452-28423-4', 'Dystopian', 1949, 3),
        Book('book3', 'The Great Gatsby', 'F. Scott Fitzgerald', '978-0-7432-7356-5', 'Fiction', 1925, 4),
        Book('book4', 'Pride and Prejudice', 'Jane Austen', '978-0-14-143951-8', 'Romance', 1813, 2),
        Book('book5', 'The Catcher in the Rye', 'J.D. Salinger', '978-0-316-76948-0', 'Fiction', 1951, 3)
    ]

    for book in sample_books:
        books[book.id] = book

    # Create some sample transactions to demonstrate the fine system
    # Recent transaction (within 15 days)
    recent_transaction = Transaction('trans1', 'student1', 'book1', 'borrow')
    transactions[recent_transaction.id] = recent_transaction
    books['book1'].available_copies -= 1

    # Overdue transaction (more than 15 days ago)
    from datetime import timedelta
    overdue_transaction = Transaction('trans2', 'teacher1', 'book2', 'borrow')
    overdue_transaction.transaction_date = datetime.now() - timedelta(days=20)
    overdue_transaction.due_date = datetime.now() - timedelta(days=5)  # 5 days overdue
    overdue_transaction.update_fine()
    transactions[overdue_transaction.id] = overdue_transaction
    books['book2'].available_copies -= 1

    # Sample book requests to demonstrate the workflow
    sample_request1 = BookRequest('req1', 'student1', 'book3', 'I need this book for my literature assignment.')
    book_requests[sample_request1.id] = sample_request1

    sample_request2 = BookRequest('req2', 'teacher1', 'book4', 'Required for my English class curriculum.')
    book_requests[sample_request2.id] = sample_request2

# Initialize data when module is imported
initialize_data()