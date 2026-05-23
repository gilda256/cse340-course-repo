import db from './db.js';

const getAllCategories = async () => {
  const query = `
    SELECT 
      category_id,
      name
    FROM public.category
    ORDER BY name;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getCategoryById = async (id) => {
  const query = `
    SELECT
      category_id,
      name
    FROM public.category
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM public.project_category pc
    JOIN public.category c
      ON pc.category_id = c.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await db.query(query, [projectId]);
  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.project_date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.project_category pc
    JOIN public.project p
      ON pc.project_id = p.project_id
    JOIN public.organization o
      ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date ASC;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId
};