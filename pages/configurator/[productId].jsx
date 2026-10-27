import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Layout from '@/components/layout/Layout';
import Spinner from '@/components/ui/Spinner';
import { useProduct } from '@/hooks/useProduct';
import { setProduct } from '@/store/configuratorSlice';
import { computeTotalPrice } from '@/lib/pricing';
import { BabylonProvider } from '@/components/babylon/BabylonProvider';
import PartSelector from '@/components/configurator/PartSelector';
import MaterialSelector from '@/components/configurator/MaterialSelector';
import PriceDisplay from '@/components/configurator/PriceDisplay';
import SaveConfigButton from '@/components/configurator/SaveConfigButton';
import RecommendationPanel from '@/components/ai/RecommendationPanel';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';
import { pushToast } from '@/store/uiSlice';

const BabylonCanvas = dynamic(() => import('@/components/babylon/BabylonCanvas'), { ssr: false });
const ProductModel = dynamic(() => import('@/components/babylon/ProductModel'), { ssr: false });
const CameraControls = dynamic(() => import('@/components/babylon/CameraControls'), { ssr: false });
const Lighting = dynamic(() => import('@/components/babylon/Lighting'), { ssr: false });
const LoadingOverlay = dynamic(() => import('@/components/babylon/LoadingOverlay'), { ssr: false });

export default function Configurator() {
  const router = useRouter();
  const { productId } = router.query;
  const { product, loading } = useProduct(productId);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [selections, setSelections] = useState({});
  const [activePart, setActivePart] = useState(null);

  useEffect(() => {
    if (!product) return;
    dispatch(setProduct(product));
    const initial = {};
    product.parts.forEach((p) => {
      if (p.materials[0]) {
        initial[p.name] = { material: p.materials[0].name, color: p.materials[0].color };
      }
    });
    setSelections(initial);
    setActivePart(product.parts[0]?.name || null);
  }, [product, dispatch]);

  if (loading) {
    return <Layout><div className="flex justify-center py-20"><Spinner /></div></Layout>;
  }
  if (!product) {
    return <Layout><div className="text-center py-20 text-gray-500">Product not found</div></Layout>;
  }

  const active = product.parts.find((p) => p.name === activePart);
  const total = computeTotalPrice(product, selections);

  const chooseMaterial = (mat) => {
    setSelections((prev) => ({
      ...prev,
      [activePart]: { material: mat.name, color: mat.color },
    }));
  };

  const save = async (name) => {
    if (!user) {
      dispatch(pushToast('Log in to save configurations', 'error'));
      return;
    }
    try {
      const res = await api.post('/api/configurations', {
        productId: product._id,
        selections,
        name,
      });
      dispatch(pushToast('Configuration saved!', 'success'));
      router.push('/dashboard');
    } catch (e) {
      dispatch(pushToast(e.message, 'error'));
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        <div className="lg:col-span-2 bg-white rounded-2xl border overflow-hidden relative">
          <BabylonProvider>
            <BabylonCanvas>
              <LoadingOverlay />
            </BabylonCanvas>
            <ProductModel modelFile={product.modelFile} selections={selections} />
            <CameraControls />
            <Lighting />
          </BabylonProvider>
        </div>

        <div className="bg-white rounded-2xl border p-5 overflow-y-auto">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.description}</p>

          <div className="mb-4">
            <h2 className="text-sm font-semibold mb-2">Customize</h2>
            <PartSelector parts={product.parts} activePart={activePart} onChange={setActivePart} />
          </div>

          {active && (
            <div className="mb-4">
              <h3 className="text-xs uppercase text-gray-500 mb-2">{active.name} material</h3>
              <MaterialSelector
                part={active}
                onSelect={chooseMaterial}
                active={selections[active.name]?.material}
              />
            </div>
          )}

          <PriceDisplay price={total} />
          <div className="mt-4">
            <SaveConfigButton onSave={save} />
          </div>

          <RecommendationPanel productId={product._id} selections={selections} />
        </div>
      </div>
    </Layout>
  );
}