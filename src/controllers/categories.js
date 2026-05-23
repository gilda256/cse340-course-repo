// Import any needed model functions
import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId
} from '../models/categories.js';

// List all categories
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = 'Service Categories';

  res.render('categories', { title, categories });
};

// Show details for a single category
const showCategoryDetailsPage = async (req, res) => {
  const { id } = req.params;

  const category = await getCategoryById(id);
  if (!category) {
    return res.status(404).send('Category not found');
  }

  const projects = await getProjectsByCategoryId(id);
  const title = category.name;

  res.render('category', { title, category, projects });
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };