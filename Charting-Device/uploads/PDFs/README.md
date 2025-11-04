# PDF Charts Directory

This directory stores generated PDF chart reports for approved patient notes.

## Structure

PDFs are organized by organization:
- `EHC/` - Erindale Health Center
- `EMC/` - Evergreen Medical Clinic
- `JPCH/` - Jim Pattison Children's Hospital
- `KMC/` - Kenderdine Medical Clinic
- `PVM/` - Parkville Manor
- `Unassigned/` - For any unassigned organization

## File Naming Convention

PDF files follow this naming pattern:
```
chart_{staff_id}_{timestamp}_Room{room}_Bed{bed}.pdf
```

Examples:
- `chart_S001_20251031_143025_Room101_BedA.pdf` - Specific room and bed
- `chart_S001_20251031_143025_Room101.pdf` - All beds in a room
- `chart_S001_20251031_143025_AllRooms.pdf` - All rooms for a staff member

## Purpose

These PDFs are automatically generated when a staff member approves patient notes through the dashboard. They contain:
- Organization and staff information
- Date and time of generation
- Patient notes grouped by room and bed
- Patient assignment information

The PDF path is stored in the `room_data` table's `pdf_path` column for future reference.

