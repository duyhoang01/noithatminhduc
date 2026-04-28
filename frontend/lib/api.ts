import type {
  Province,
  Distributor,
  Package,
  PackageWithItems,
  Session,
  PatchLinesResponse,
  Variant,
} from './types';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001').replace(/\/+$/, '') + '/api';

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  provinces: () => req<Province[]>('/catalog/provinces'),

  distributors: (provinceId?: number) =>
    req<Distributor[]>(`/distributors${provinceId != null ? `?provinceId=${provinceId}` : ''}`),

  packages: (distributorId: string) =>
    req<Package[]>(`/packages?distributorId=${distributorId}`),

  packageItems: (packageId: string) =>
    req<PackageWithItems>(`/packages/${packageId}/items`),

  variants: (productId: string, distributorId: string) =>
    req<Variant[]>(`/catalog/products/${productId}/variants?distributorId=${distributorId}`),

  createSession: (body: { distributorId: string; packageId: string; propertyType: string }) =>
    req<Session>('/sessions', { method: 'POST', body: JSON.stringify(body) }),

  getSession: (id: string) => req<Session>(`/sessions/${id}`),

  updateLines: (
    sessionId: string,
    lines: Array<{ product_id: string; variant_id: string; quantity: number; unit_price: number }>,
  ) =>
    req<PatchLinesResponse>(`/sessions/${sessionId}/lines`, {
      method: 'PATCH',
      body: JSON.stringify({ lines }),
    }),

  confirmOrder: (sessionId: string) =>
    req<{ id: string }>('/orders/confirm', {
      method: 'POST',
      body: JSON.stringify({ sessionId }),
    }),
};
