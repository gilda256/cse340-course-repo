import db from './db.js';

const getAllProjects = async () => {
  const query = `
    SELECT 
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.project_date,
      o.organization_id,
      o.name AS organization_name
    FROM public.project AS p
    JOIN public.organization AS o
      ON p.organization_id = o.organization_id
    ORDER BY p.project_date, p.project_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

export { getAllProjects };