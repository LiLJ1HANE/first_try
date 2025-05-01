<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RoomController extends Controller
{
    /**
     * Get all rooms
     */
    public function index()
    {
        return Room::all();
    }

    /**
     * Get specific room
     */
    public function show($id)
    {
        return Room::findOrFail($id);
    }

    /**
     * Generate availability report
     */
    public function availabilityReport(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date'
        ]);

        $report = DB::table('rooms')
            ->join('bookings', function($join) use ($request) {
                $join->on('rooms.id', '=', 'bookings.room_id')
                    ->where('bookings.check_out', '>=', $request->start_date)
                    ->where('bookings.check_in', '<=', $request->end_date)
                    ->whereNotIn('bookings.status', ['cancelled', 'no-show']);
            })
            ->select(
                DB::raw('DATE(bookings.check_in) as date'),
                'rooms.type as room_type',
                DB::raw('COUNT(DISTINCT rooms.id) as total_rooms'),
                DB::raw('COUNT(DISTINCT bookings.id) as booked_rooms'),
                DB::raw('COUNT(DISTINCT rooms.id) - COUNT(DISTINCT bookings.id) as available_rooms'),
                DB::raw('ROUND((COUNT(DISTINCT bookings.id) * 100.0 / COUNT(DISTINCT rooms.id)), 2) as percentage_booked')
            )
            ->groupBy('date', 'room_type')
            ->orderBy('date')
            ->orderBy('room_type')
            ->get();

        return response()->json($report);
    }

    /**
     * Check specific room availability
     */
    public function checkAvailability($id, Request $request)
    {
        $request->validate([
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in'
        ]);

        $room = Room::findOrFail($id);
        $booked = Booking::where('room_id', $id)
            ->where('check_out', '>=', $request->check_in)
            ->where('check_in', '<=', $request->check_out)
            ->whereNotIn('status', ['cancelled', 'no-show'])
            ->count();

        return response()->json([
            'available' => $booked < $room->quantity,
            'available_rooms' => $room->quantity - $booked
        ]);
    }
}