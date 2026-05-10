import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { getCurrentCenterId } from '@/lib/demo';
import { SESSION_PDFS_BUCKET, supabaseServer } from '@/lib/supabaseServer';

const SIGNED_URL_SECONDS = 300;

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const staffId = cookieStore.get('staff_Id')?.value;
    if (!staffId) {
      return NextResponse.json({ error: 'Staff ID not found in cookies' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exportId = searchParams.get('exportId')?.trim();
    if (!exportId) {
      return NextResponse.json({ error: 'exportId query parameter is required' }, { status: 400 });
    }

    const centerId = await getCurrentCenterId(cookieStore);
    const user = await prisma.user_info.findFirst({
      where: { staff_id: staffId, ...(centerId ? { center_id: centerId } : {}) },
      select: { user_id: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const exportRow = await prisma.approvalPdfExport.findFirst({
      where: {
        id: exportId,
        userId: user.user_id,
      },
      select: { id: true, filePath: true },
    });

    if (!exportRow?.filePath) {
      return NextResponse.json({ error: 'PDF export not found' }, { status: 404 });
    }

    const { data, error } = await supabaseServer.storage
      .from(SESSION_PDFS_BUCKET)
      .createSignedUrl(exportRow.filePath, SIGNED_URL_SECONDS);

    if (error || !data?.signedUrl) {
      console.error('[staff/pdf] signed URL error:', error?.message);
      return NextResponse.json({ error: 'Could not create download link' }, { status: 500 });
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
      expiresIn: SIGNED_URL_SECONDS,
      exportId: exportRow.id,
    });
  } catch (error) {
    console.error('[staff/pdf]', error);
    return NextResponse.json({ error: 'Failed to resolve PDF' }, { status: 500 });
  }
}
