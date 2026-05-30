// Import any needed model functions
import { body, validationResult } from 'express-validator';
import {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  updateCategoryAssignments,
  createCategory,
   updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';


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
const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};
// Validation rules for category form
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters')
];

// Show New Category Form
const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

// Process New Category Form
const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect('/new-category');
  }

  const { name } = req.body;
  const categoryId = await createCategory(name);
  req.flash('success', 'Category created successfully!');
  res.redirect(`/category/${categoryId}`);
};

// Show Edit Category Form
const showEditCategoryForm = async (req, res) => {
  const { id } = req.params;
  const category = await getCategoryById(id);
  
  if (!category) {
    return res.status(404).send('Category not found');
  }

  const title = 'Edit Category';
  res.render('edit-category', { title, category });
};

// Process Edit Category Form
const processEditCategoryForm = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect(`/edit-category/${id}`);
  }

  const { name } = req.body;
  await updateCategory(id, name);
  req.flash('success', 'Category updated successfully!');
  res.redirect(`/category/${id}`);
};


// Export any controller functions
export { showCategoriesPage,
         showCategoryDetailsPage,
         showAssignCategoriesForm,
         processAssignCategoriesForm,
         showNewCategoryForm,
         processNewCategoryForm, 
         showEditCategoryForm,
         processEditCategoryForm,
         categoryValidation
           };