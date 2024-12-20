import chessPieceModel from "../chessPiece.model";
import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class RookPiece extends chessPieceModel {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): RookPiece {
        return ChessPiece.createInstance("rook", color, position, gameId) as RookPiece;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        // Implémentation spécifique pour la tour
        //haut
        for(let i = parseInt(this.position[1]) + 1; i <= 8; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //bas
        for(let i = parseInt(this.position[1]) - 1; i >= 1; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${this.position[0]}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${this.position[0]}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${i}`, this.game_id)){
                break;
            }
        }
        //gauche
        for(let i = this.position[0].charCodeAt(0) - 1; i >= 97; i--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        //droite
        for(let i = this.position[0].charCodeAt(0) + 1; i <= 104; i++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(i)}${parseInt(this.position[1])}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(i)}${parseInt(this.position[1])}`, this.game_id)){
                break;
            }
        }
        return slotsAvailable;
    }


}

export default RookPiece;