#!/usr/bin/env python3
"""
Test script for Excel import functionality
Creates a sample Excel file to test the import system
"""

import pandas as pd
from openpyxl.styles import Font, PatternFill
import os

def create_test_excel_file():
    """Create a test Excel file with sample book data"""
    
    # Sample book data for testing
    test_books = {
        'Title': [
            'The Hobbit',
            'Dune',
            'Foundation',
            'Neuromancer',
            'The Left Hand of Darkness'
        ],
        'Author': [
            'J.R.R. Tolkien',
            'Frank Herbert', 
            'Isaac Asimov',
            'William Gibson',
            'Ursula K. Le Guin'
        ],
        'ISBN': [
            '978-0547928227',
            '978-0441172719',
            '978-0553293357',
            '978-0441569595',
            '978-0441478125'
        ],
        'Genre': [
            'Fantasy',
            'Science Fiction',
            'Science Fiction', 
            'Cyberpunk',
            'Science Fiction'
        ],
        'Publication_Year': [
            1937,
            1965,
            1951,
            1984,
            1969
        ],
        'Total_Copies': [
            4,
            3,
            5,
            2,
            3
        ]
    }
    
    df = pd.DataFrame(test_books)
    
    # Create Excel file with styling
    filename = 'test_book_import.xlsx'
    
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='Books', index=False)
        
        # Get workbook and worksheet for styling
        workbook = writer.book
        worksheet = writer.sheets['Books']
        
        # Style header row
        header_font = Font(bold=True, color="FFFFFF")
        header_fill = PatternFill(start_color="2E7D32", end_color="2E7D32", fill_type="solid")
        
        for cell in worksheet[1]:
            cell.font = header_font
            cell.fill = header_fill
        
        # Auto-adjust column widths
        for column in worksheet.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = min(max_length + 2, 50)
            worksheet.column_dimensions[column_letter].width = adjusted_width
    
    print(f"✓ Created test Excel file: {filename}")
    print(f"✓ Contains {len(test_books['Title'])} sample books")
    return filename

def create_error_test_file():
    """Create an Excel file with intentional errors for testing validation"""
    
    # Sample data with various errors
    error_test_data = {
        'Title': [
            'Valid Book',           # Valid entry
            '',                     # Missing title (error)
            'Another Valid Book',   # Valid entry
            'Book with Bad Year',   # Invalid year (error)
            'Duplicate ISBN Book'   # Duplicate ISBN (error)
        ],
        'Author': [
            'Valid Author',
            'Author Name',          
            'Another Author',
            'Some Author',
            'Final Author'
        ],
        'ISBN': [
            '978-1111111111',
            '978-2222222222',
            '978-3333333333', 
            '978-4444444444',
            '978-1111111111'        # Duplicate ISBN (error)
        ],
        'Genre': [
            'Fiction',
            'Non-Fiction',
            'Mystery',
            'Science',
            'History'
        ],
        'Publication_Year': [
            2020,
            2019,
            2021,
            2050,                   # Invalid year (error)
            2018
        ],
        'Total_Copies': [
            3,
            2,
            4,
            1,
            0                       # Invalid count (error)
        ]
    }
    
    df = pd.DataFrame(error_test_data)
    filename = 'test_book_import_errors.xlsx'
    
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='Books', index=False)
    
    print(f"✓ Created error test file: {filename}")
    print(f"✓ Contains {len(error_test_data['Title'])} books with intentional errors")
    return filename

if __name__ == "__main__":
    print("Creating test Excel files for import functionality...")
    print()
    
    # Create valid test file
    valid_file = create_test_excel_file()
    
    # Create error test file
    error_file = create_error_test_file()
    
    print()
    print("Test files created successfully!")
    print("You can now test the Excel import functionality:")
    print(f"1. Upload '{valid_file}' - should import 5 books successfully")
    print(f"2. Upload '{error_file}' - should show validation errors")
    print()
    print("Files are ready for testing in the admin import interface.")