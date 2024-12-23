import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json({
        hello: 'world'
    });
}

export async function POST(request: Request) {
    return NextResponse.json({
        hello: 'world',
        method: 'POST'
    });
}