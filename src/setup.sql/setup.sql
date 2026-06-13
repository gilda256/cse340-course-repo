-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Sample data: Organizations
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- ========================================
-- Project Table
-- ========================================
CREATE TABLE public.project (
  project_id      SERIAL PRIMARY KEY,
  organization_id INTEGER NOT NULL,
  title           VARCHAR(150) NOT NULL,
  description     TEXT NOT NULL,
  location        VARCHAR(150) NOT NULL,
  project_date    DATE NOT NULL,
  CONSTRAINT fk_project_organization
    FOREIGN KEY (organization_id)
    REFERENCES public.organization (organization_id)
    ON DELETE CASCADE
);

INSERT INTO public.project
  (organization_id, title, description, location, project_date)
VALUES
  (1, 'Food Drive Downtown', 'Collect and distribute food to low-income families.', 'Downtown Center', '2025-06-01'),
  (1, 'Park Cleanup', 'Clean up trash and plant flowers in the city park.', 'Central Park', '2025-06-15'),
  (1, 'Senior Home Visit', 'Visit and assist residents in the senior home.', 'Sunrise Senior Home', '2025-07-01'),
  (1, 'School Supplies Drive', 'Collect supplies for local elementary schools.', 'Community Hall', '2025-07-10'),
  (1, 'Blood Donation Camp', 'Organize a blood donation event.', 'City Hospital', '2025-07-20'),

  (2, 'Beach Cleanup', 'Remove trash and debris from the beach.', 'Lakeside Beach', '2025-06-05'),
  (2, 'Tree Planting', 'Plant trees in deforested areas.', 'North Hills', '2025-06-20'),
  (2, 'Community Garden', 'Build and maintain a community garden.', 'Greenwood Community Center', '2025-07-05'),
  (2, 'Library Reading Program', 'Read with children at the public library.', 'City Library', '2025-07-15'),
  (2, 'Winter Clothing Drive', 'Collect coats and blankets for the homeless.', 'Downtown Shelter', '2025-08-01'),

  (3, 'Hospital Volunteer Day', 'Assist staff and patients at the local hospital.', 'General Hospital', '2025-06-10'),
  (3, 'Refugee Support Workshop', 'Provide language and job training.', 'Hope Center', '2025-06-25'),
  (3, 'Neighborhood Cleanup', 'Clean streets and public spaces.', 'Eastside Neighborhood', '2025-07-08'),
  (3, 'Youth Mentoring', 'Mentor at-risk youth.', 'Youth Center', '2025-07-18'),
  (3, 'Elderly Care Packages', 'Prepare and deliver care packages.', 'Various Homes', '2025-08-05');

-- ========================================
-- Category Tables
-- ========================================
CREATE TABLE public.category (
  category_id SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE public.project_category (
  project_id  INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (project_id, category_id),
  CONSTRAINT fk_pc_project
    FOREIGN KEY (project_id)
    REFERENCES public.project (project_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_pc_category
    FOREIGN KEY (category_id)
    REFERENCES public.category (category_id)
    ON DELETE CASCADE
);

INSERT INTO public.category (name)
VALUES
  ('Environment'),
  ('Community'),
  ('Health'),
  ('Education');

INSERT INTO public.project_category (project_id, category_id) VALUES
  (1, 2),
  (2, 1),
  (3, 3),
  (4, 4),
  (5, 3),
  (6, 1),
  (7, 1),
  (8, 2),
  (9, 4),
  (10, 3),
  (11, 3),
  (12, 2),
  (13, 2),
  (14, 4),
  (15, 3);

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- Insert initial roles
INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

-- Verify roles
SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user 
INSERT INTO users (name, email, password_hash, role_id) 
VALUES ('testuser', 'test@example.com', 'placeholder_hash', 1);

-- Join users and roles to see complete information
SELECT u.user_id, u.name, u.email, r.role_name, r.role_description
FROM users u
JOIN roles r ON u.role_id = r.role_id;

-- Delete the test user
DELETE FROM users WHERE email = 'test@example.com';

-- Volunteers Table
CREATE TABLE public.volunteers (
    user_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    volunteered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id), 
    CONSTRAINT fk_volunteers_user
        FOREIGN KEY (user_id)
        REFERENCES public.users (user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_volunteers_project
        FOREIGN KEY (project_id)
        REFERENCES public.project (project_id)
        ON DELETE CASCADE
);