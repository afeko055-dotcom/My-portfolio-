import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectViewer } from './pages/ProjectViewer';
import { CategoryLab } from './pages/CategoryLab';
import { AdminDashboard } from './pages/AdminDashboard';
import { INITIAL_PROJECTS } from './data/initialProjects';
import { Project, CategoryId } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  // Synchronize browser history and route changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch projects from Express server
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          // Merge server projects with initial catalog
          const mergedMap = new Map<string, Project>();
          INITIAL_PROJECTS.forEach(p => mergedMap.set(p.id, p));
          data.projects.forEach((p: Project) => mergedMap.set(p.id, p));
          setProjects(Array.from(mergedMap.values()));
        }
      } catch (err) {
        // Fallback to INITIAL_PROJECTS
      }
    };
    loadProjects();
  }, []);

  // Track page view event on server
  useEffect(() => {
    try {
      fetch('/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'view', details: `Visited route: ${currentPath}` })
      }).catch(() => {});
    } catch (e) {}
  }, [currentPath]);

  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentPath(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Parser
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return <Home projects={projects} navigate={navigate} />;
    }

    if (currentPath === '/projects') {
      return <Projects projects={projects} navigate={navigate} />;
    }

    if (currentPath === '/admin') {
      return <AdminDashboard projects={projects} setProjects={setProjects} navigate={navigate} />;
    }

    if (currentPath.startsWith('/viewer/')) {
      const slug = currentPath.replace('/viewer/', '');
      return <ProjectViewer projectSlug={slug} projects={projects} navigate={navigate} />;
    }

    if (currentPath.startsWith('/projects/')) {
      const slug = currentPath.replace('/projects/', '');
      return <ProjectViewer projectSlug={slug} projects={projects} navigate={navigate} />;
    }

    // Category Routes
    const cleanCat = currentPath.replace('/', '') as CategoryId;
    const knownCategories = ['websites', 'apps', 'mobile', 'ai', 'saas', 'business-systems', 'games', 'tools', 'interactive', 'services', 'about', 'contact', 'privacy'];
    if (knownCategories.includes(cleanCat)) {
      return <CategoryLab category={cleanCat} projects={projects} navigate={navigate} />;
    }

    // Fallback to Home
    return <Home projects={projects} navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Hide Navbar and Footer ONLY on private admin screen if desired, or keep uniform layout without admin links */}
      <Navbar currentRoute={currentPath} navigate={navigate} />

      <main className="flex-1">
        {renderRoute()}
      </main>

      {currentPath !== '/admin' && <Footer navigate={navigate} />}
    </div>
  );
}
