
DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       role VARCHAR(255) NOT NULL,
                       password VARCHAR(255) NOT NULL
);

-- ADDED 'status' column here
CREATE TABLE stories (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         sprint VARCHAR(255) NOT NULL,
                         story VARCHAR(255) NOT NULL,
                         story_points INT,
                         story_link VARCHAR(255),
                         department VARCHAR(255) NOT NULL,
                         status VARCHAR(50) NOT NULL,
                         start_date DATE,
                         end_date DATE,
                         review_date DATE,
                         comments TEXT,
                         assigned_to VARCHAR(255)
);

-- =============================================
-- 2. POPULATE USERS
-- =============================================
INSERT INTO users (username, role, password) VALUES
                                                 ('aarav', 'UX Developer', 'password123'),
                                                 ('priya', 'Frontend Developer', 'password123'),
                                                 ('rohan', 'Frontend Developer', 'password123'),
                                                 ('ananya', 'Frontend Developer', 'password123'),
                                                 ('vikram', 'Backend Developer', 'password123'),
                                                 ('sneha', 'Backend Developer', 'password123'),
                                                 ('arjun', 'Android Developer', 'password123'),
                                                 ('meera', 'iOS Developer', 'password123'),
                                                 ('karthik', 'QA Engineer', 'password123'),
                                                 ('pooja', 'QA Engineer', 'password123');


-- =============================================
-- 3. POPULATE STORIES (With mapped STATUS)
-- =============================================

-- =============================================
-- SPRINT 22 (Past - All COMPLETED)
-- =============================================
INSERT INTO stories (name, sprint, story, story_points, story_link, department, status, start_date, end_date, review_date, comments, assigned_to) VALUES
                                                                                                                                                      ('Setup Base Architecture', 'Sprint-22', 'Initialize Spring Boot and React repos.', 5, 'https://sb.com/1', 'Backend', 'COMPLETED', '2023-10-01', '2023-10-03', '2023-10-04', 'Done.', 'vikram'),
                                                                                                                                                      ('Database Design', 'Sprint-22', 'Design ER Diagram for Users and Stories.', 8, 'https://sb.com/2', 'Backend', 'COMPLETED', '2023-10-02', '2023-10-05', '2023-10-06', 'Schema approved.', 'sneha'),
                                                                                                                                                      ('UI Style Guide', 'Sprint-22', 'Define colors, typography and spacing.', 3, 'https://sb.com/3', 'UX', 'COMPLETED', '2023-10-01', '2023-10-02', '2023-10-03', 'Figma link updated.', 'aarav'),
                                                                                                                                                      ('Login Screen UI', 'Sprint-22', 'Create static login HTML/CSS.', 3, 'https://sb.com/4', 'Frontend', 'COMPLETED', '2023-10-03', '2023-10-06', '2023-10-07', 'Responsive issues fixed.', 'priya'),
                                                                                                                                                      ('Android Project Init', 'Sprint-22', 'Setup Gradle and basic Activity.', 2, 'https://sb.com/5', 'Android', 'COMPLETED', '2023-10-04', '2023-10-05', '2023-10-05', 'Done.', 'arjun'),
                                                                                                                                                      ('Test Strategy Doc', 'Sprint-22', 'Create master test plan.', 5, 'https://sb.com/6', 'QA', 'COMPLETED', '2023-10-05', '2023-10-08', '2023-10-09', 'Reviewed by lead.', 'karthik');

