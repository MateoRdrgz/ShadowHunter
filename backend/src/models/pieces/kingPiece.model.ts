import chessPieceModel from "../chessPiece.model";

import ChessPiece from "../chessPiece.model";

import chessPieceServices from "../../services/chessPiece.services";
import {gameService} from "../../services/game.services";

class KingPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KingPiece {
        return ChessPiece.createInstance("king", color, position, gameId) as KingPiece;
    }

    
    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        // Implémentation spécifique pour le roi
        //haut
        if(parseInt(this.position[1]) + 1 <= 8){
            slotsAvailable.push(`${this.position[0]}${parseInt(this.position[1]) + 1}`);
        }
        //bas
        if(parseInt(this.position[1]) - 1 >= 1){
            slotsAvailable.push(`${this.position[0]}${parseInt(this.position[1]) - 1}`);
        }
        //gauche
        if(this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1])}`);
        }
        //droite
        if(this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1])}`);
        }
        //haut gauche
        if(parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}`);
        }
        //haut droite
        if(parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}`);
        }
        //bas gauche
        if(parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) - 1 >= 97){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`);
        }
        //bas droite
        if(parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) + 1 <= 104){
            slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`);
        }
        //roque
        if(!this.has_moved){
            if(this.color == 'white'){
                if(await chessPieceServices.isChessPieceInPosition('e1', this.game_id)){
                    let kingPiece = await chessPieceServices.getChessPieceByPosition('e1', this.game_id);
                    if(kingPiece.piece_type == 'king' && !this.has_moved){
                        //grand roque
                        if(await chessPieceServices.isChessPieceInPosition('a1', this.game_id)){
                            let rookPiece = await chessPieceServices.getChessPieceByPosition('a1', this.game_id);
                            if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                if(!await chessPieceServices.isChessPieceInPosition('b1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d1', this.game_id)){
                                    slotsAvailable.push('c1');
                                }
                            }
                        }
                        //petit roque
                        if(await chessPieceServices.isChessPieceInPosition('h1', this.game_id)){
                            let rookPiece = await chessPieceServices.getChessPieceByPosition('h1', this.game_id);
                            if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                if(!await chessPieceServices.isChessPieceInPosition('f1', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g1', this.game_id)){
                                    slotsAvailable.push('g1');
                                }
                            }
                        }
                    }
                }
            }else{
                if(await chessPieceServices.isChessPieceInPosition('e8', this.game_id)){
                    let kingPiece = await chessPieceServices.getChessPieceByPosition('e8', this.game_id);
                    if(kingPiece.piece_type == 'king' && !this.has_moved){
                        console.log("1");
                        console.log(this.position);
                                if(await chessPieceServices.isChessPieceInPosition('a8', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('a8', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('b8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('c8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('d8', this.game_id)){
                                            slotsAvailable.push('c8');
                                        }
                                    }
                                }
                                if(await chessPieceServices.isChessPieceInPosition('h8', this.game_id)){
                                    let rookPiece = await chessPieceServices.getChessPieceByPosition('h8', this.game_id);
                                    if(rookPiece.piece_type == 'rook' && !rookPiece.has_moved){
                                        if(!await chessPieceServices.isChessPieceInPosition('f8', this.game_id) && !await chessPieceServices.isChessPieceInPosition('g8', this.game_id)){
                                            slotsAvailable.push('g8');
                                        }
                                    }

                        }
                    }
                }
            }
        }
        return slotsAvailable; 
    }


    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }

    public async roque(piece : ChessPiece ,position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(piece.game_id, piece.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        const oldPosition = piece.position;
        let slots = await piece.getSlotsAvailable();

        if(piece.color == 'white') {
            if (position == 'c1') {
                if (slots.includes(position)) {
                    piece.position = position;
                    piece.has_moved = true;
                    let rookPiece = await chessPieceServices.getChessPieceByPosition('a1', piece.game_id);
                    let oldRookPosition = rookPiece.position;
                    rookPiece.position = 'd1';
                    await gameService.nextTurnAfterRoque(piece.game_id, oldPosition, position, oldRookPosition, rookPiece.position);
                    await chessPieceServices.updateChessPiece(rookPiece.id, rookPiece.piece_type, rookPiece.color, rookPiece.position, rookPiece.game_id, rookPiece.has_moved);
                    await chessPieceServices.updateChessPiece(piece.id, piece.piece_type, piece.color, piece.position, piece.game_id, piece.has_moved);

                }
            }else if(position == 'g1') {
                if (slots.includes(position)) {
                    piece.position = position;
                    piece.has_moved = true;
                    let rookPiece = await chessPieceServices.getChessPieceByPosition('h1', piece.game_id);
                    let oldRookPosition = rookPiece.position;
                    rookPiece.position = 'f1';
                    await gameService.nextTurnAfterRoque(piece.game_id, oldPosition, position, oldRookPosition, rookPiece.position);
                    await chessPieceServices.updateChessPiece(rookPiece.id, rookPiece.piece_type, rookPiece.color, rookPiece.position, rookPiece.game_id, rookPiece.has_moved);
                    await chessPieceServices.updateChessPiece(piece.id, piece.piece_type, piece.color, piece.position, piece.game_id, piece.has_moved);
                }
            }
        }else {
            if (position == 'c8') {
                if (slots.includes(position)) {
                    piece.position = position;
                    piece.has_moved = true;
                    let rookPiece = await chessPieceServices.getChessPieceByPosition('a8', piece.game_id);
                    let oldRookPosition = rookPiece.position;
                    rookPiece.position = 'd8';
                    await gameService.nextTurnAfterRoque(piece.game_id, oldPosition, position, oldRookPosition, rookPiece.position);
                    await chessPieceServices.updateChessPiece(rookPiece.id, rookPiece.piece_type, rookPiece.color, rookPiece.position, rookPiece.game_id, rookPiece.has_moved);
                    await chessPieceServices.updateChessPiece(piece.id, piece.piece_type, piece.color, piece.position, piece.game_id, piece.has_moved);
                }
            }else if(position == 'g8') {
                if (slots.includes(position)) {
                    piece.position = position;
                    piece.has_moved = true;
                    let rookPiece = await chessPieceServices.getChessPieceByPosition('h8', piece.game_id);
                    let oldRookPosition = rookPiece.position;
                    rookPiece.position = 'f8';
                    await gameService.nextTurnAfterRoque(piece.game_id, oldPosition, position, oldRookPosition, rookPiece.position);
                    await chessPieceServices.updateChessPiece(rookPiece.id, rookPiece.piece_type, rookPiece.color, rookPiece.position, rookPiece.game_id, rookPiece.has_moved);
                    await chessPieceServices.updateChessPiece(piece.id, piece.piece_type, piece.color, piece.position, piece.game_id, piece.has_moved);
                }
            }
        }



    }



}

export default KingPiece;