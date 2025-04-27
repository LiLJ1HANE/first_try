<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Récupère toutes les chambres
    public function index()
    {
        return Room::with('hotel')->get();
    }

    // Récupère une chambre spécifique
    public function show($id)
    {
        return Room::with('hotel')->findOrFail($id);
    }

    // Crée une nouvelle chambre
    public function store(Request $request)
    {
        $validated = $request->validate([
            'hotel_id' => 'required|exists:hotels,id',
            'room_number' => 'required|string|max:10',
            'type' => 'required|string|max:50',
            'price_per_night' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'amenities' => 'nullable|string'
        ]);

        $room = Room::create($validated);
        return response()->json($room, 201);
    }

    // Réserve une chambre
    public function reserve(Request $request, $id)
    {
        $validated = $request->validate([
            'check_in' => 'required|date',
            'check_out' => 'required|date|after:check_in',
            'guest_name' => 'required|string|max:100'
        ]);

        $room = Room::findOrFail($id);
        
        if (!$room->is_available) {
            return response()->json([
                'message' => 'Cette chambre n\'est pas disponible'
            ], 400);
        }

        $room->update(['is_available' => false]);
        
        return response()->json([
            'message' => 'Chambre réservée avec succès',
            'reservation' => $validated,
            'room' => $room
        ]);
    }
}