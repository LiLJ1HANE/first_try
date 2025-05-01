<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Importer le modèle User
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request)
    {
        // Valider les champs envoyés par le frontend
        $incomingFields = $request->validate([
            'loginnom' => 'required|string',
            'loginmot_de_passe' => 'required|string'
        ]);

        // Vérifier les informations d'identification
        if (auth()->attempt([
            'name' => $incomingFields['loginnom'],
            'password' => $incomingFields['loginmot_de_passe']
        ])) {
            // Si l'authentification réussit
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Connexion réussie',
                'user' => auth()->user()
            ], 200);
        }

        // Si l'authentification échoue
        return response()->json([
            'message' => 'Nom d\'utilisateur ou mot de passe incorrect'
        ], 401);
    }

    public function register(Request $request)
    {
        // Valider les données envoyées par le frontend
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed' // Vérifie que password_confirmation correspond
        ]);

        // Créer un nouvel utilisateur
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']) // Hacher le mot de passe
        ]);

        // Retourner une réponse JSON
        return response()->json([
            'message' => 'Utilisateur créé avec succès',
            'user' => $user
        ], 201);
    }
}
