import db from './db.js';

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;

  const result = await db.query(query, [numberOfProjects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getAllProjects = async () => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM project
    ORDER BY project_date;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM project
    WHERE organization_id = $1
    ORDER BY project_date;
  `;

  const result = await db.query(query, [organizationId]);
  return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
    const query = `
      INSERT INTO project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

    const queryParams = [title, description, location, date, organizationId];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};
const updateProject = async (projectId, title, description, location, date, organizationId) => {
  const query = `
    UPDATE project
    SET 
      title = $1,
      description = $2,
      location = $3,
      project_date = $4,
      organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const result = await db.query(query, [title, description, location, date, organizationId, projectId]);

  if (result.rows.length === 0) {
    throw new Error('Project not found or could not be updated');
  }

  return result.rows[0].project_id;
};

export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject
};