import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="text-center py-24">
        <h1 className="text-6xl font-bold text-brand-600">404</h1>
        <p className="text-gray-500 mt-4">Page not found</p>
        <Link href="/" className="text-brand-600 underline mt-4 inline-block">Go home</Link>
      </div>
    </Layout>
  );
}