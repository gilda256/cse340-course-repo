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
  (1, 2),  -- Food Drive Downtown - Community
  (2, 1),  -- Park Cleanup - Environment
  (3, 3),  -- Senior Home Visit - Health
  (4, 4),  -- School Supplies Drive - Education
  (5, 3),  -- Blood Donation - Health

  (6, 1),  -- Beach Cleanup - Environment
  (7, 1),  -- Tree Planting - Environment
  (8, 2),  -- Community Garden - Community
  (9, 4),  -- Library Reading Program - Education
  (10, 3), -- Winter Clothing Drive - Health

  (11, 3), -- Hospital Volunteer Day - Health
  (12, 2), -- Refugee Support Workshop - Community
  (13, 2), -- Neighborhood Cleanup - Community
  (14, 4), -- Youth Mentoring - Education
  (15, 3); -- Elderly Care Packages - Health

