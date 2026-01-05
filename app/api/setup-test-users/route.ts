import { pushTestCredentials } from '@/lib/push-test-credentials';

export async function GET() {
  try {
    const result = await pushTestCredentials();
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
