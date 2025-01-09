import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Player } from "../models/player";

@Injectable({
	providedIn: "root",
})
export class PlayerService {
	// Skapar en "BehaviorSubject" som håller reda på den aktuella spelaren
	private currentPlayerSubject = new BehaviorSubject<Player | null>(
		// Här hämtas spelaren från local storage som en "fallback"
		this.loadPlayerFromLocalStorage()
	);
	// Skapar en "Observable" som andra komponenter kan prenumerera på
	// för att få uppdateringar om spelaren
	get currentPlayer(): Observable<Player | null> {
		return this.currentPlayerSubject.asObservable();
	}
	// Skapar en ny spelare och sparar spelaren i local storage
	createPlayer(playerData: Player): void {
		this.currentPlayerSubject.next(playerData);
		localStorage.setItem("player", JSON.stringify(playerData));
	}
	// Hämmtar spelaren från local storage
	private loadPlayerFromLocalStorage(): Player | null {
		const playerData = localStorage.getItem("player");
		return playerData ? JSON.parse(playerData) : null;
	}
}
