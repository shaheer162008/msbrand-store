import { pushProductsToFirebase } from '@/lib/push-data';

export async function GET() {
  try {
    const result = await pushProductsToFirebase();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
