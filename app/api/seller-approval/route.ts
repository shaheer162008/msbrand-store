import { NextRequest, NextResponse } from 'next/server';
import { approveSeller, rejectSeller, getPendingSellers, getSellerApprovalStats } from '@/lib/seller-approval-service';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

/**
 * GET /api/seller-approval - Get pending sellers and approval stats
 * POST /api/seller-approval - Approve or reject a seller
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    // Check if user is admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    if (action === 'stats') {
      const stats = await getSellerApprovalStats();
      return NextResponse.json(stats);
    }

    // Get all pending sellers
    const pendingSellers = await getPendingSellers();
    return NextResponse.json({
      pendingSellers,
      total: pendingSellers.length,
    });
  } catch (error) {
    console.error('Error in seller approval GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pending sellers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, reason } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, action' },
        { status: 400 }
      );
    }

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be approve or reject' },
        { status: 400 }
      );
    }

    // Check if user is admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Verify seller exists
    const sellerRef = ref(db, `sellers/${userId}`);
    const sellerSnapshot = await get(sellerRef);
    
    if (!sellerSnapshot.exists()) {
      return NextResponse.json(
        { error: 'Seller not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      await approveSeller(userId);
      
      // TODO: Send approval email to seller
      // await sendApprovalEmail(sellerSnapshot.val().email);

      return NextResponse.json({
        success: true,
        message: 'Seller approved successfully',
        userId,
      });
    } else if (action === 'reject') {
      if (!reason || !reason.trim()) {
        return NextResponse.json(
          { error: 'Rejection reason is required' },
          { status: 400 }
        );
      }

      await rejectSeller(userId, reason);

      // TODO: Send rejection email to seller
      // await sendRejectionEmail(sellerSnapshot.val().email, reason);

      return NextResponse.json({
        success: true,
        message: 'Seller rejected',
        userId,
        reason,
      });
    }
  } catch (error) {
    console.error('Error in seller approval POST:', error);
    return NextResponse.json(
      { error: 'Failed to process seller approval' },
      { status: 500 }
    );
  }
}
