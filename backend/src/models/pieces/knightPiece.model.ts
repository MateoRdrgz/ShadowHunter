import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";

class KnightPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): KnightPiece {
        return ChessPiece.createInstance("knight", color, position, gameId) as KnightPiece;
    }
    
    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        // Implémentation spécifique pour le cavalier
        //2haut 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`, this.game_id)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2haut 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`, this.game_id)
            && parseInt(this.position[1]) + 2 <= 8 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 2}`);
        }
        //2bas 1gauche
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`, this.game_id)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) - 1 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2bas 1droite
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`, this.game_id)
            && parseInt(this.position[1]) - 2 >= 1 && this.position[0].charCodeAt(0) + 1 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 2}`);
        }
        //2gauche 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`, this.game_id)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2gauche 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`, this.game_id)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) - 2 >= 97){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) - 2)}${parseInt(this.position[1]) - 1}`);
        }
        //2droite 1haut
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`, this.game_id)
            && parseInt(this.position[1]) + 1 <= 8 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) + 1}`);
        }
        //2droite 1bas
        if(!await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`, this.game_id)
            && parseInt(this.position[1]) - 1 >= 1 && this.position[0].charCodeAt(0) + 2 <= 104){
                slotsAvailable.push(`${String.fromCharCode(this.position[0].charCodeAt(0) + 2)}${parseInt(this.position[1]) - 1}`);
        }
        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }
}

export default KnightPiece;