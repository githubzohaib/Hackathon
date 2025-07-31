// src/pages/StudentDashboard.tsx
import { useAuth } from '@/contexts/AuthContext';

export default function StudentDashboard() {
  const { currentUser, role } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <p>Welcome {currentUser?.displayName || 'Student'}!</p>
      <div className="mt-4">
        {/* Student-specific content */}
      </div>
    </div>
  );
}