-- =============================================
-- SPRINT 23 (Past - All COMPLETED)
-- =============================================
INSERT INTO stories (name, sprint, story, story_points, story_link, department, status, start_date, end_date, review_date, comments, assigned_to) VALUES
                                                                                                                                                      ('Auth API', 'Sprint-23', 'JWT Token implementation.', 8, 'https://sb.com/7', 'Backend', 'COMPLETED', '2023-10-15', '2023-10-20', '2023-10-21', 'Security checks passed.', 'vikram'),
                                                                                                                                                      ('User CRUD API', 'Sprint-23', 'Create, Read, Update Delete users.', 5, 'https://sb.com/8', 'Backend', 'COMPLETED', '2023-10-16', '2023-10-19', '2023-10-20', 'Swagger docs updated.', 'sneha'),
                                                                                                                                                      ('Dashboard Layout', 'Sprint-23', 'Main dashboard skeleton with sidebar.', 5, 'https://sb.com/9', 'Frontend', 'COMPLETED', '2023-10-15', '2023-10-18', '2023-10-19', 'Used Material UI.', 'rohan'),
                                                                                                                                                      ('Connect API to UI', 'Sprint-23', 'Integrate Login API with React form.', 5, 'https://sb.com/10', 'Frontend', 'COMPLETED', '2023-10-19', '2023-10-22', '2023-10-23', 'Axios setup done.', 'ananya'),
                                                                                                                                                      ('iOS Login View', 'Sprint-23', 'SwiftUI Login Screen.', 3, 'https://sb.com/11', 'iOS', 'COMPLETED', '2023-10-16', '2023-10-18', '2023-10-19', 'Matches designs.', 'meera'),
                                                                                                                                                      ('Story Listing Page', 'Sprint-23', 'Grid view for stories.', 8, 'https://sb.com/12', 'Frontend', 'COMPLETED', '2023-10-20', '2023-10-26', '2023-10-27', 'Pagination added.', 'priya'),
                                                                                                                                                      ('Functional Testing Auth', 'Sprint-23', 'Test login scenarios (valid/invalid).', 3, 'https://sb.com/13', 'QA', 'COMPLETED', '2023-10-21', '2023-10-23', '2023-10-24', 'Found 2 bugs, resolved.', 'pooja'),
                                                                                                                                                      ('Wireframe Analytics', 'Sprint-23', 'Design charts for analytics page.', 5, 'https://sb.com/14', 'UX', 'COMPLETED', '2023-10-15', '2023-10-20', '2023-10-21', 'Approved.', 'aarav');

-- =============================================
-- SPRINT 24 (Current - Mix of IN_PROGRESS and COMPLETED)
-- =============================================
INSERT INTO stories (name, sprint, story, story_points, story_link, department, status, start_date, end_date, review_date, comments, assigned_to) VALUES
                                                                                                                                                      ('Payment Gateway Backend', 'Sprint-24', 'Integrate Stripe/Razorpay API.', 13, 'https://sb.com/15', 'Backend', 'IN_PROGRESS', '2023-11-01', NULL, NULL, 'Complex logic, ongoing.', 'vikram'),
                                                                                                                                                      ('Checkout UI', 'Sprint-24', 'Frontend payment modal.', 8, 'https://sb.com/16', 'Frontend', 'IN_PROGRESS', '2023-11-02', NULL, NULL, 'Waiting for backend endpoint.', 'rohan'),
                                                                                                                                                      ('Notifications System', 'Sprint-24', 'Websocket setup for alerts.', 5, 'https://sb.com/17', 'Backend', 'COMPLETED', '2023-11-01', '2023-11-05', NULL, 'Backend done, FE pending.', 'sneha'),
                                                                                                                                                      ('Notification UI Component', 'Sprint-24', 'Toast messages and notification bell.', 3, 'https://sb.com/18', 'Frontend', 'IN_PROGRESS', '2023-11-06', NULL, NULL, 'Started yesterday.', 'ananya'),
                                                                                                                                                      ('Mobile Push Notif', 'Sprint-24', 'Firebase setup for Android.', 5, 'https://sb.com/19', 'Android', 'COMPLETED', '2023-11-03', '2023-11-07', NULL, 'Certificate issue resolved.', 'arjun'),
                                                                                                                                                      ('iOS Biometrics', 'Sprint-24', 'FaceID integration.', 3, 'https://sb.com/20', 'iOS', 'COMPLETED', '2023-11-04', '2023-11-05', '2023-11-06', 'Completed early.', 'meera'),
                                                                                                                                                      ('Performance Testing', 'Sprint-24', 'JMeter load tests.', 5, 'https://sb.com/21', 'QA', 'IN_PROGRESS', '2023-11-08', NULL, NULL, 'Scripting phase.', 'karthik');

-- =============================================
-- SPRINT 25 (Future - All TODO)
-- =============================================
INSERT INTO stories (name, sprint, story, story_points, story_link, department, status, start_date, end_date, review_date, comments, assigned_to) VALUES
                                                                                                                                                      ('Admin Panel', 'Sprint-25', 'User management for admins.', 13, 'https://sb.com/22', 'Frontend', 'TODO', NULL, NULL, NULL, 'Refining requirements.', 'priya'),
                                                                                                                                                      ('Audit Logs', 'Sprint-25', 'Track who changed what.', 5, 'https://sb.com/23', 'Backend', 'TODO', NULL, NULL, NULL, 'Future work.', 'vikram'),
                                                                                                                                                      ('Dark Mode Mobile', 'Sprint-25', 'Dark theme for iOS and Android.', 8, 'https://sb.com/24', 'UX', 'TODO', NULL, NULL, NULL, 'Design phase.', 'aarav'),
                                                                                                                                                      ('Automated Reports', 'Sprint-25', 'Email weekly summary.', 5, 'https://sb.com/25', 'Backend', 'TODO', NULL, NULL, NULL, 'Cron job setup.', 'sneha');