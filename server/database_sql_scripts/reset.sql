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
DELETE FROM public."Tickets";

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
	'2024-900-000'::character varying, 
	'admin1@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2024-900-001'::character varying, 
	'admin2@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2024-900-002'::character varying, 
	'admin3@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2024-900-003'::character varying, 
	'admin4@cssweng.com'::character varying, 
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2024-900-004'::character varying, 
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
	'2024-600-000'::character varying, 
	'Emily'::character varying,
    'Grace'::character varying,
    'Smith'::character varying,
	'teacher1@cssweng.com'::character varying, 
	'ACTIVE',
	'$2a$10$.VfI5p0dmyX8yVQvoyeI3ORvP1F6QJ5.o//LeARUskA8gn7UIYP3m'::character varying, 
	CURRENT_TIMESTAMP,
	CURRENT_TIMESTAMP
),
(
	'2024-600-001'::character varying, 
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
	'2024-600-002'::character varying, 
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
	'2024-600-003'::character varying, 
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
	'2024-600-004'::character varying, 
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
	'2024-000-000'::character varying,
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
	'2024-000-001'::character varying,
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
	'2024-000-002'::character varying,
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
    'ACTIVE',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2024-000-003'::character varying,
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
    'ACTIVE',
    'TEACHER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
	'2024-000-004'::character varying,
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
    'ACTIVE',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    '2024-000-005'::character varying,
    'Alice'::character varying,
    'Smith'::character varying,
    'Johnson'::character varying,
    '123 Main St'::character varying,
    '09876543210'::character varying,
    '98765432'::character varying,
    'alice@student.com'::character varying,
    CURRENT_TIMESTAMP,
    'Cityville'::character varying,
    'American'::character varying,
    'FEMALE',
    'MARRIED',
    2,
     'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Church',
    'Pastor',
    true,
    'Elementary School'::character varying,
    'High School'::character varying,
    'University',
    'BS Computer Science',
    'Postgraduate'::character varying,
    'MS Computer Science',
    'Researcher',
    false,
    true,
    false,
    true,
    'A thought on technology'::character varying,
    'Bob Smith'::character varying,
    '456 Park Ave'::character varying,
    '08765432109',
    '$2a$10$AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'::character varying,
    'FOR_APPROVAL',
    'ADMIN',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    '2024-002-002'::character varying,
    'John'::character varying,
    'Doe'::character varying,
    'Williams'::character varying,
    '456 Oak St'::character varying,
    '01234567890'::character varying,
    '87654321'::character varying,
    'john.doe@email.com'::character varying,
    CURRENT_TIMESTAMP,
    'Hometown'::character varying,
    'Canadian'::character varying,
    'MALE',
    'SINGLE',
    1,
     'School'::character varying,
    'Occupation'::character varying,
    'Admin'::character varying,
    'Community Church',
    'Youth Pastor',
    false,
    'Primary School'::character varying,
    'Secondary School'::character varying,
    'Technical School',
    'Diploma in Data Science',
    'Undergraduate'::character varying,
    'BS Data Science',
    'Writer'::character varying,
    true,
    false,
    true,
    false,
    'Exploring data trends'::character varying,
    'Sarah Doe'::character varying,
    '789 Pine Ln'::character varying,
    '06543210987',
    '$2a$10$ZaYbXcWvUtRs1234567890'::character varying,
    'FOR_APPROVAL',
    'TEACHER',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Insert Module Names
INSERT INTO public."Module_Names" (
    module_name
)
VALUES
(
    'Child and Development'::character varying
),
(
    'Assessment of Learning and Development'::character varying
),
(
    'Philosophical Foundations in ECE'::character varying
),
(
    'Curriculum in ECE'::character varying
),
(
    'Developmental Reading'::character varying
),
(
    'Application of Teaching Principles in Classroom Management'::character varying
),
(
    'Practicum 1'::character varying
),
(
    'Bible Introduction'::character varying
),
(
    'Spiritual Formation'::character varying
),
(
    'Holistic and Transformational Ministry'::character varying
),
(
    'Operation & Management'::character varying
),
(
    'Strategic Planning'::character varying
),
(
    'Practicum 2'::character varying
);


-- Insert Module Details
INSERT INTO public."Module_Details" (
    module_name,
    prerequisites,
    program,
    description
)
VALUES 
(
    'Child and Development'::character varying,
    '{}',
    'FOUNDATIONAL_COURSES',
    'This is a two-day module that focuses on the application of child development theories to the different domains of development (physical, cognitive, social, and emotional). This module will equip child workers/early childhood educators as they work with young children.'
),
(
    'Assessment of Learning and Development'::character varying,
    '{}',
    'FOUNDATIONAL_COURSES',
    'This module aims to define assessment within the context of early childhood education. It also deals with evaluation strategies and methods that can achieve the function and purpose of the assessment.'
),
(
    'Philosophical Foundations in ECE'::character varying,
    '{}',
    'FOUNDATIONAL_COURSES',
    'The module discusses the philosophical theories that have created an impact on the design and structure of early childhood education programs and curricula.'
),
(
    'Curriculum in ECE'::character varying,
    '{}',
    'FOUNDATIONAL_COURSES',
    'This module will cover curriculum models, and strategies for planning and implementing a developmentally appropriate curriculum in various early childhood settings.'
),
(
    'Bible Introduction'::character varying,
    '{}',
    'BIBLICAL_FOUNDATION',
    'This module provides the student with a survey of the background and basic contents of the bible. It also includes the examination of the theological content and its relevance in one’s spiritual formation and socio-cultural context.'
),
(
    'Spiritual Formation'::character varying,
    '{}',
    'BIBLICAL_FOUNDATION',
    'This module focuses on developing a Christian Hermeneutic to human life on earth, giving special attention to the formation, growth, and development of one’s new being in Christ through the presence and ministry of the Holy Spirit. It attempts to help participants to flourish toward full maturity in all dimensions of life in becoming Christ-like educators for children.'
),
(
    'Holistic and Transformational Ministry'::character varying,
    '{}',
    'BIBLICAL_FOUNDATION',
    'The Holistic and Transformational Ministry module deal with the principles and methodologies of ministry allowing the students to participate in a journey of understanding in the context of early childhood education. Emphasis will fall on the transformational aspect of doing ministry in order that the student can appropriately and relevantly communicate God’s word and transform lives.'
),
(
    'Developmental Reading'::character varying,
    '{}',
    'TEACHER_TRACK',
    'This module will help child workers and child educators understand how children develop and use language as they grow; help them plan and implement appropriate early literacy experiences to develop the child’s receptive (listening and reading) and expressive (speaking and writing) language skills.'
),
(
    'Application of Teaching Principles in Classroom Management'::character varying,
    '{}',
    'TEACHER_TRACK',
    'The course of classroom management is an application of one’s philosophy and principles of teaching. This includes techniques in managing, equipping, and structuring the classroom, and most importantly, the discipline, care, and attention needed by children in a learning environment.'
),
(
    'Practicum 1'::character varying,
    '{}',
    'FOUNDATIONAL_COURSES',
    'This is a 35-hour practicum course. It is divided into different sessions such as the following: Class hours and scheduled consultation with the Facilitator (10 hours); Observation (3 hours); Preparation of Instructional Materials (5 hours); Actual Practice Teaching (12 hours); Meeting with Cooperating teacher (5 hours).'
),
(
    'Operation & Management'::character varying,
    '{}',
    'ADMIN_TRACK',
    'This module will discuss the principle and procedures necessary for the operation and management of an early childhood care and development program.'
),
(
    'Strategic Planning'::character varying,
    '{}',
    'ADMIN_TRACK',
    'This module will equip the Child Worker/ Child Educators or Program Managers on how to identify organizational strengths, weaknesses, opportunities, and threats (SWOT). Thereafter, the identified SWOT’s are analyzed in aid of crafting strategies to achieve organizational targets in general and Early Childhood Care and Development objectives in particular. The identified strategies are further translated into specific Action Plans with defined timelines of implementation. Studies are also cautioned to use SWOT  analysis in conjunction with other organizational analysis techniques.'
),
(
    'Practicum 2'::character varying,
    '{}',
    'ADMIN_TRACK',
    'This is a 35-hour practicum course. It is divided into different sessions such as the following: Class hours and scheduled consultation with Facilitator (10 hours); Observation (3 hours); Practice (12 hours); Meeting with Cooperating Administrator (5 hours).'
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
    '2024-000-000',
    'FULLY_PAID',
    'Received on 2024-10-10',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    '1-000000002',
    1000.00,
    0.00,
    '2024-000-001',
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
    '2024-000-002',
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
    '2024-000-003',
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
    '2024-000-004',
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
    '2024-000-000',
    1000.00,
    'Deducted 50%',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000002',
    '1-000000002',
    '2024-000-001',
    700.00,
    'First payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000003',
    '1-000000002',
    '2024-000-001',
    300.00,
    'Second payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000004',
    '1-000000003',
    '2024-000-002',
    1200.00,
    'First payment',
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '1-000000005',
    '1-000000004',
    '2024-000-003',
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
    created_at,
    updated_at
)
VALUES
(
    'Child and Development',
    2023,
    '2024-600-001',
    '2023-09-09',
    '2023-09-23',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Assessment of Learning and Development',
    2023,
    '2024-600-000',
    '2023-10-07',
    '2023-10-21',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Philosophical Foundations in ECE',
    2023,
    '2024-600-000',
    '2023-11-04',
    '2023-11-18',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Curriculum in ECE',
    2023,
    '2024-600-001',
    '2023-01-13',
    '2023-01-27',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    'Developmental Reading',
    2023,
    '2024-600-002',
    '2023-02-10',
    '2023-02-24',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Application of Teaching Principles in Classroom Management',
    2023,
    '2024-600-002',
    '2023-03-16',
    '2023-04-06',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Practicum 1',
    2023,
    '2024-600-002',
    '2023-04-20',
    '2023-04-20',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Bible Introduction',
    2023,
    '2024-600-003',
    '2023-05-04',
    '2023-05-18',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Spiritual Formation',
    2023,
    '2024-600-003',
    '2023-06-01',
    '2023-06-15',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Holistic and Transformational Ministry',
    2023,
    '2024-600-003',
    '2023-06-29',
    '2023-07-13',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Operation & Management',
    2023,
    '2024-600-004',
    '2023-07-27',
    '2023-08-10',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Strategic Planning',
    2023,
    '2024-600-004',
    '2023-08-24',
    '2023-09-07',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    'Practicum 2',
    2023,
    '2024-600-004',
    '2023-09-21',
    '2023-09-21',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    'Child and Development',
    2024,
    '2024-600-001',
    '2024-09-09',
    '2024-09-23',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Assessment of Learning and Development',
    2024,
    '2024-600-000',
    '2024-10-07',
    '2024-10-21',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Philosophical Foundations in ECE',
    2024,
    '2024-600-000',
    '2024-11-04',
    '2024-11-18',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Curriculum in ECE',
    2024,
    '2024-600-001',
    '2024-01-13',
    '2024-01-27',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    'Developmental Reading',
    2024,
    '2024-600-002',
    '2024-02-10',
    '2024-02-24',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Application of Teaching Principles in Classroom Management',
    2024,
    '2024-600-002',
    '2024-03-16',
    '2024-04-06',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Practicum 1',
    2024,
    '2024-600-002',
    '2024-04-20',
    '2024-04-20',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Bible Introduction',
    2024,
    '2024-600-003',
    '2024-05-04',
    '2024-05-18',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Spiritual Formation',
    2024,
    '2024-600-003',
    '2024-06-01',
    '2024-06-15',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Holistic and Transformational Ministry',
    2024,
    '2024-600-003',
    '2024-06-29',
    '2024-07-13',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Operation & Management',
    2024,
    '2024-600-004',
    '2024-07-27',
    '2024-08-10',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
), 
(
    'Strategic Planning',
    2024,
    '2024-600-004',
    '2024-08-24',
    '2024-09-07',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    'Practicum 2',
    2024,
    '2024-600-004',
    '2024-09-21',
    '2024-09-21',
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
    created_at,
    updated_at
)
VALUES
(
    '2024-000-000',
    'Child and Development',
    2024,
    'PASSED',
    '1-000000001',
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-000',
    'Assessment of Learning and Development',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-000',
    'Philosophical Foundations in ECE',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-000',
    'Curriculum in ECE',
    2024,
    'IN_PROGRESS',
    '1-000000002',
    '2.0',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-001',
    'Curriculum in ECE',
    2024,
    'IN_PROGRESS',
    '1-000000004',
    'INC',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Child and Development',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Assessment of Learning and Development',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Philosophical Foundations in ECE',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Curriculum in ECE',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Developmental Reading',
    2024,
    'IN_PROGRESS',
    null,
    '3.0',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Application of Teaching Principles in Classroom Management',
    2024,
    'IN_PROGRESS',
    null,
    '1.5',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-002',
    'Practicum 1',
    2024,
    'IN_PROGRESS',
    null,
    '2.25',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Child and Development',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Assessment of Learning and Development',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Philosophical Foundations in ECE',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Curriculum in ECE',
    2024,
    'PASSED',
    null,
    '1.00',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Strategic Planning',
    2024,
    'IN_PROGRESS',
    null,
    '2.25',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Operation & Management',
    2024,
    'IN_PROGRESS',
    null,
    '2.25',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-003',
    'Practicum 2',
    2024,
    'IN_PROGRESS',
    null,
    '2.25',
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-004',
    'Bible Introduction',
    2024,
    'IN_PROGRESS',
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-004',
    'Spiritual Formation',
    2024,
    'IN_PROGRESS',
    null,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP,
    0,
    null,
    CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
    '2024-000-004',
    'Holistic and Transformational Ministry',
    2024,
    'IN_PROGRESS',
    null,
    null,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP,
    0,
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
	'2024-00001'::character varying, 
	'2024-000-001'::character varying, 
	'PENDING', 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
),
(
	'2024-00000'::character varying, 
	'2024-000-000'::character varying, 
	'PENDING', 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP, 
	CURRENT_TIMESTAMP
);

