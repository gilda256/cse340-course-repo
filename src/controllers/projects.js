import {
  getUpcomingProjects,
  getProjectDetails
} from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  const title = 'Upcoming Service Projects';

  res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
  const { id } = req.params;

  const project = await getProjectDetails(id);
  if (!project) {
    return res.status(404).send('Project not found');
  }

  const categories = await getCategoriesByProjectId(id);
  const title = project.title;

  res.render('project', { title, project, categories });
};

export { showProjectsPage, showProjectDetailsPage };