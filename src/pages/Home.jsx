import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { Skills } from '../components/home/Skills';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { CTA } from '../components/home/CTA';

export const Home = () => {
  const { data: profileData, loading: profileLoading, error: profileError } = useFetch('api/profile.php');
  const { data: projectsData, loading: projectsLoading } = useFetch('api/projects.php?featured=1');
  const { data: skillsData, loading: skillsLoading } = useFetch('api/skills.php');

  if (profileLoading || skillsLoading || projectsLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a1a0f',
        color: '#00ff88',
        fontFamily: 'monospace',
        fontSize: '1.2rem'
      }}>
        <div className="logo-icon" style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid #00ff88',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          animation: 'pulse-glow 2s infinite',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>A</span>
        </div>
        <span>&gt; Cargando portfolio...</span>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="error-container" style={{
        margin: '150px auto',
        maxWidth: '600px',
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid rgba(0, 255, 136, 0.1)',
        borderRadius: '12px',
        backgroundColor: '#0f2318',
        color: '#e0f2e8'
      }}>
        <h2 style={{ color: '#00ff88', marginBottom: '1rem' }}>⚠️ Error al cargar datos</h2>
        <p style={{ color: '#6b9e7a', lineHeight: 1.6 }}>{profileError}</p>
      </div>
    );
  }

  const profile = profileData?.profile || {};
  const yearsExp = profileData?.years_exp ?? 0;
  const totalProjects = profileData?.total_projects ?? 0;
  const totalTech = profileData?.total_tech ?? 0;

  // Bio corta para el Hero (primeras 200 letras)
  const bio = profile.bio || '';
  const shortBio = bio.length > 200 ? `${bio.substring(0, 200)}...` : bio;

  return (
    <>
      <Hero
        name={profile.full_name}
        shortBio={shortBio}
        email={profile.email}
        yearsExp={yearsExp}
      />
      <About
        name={profile.full_name}
        bio={bio}
        location={profile.location}
        profileImg={profile.profile_image}
        yearsExp={yearsExp}
        totalProjects={totalProjects}
        totalTech={totalTech}
      />
      <Skills skills={skillsData?.skills || []} />
      <FeaturedProjects projects={projectsData?.projects || []} />
      <CTA email={profile.email} />
    </>
  );
};
export default Home;
