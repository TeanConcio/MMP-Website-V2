DELETE FROM public."Admins";
DELETE FROM public."Payments";
DELETE FROM public."Module_Enrollments";
DELETE FROM public."Modules";
DELETE FROM public."Module_Details";
DELETE FROM public."Module_Names";
DELETE FROM public."Bills";
DELETE FROM public."TOR_Requests";
DELETE FROM public."Teachers";
DELETE FROM public."Students";

-- Password is 'password'

-- Insert Admins
INSERT INTO public."Admins" (
	admin_id, 
	email, 
	password, 
	created_At, 
	updated_At
) 
VALUES 
(
	'2023-900-000'::character varying, 
	'admin1@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2023-900-001'::character varying, 
	'admin2@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2023-900-002'::character varying, 
	'admin3@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2023-900-003'::character varying, 
	'admin4@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2023-900-004'::character varying, 
	'admin5@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);


-- Insert Teachers
INSERT INTO public."Teachers" (
	teacher_id, 
	first_name, 
	last_name, 
	middle_name, 
	email, 
	status, 
	password, 
	created_at, 
	updated_at
)
VALUES 
(
	'2023-600-000'::character varying, 
	'Emily'::character varying,
    'Grace'::character varying,
    'Smith'::character varying,
	'teacher1@cssweng.com'::character varying, 
	'INACTIVE',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
),
(
	'2023-600-001'::character varying, 
	'Benjamin'::character varying,
    'James'::character varying,
    'Johnson'::character varying,
	'teacher2@cssweng.com'::character varying, 
	'ACTIVE',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
),
(
	'2023-600-002'::character varying, 
    'Sophia'::character varying,
    'Rose'::character varying,
    'Brown'::character varying,
	'teacher3@cssweng.com'::character varying, 
	'FOR_APPROVAL',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
),
(
	'2023-600-003'::character varying, 
	'William'::character varying,
    'Alexander'::character varying,
    'Davis'::character varying,
	'teacher4@cssweng.com'::character varying, 
	'FOR_APPROVAL',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
),
(
	'2023-600-004'::character varying, 
	'Olivia'::character varying,
    'Elizabeth'::character varying,
    'Wilson'::character varying,
	'teacher5@cssweng.com'::character varying, 
	'ACTIVE',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
);

-- Insert Students
INSERT INTO public."Students" (
    student_id,
    first_name,
    last_name,
    middle_name,
    address,
    mobile_number,
    landline,
    email,
    birthdate,
    birthplace,
    nationality,
    gender,
    civil_status,
    no_of_children,
    school,
    occupation,
    admin,
    church,
    pastor,
    is_partner_school,
    gradeschool,
    highschool,
    college,
    college_course,
    graduate,
    graduate_course,
    others,
    gradeschool_completed,
    highschool_completed,
    college_completed,
    graduate_completed,
    essay,
    emergency_name,
    emergency_address,
    emergency_mobile_number,
    password,
    status,
    track,
    created_at,
    updated_at
)
VALUES 
(
	'2023-000-000'::character varying,
	'Samuel'::character varying,
    'Joseph'::character varying,
    'Lee'::character varying,
	'Address'::character varying,
	'09123456789'::character varying,
	'01234567'::character varying,
	'student1@cssweng.com'::character varying,
    CURRENT_TIMESTAMP,
    'Birthplace'::character varying,
    'Nationality'::character varying,
    'MALE',
    'SINGLE',
    0,
    'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    false,
    'Gradeschool'::character varying,
    'Highschool'::character varying,
    'College'::character varying,
    'BS Biology',
    'Graduate'::character varying,
    'MS Biology',
    'Others',
    true,
    true,
    true,
    true,
    'Essay'::character varying,
    'Emergency Name'::character varying,
    'Emergency Address'::character varying,
    '09123456789',
    '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying,
    'ACTIVE',
    'BOTH',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2023-000-001'::character varying,
	'Ava'::character varying,
    'Claire'::character varying,
    'Anderson'::character varying,
	'Address'::character varying,
	'09123456789'::character varying,
	'01234567'::character varying,
	'student2@cssweng.com'::character varying,
    CURRENT_TIMESTAMP,
    'Birthplace'::character varying,
    'Nationality'::character varying,
    'FEMALE',
    'SINGLE',
    0,
    'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    false,
    'Gradeschool'::character varying,
    'Highschool'::character varying,
    'College'::character varying,
    'BS Chemistry',
    'Graduate'::character varying,
    'PhD Chemistry',
    'Others',
    true,
    true,
    true,
    true,
    'Essay'::character varying,
    'Emergency Name'::character varying,
    'Emergency Address'::character varying,
    '09123456789',
    '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying,
    'ACTIVE',
    'TEACHER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2023-000-002'::character varying,
	'Michael'::character varying,
    'David'::character varying,
    'Turner'::character varying,
	'Address'::character varying,
	'09123456789'::character varying,
	'01234567'::character varying,
	'student3@cssweng.com'::character varying,
    CURRENT_TIMESTAMP,
    'Birthplace'::character varying,
    'Nationality'::character varying,
    'FEMALE',
    'SINGLE',
    0,
    'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    false,
    'Gradeschool'::character varying,
    'Highschool'::character varying,
    'College'::character varying,
    'BS Biology',
    'Graduate'::character varying,
    'MS Biology',
    'Others',
    true,
    true,
    true,
    true,
    'Essay'::character varying,
    'Emergency Name'::character varying,
    'Emergency Address'::character varying,
    '09123456789',
    '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying,
    'FOR_APPROVAL',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2023-000-003'::character varying,
	'Emma'::character varying,
    'Marie'::character varying,
    'White'::character varying,
	'Address'::character varying,
	'09123456789'::character varying,
	'01234567'::character varying,
	'student4@cssweng.com'::character varying,
    CURRENT_TIMESTAMP,
    'Birthplace'::character varying,
    'Nationality'::character varying,
    'FEMALE',
    'SINGLE',
    0,
    'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    false,
    'Gradeschool'::character varying,
    'Highschool'::character varying,
    'College'::character varying,
    'BS Biology',
    'Graduate'::character varying,
    'MS Biology',
    'Others',
    true,
    true,
    true,
    true,
    'Essay'::character varying,
    'Emergency Name'::character varying,
    'Emergency Address'::character varying,
    '09123456789',
    '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying,
    'GRADUATED',
    'TEACHER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2023-000-004'::character varying,
	'Daniel'::character varying,
    'Thomas'::character varying,
    'Taylor'::character varying,
	'Address'::character varying,
	'09123456789'::character varying,
	'01234567'::character varying,
	'student5@cssweng.com'::character varying,
    CURRENT_TIMESTAMP,
    'Birthplace'::character varying,
    'Nationality'::character varying,
    'FEMALE',
    'SINGLE',
    0,
    'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    false,
    'Gradeschool'::character varying,
    'Highschool'::character varying,
    'College',
    'BS Biology',
    'Graduate'::character varying,
    'MS Biology',
    'Others',
    true,
    true,
    true,
    true,
    'Essay'::character varying,
    'Emergency Name'::character varying,
    'Emergency Address'::character varying,
    '09123456789',
    '$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying,
    'WITHDRAWN',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert Module Names
INSERT INTO public."Module_Names" (
    module_name
)
VALUES
(
    'CCPROG1'::character varying
),
(
    'CCPROG2'::character varying
),
(
    'CCPROG3'::character varying
),
(
    'CCDSTRU'::character varying
),
(
    'CCDSALG'::character varying
);

-- Insert Module Details
INSERT INTO public."Module_Details" (
    module_name,
    prerequisites,
    description
)
VALUES 
(
    'CCPROG1'::character varying,
    '{}',
    'Foundational programming concepts 1'
),
(
    'CCPROG2'::character varying,
    '{CCPROG1}',
    'Foundational programming concepts 2'
),
(
    'CCPROG3'::character varying,
    '{CCPROG2}',
    'Object-Oriented Programming'
),
(
    'CCDSTRU'::character varying,
    '{}',
    'Discrete Structures'
),
(
    'CCDSALG'::character varying,
    '{CCPROG2, CCDSTRU}',
    'Data Structures and Algorithms'
);

-- Insert Bills
INSERT INTO public."Bills" (
    bill_no,
    fee,
    deductions,
    billed_to,
    status,
    remarks,
    issued_on,
    created_at,
    updated_at
)
VALUES
(
    '1-000000001',
    2000.00,
    1000.00,
    '2023-000-000',
    'FULLY_PAID',
    'Received on 2023-10-10',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    '1-000000002',
    1000.00,
    0.00,
    '2023-000-001',
    'FULLY_PAID',
    'Paid in 2 installments',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    '1-000000003',
    2000.00,
    500.00,
    '2023-000-002',
    'PARTIALLY_PAID',
    null,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    '1-000000004',
    1500.00,
    500.00,
    '2023-000-003',
    'FULLY_PAID',
    'Overpaid 500.00',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000005',
    1500.00,
    0.00,
    '2023-000-004',
    'UNPAID',
    null,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);

-- Insert Payments
INSERT INTO public."Payments" (
    or_no,
    bill_no,
    payee,
    payment,
    remarks,
    paid_on,
    created_at,
    updated_at
)
VALUES 
(
    '1-000000001',
    '1-000000001',
    '2023-000-000',
    1000.00,
    'Deducted 50%',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000002',
    '1-000000002',
    '2023-000-001',
    700.00,
    'First payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000003',
    '1-000000002',
    '2023-000-001',
    300.00,
    'Second payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000004',
    '1-000000003',
    '2023-000-002',
    1200.00,
    'First payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000005',
    '1-000000004',
    '2023-000-003',
    1500.00,
    'Overpaid',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);

-- Insert Modules
INSERT INTO public."Modules" (
    module_name,
    school_year,
    teacher_id,
    session_1,
    session_2,
    program,
    created_at,
    updated_at
)
VALUES
(
    'CCPROG1',
    2022,
    '2023-600-001',
    '2023-10-10',
    '2023-10-17',
    'FOUNDATIONAL_COURSES',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'CCPROG2',
    2022,
    '2023-600-000',
    '2023-10-10',
    '2023-10-17',
    'FOUNDATIONAL_COURSES',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'CCPROG3',
    2023,
    '2023-600-002',
    '2023-10-10',
    '2023-10-17',
    'FOUNDATIONAL_COURSES',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'CCDSALG',
    2023,
    '2023-600-003',
    '2023-10-10',
    '2023-10-17',
    'FOUNDATIONAL_COURSES',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'CCDSTRU',
    2022,
    '2023-600-004',
    '2023-10-10',
    '2023-10-17',
    'FOUNDATIONAL_COURSES',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);

-- Insert Module Enrollments
INSERT INTO public."Module_Enrollments" (
    student_id,
    module_name,
    school_year,
    status,
    bill_no,
    grade,
    date_submitted,
    date_received,
    no_of_absences,
    remarks,
    record,
    created_at,
    updated_at
)
VALUES
(
    '2023-000-000',
    'CCPROG1',
    2022,
    'PASSED',
    '1-000000001',
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2023-000-000',
    'CCPROG2',
    2022,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2023-000-000',
    'CCDSTRU',
    2022,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2023-000-001',
    'CCPROG1',
    2022,
    'IN_PROGRESS',
    '1-000000002',
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2023-000-002',
    'CCDSTRU',
    2022,
    'PASSED',
    '1-000000003',
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2023-000-000',
    'CCPROG3',
    2023,
    'PENDING_APPROVAL',
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);

-- Insert TOR Requests
INSERT INTO public."TOR_Requests" (
	req_id, 
	student_id, 
	status, 
	request_date, 
	created_at, 
	updated_at
)
VALUES (
	'2023-00000'::character varying, 
	'2023-000-000'::character varying, 
	'PENDING', 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);