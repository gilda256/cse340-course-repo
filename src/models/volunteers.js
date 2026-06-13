import db from './db.js';

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO public.volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, project_id) DO NOTHING
    RETURNING user_id, project_id, volunteered_at;
  `;
  const params = [userId, projectId];
  const result = await db.query(query, params);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM public.volunteers
    WHERE user_id = $1 AND project_id = $2;
  `;
  const params = [userId, projectId];
  const result = await db.query(query, params);
  return result.rowCount > 0;
};

const getUserVolunteerProjects = async (userId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.location,
      p.organization_id,
      o.name AS organization_name,
      v.volunteered_at
    FROM public.volunteers v
    JOIN public.project p
      ON v.project_id = p.project_id
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE v.user_id = $1
    ORDER BY p.project_date ASC;
  `;
  const params = [userId];
  const result = await db.query(query, params);
  return result.rows;
};

const isUserVolunteeringForProject = async (userId, projectId) => {
  const query = `
    SELECT 1
    FROM public.volunteers
    WHERE user_id = $1 AND project_id = $2
    LIMIT 1;
  `;
  const params = [userId, projectId];
  const result = await db.query(query, params);
  return result.rows.length > 0;
};

export {
  addVolunteer,
  removeVolunteer,
  getUserVolunteerProjects,
  isUserVolunteeringForProject
};