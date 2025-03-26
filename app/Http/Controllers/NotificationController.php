<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Notifications/Index', [
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(Request $request, Notification $notification)
    {
        if ($notification->user_id !== auth()->id()) {
            return back()->with('error', 'Unauthorized');
        }

        $notification->update(['is_read' => true]);

        // Return Inertia redirect with refresh of props
        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->back()->with('message', 'Notification marked as read');
    }

    public function markAllAsRead(Request $request)
    {
        auth()->user()->notifications()
            ->where('is_read', false)
            ->update(['is_read' => true]);

        // Return Inertia redirect with refresh of props
        if ($request->wantsJson()) {
            return response()->json(['success' => true]);
        }

        return redirect()->back()->with('message', 'All notifications marked as read');
    }

    public function getUnreadCount()
    {
        $count = auth()->user()->notifications()
            ->where('is_read', false)
            ->count();

        return response()->json(['count' => $count]);
    }
}
