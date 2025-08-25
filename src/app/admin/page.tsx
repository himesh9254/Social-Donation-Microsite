import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to the static admin interface
  redirect('/admin/index.html');
}

