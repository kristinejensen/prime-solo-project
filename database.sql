CREATE TABLE volunteers (
	id SERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL,
	email VARCHAR(120) NOT NULL,
	linkedin VARCHAR(120),
	bio VARCHAR(800)

);

CREATE TABLE skills (
	id SERIAL PRIMARY KEY,
	skill VARCHAR(120) NOT NULL,
	volunteer_id integer REFERENCES volunteers
);

CREATE TABLE availability (
	id SERIAL PRIMARY KEY,
	morning BOOLEAN DEFAULT false,
	afternoon BOOLEAN DEFAULT false,
	evening BOOLEAN DEFAULT false,
	weekdays BOOLEAN DEFAULT false,
	weekends BOOLEAN DEFAULT false,
	open BOOLEAN DEFAULT false,
	volunteer_id integer REFERENCES volunteers
);

CREATE TABLE causes (
	id SERIAL PRIMARY KEY,
	cause VARCHAR(120) NOT NULL,
	volunteer_id integer REFERENCES volunteers
);

INSERT INTO causes (id, cause)
VALUES (2, 'Arts'),
(3, 'Community Organizing'),
(4, 'Crisis Assistance'),
(5, 'Education'),
(6, 'Employment Services'),
(7, 'Environment'),
(8, 'Housing'),
(9, 'Hunger'),
(10, 'Legal Services'),
(11, 'LGTBQ'),
(12, 'Literacy'),
(13, 'Medicine'),
(14, 'People with Disabilities'),
(15, 'Public Health'),
(16, 'Racial Equity'),
(17, 'Seniors'),
(18, 'Social Services'),
(19, 'Technology'),
(20, 'Veterans Affairs'),
(21, 'Rights for Women'),
(22, 'Youth Development');

INSERT INTO skills (id, skill)
VALUES (1, 'Accounting'),
(2, 'Board Relations'),
(3, 'Budgeting'),
(4, 'Communications'),
(5, 'Community Outreach'),
(6, 'Database Management'),
(7, 'Design'),
(8, 'Employee Relations'),
(9, 'Event Planning'),
(10, 'Finance'),
(11, 'Fundraising'),
(12, 'Governance'),
(13, 'Grant Writing'),
(14, 'Human Resources'),
(15, 'Language Skills: Amharic'),
(16, 'Language Skills: Arabic'),
(17, 'Language Skills: French'),
(18, 'Language Skills: Hmong'),
(19, 'Language Skills: Karen'),
(20, 'Language Skills: Other'),
(21, 'Language Skills: Spanish'),
(22, 'Leadership'),
(23, 'Legal'),
(24, 'Legislative Research/Policy'),
(25, 'Management'),
(26, 'Media Relations'),
(27, 'Medicine'),
(28, 'Mental Health'),
(29, 'Operations'),
(30, 'Organizational Development'),
(31, 'Partnership Building'),
(33, 'Planning'),
(34, 'Project Management'),
(35, 'Public Speaking'),
(36, 'Relationship Management'),
(37, 'Research'),
(38, 'Social Services'),
(39, 'Stakeholder Outreach'),
(40, 'Statistics'),
(41, 'Strategic Planning'),
(42, 'Technology'),
(43, 'Video Editing'),
(44, 'Volunteer Administration'),
(45, 'Web Content Management'),
(46, 'Writing/Editing');

INSERT INTO volunteers (id, name, email, linkedin, bio)
VALUES (1, 'Kris Jensen', 'kristine.b.jensen@gmail.com', 'www.linkedin.com', 'I am cool!');

INSERT INTO volunteers (id, name, email, linkedin, bio)
VALUES (2, 'Kristine Jensen', 'peacefulmountain2@gmail.com', 'www.linkedin.com', 'I am cool, too!');

SELECT *
FROM skills
JOIN volunteers ON volunteers.id=skills.volunteer_id;

SELECT *
FROM causes
JOIN volunteers ON volunteers.id=causes.volunteer_id;
