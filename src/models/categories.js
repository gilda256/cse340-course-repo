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

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}
const createCategory = async (name) => {
  const query = `
    INSERT INTO category (name)
    VALUES ($1)
    RETURNING category_id;
  `;
  const result = await db.query(query, [name]);
  return result.rows[0].category_id;
};

const updateCategory = async (id, name) => {
  const query = `
    UPDATE category
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;
  const result = await db.query(query, [name, id]);
  return result.rows[0].category_id;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  updateCategoryAssignments,
  createCategory,
  updateCategory 
};