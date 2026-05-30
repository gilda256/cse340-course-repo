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