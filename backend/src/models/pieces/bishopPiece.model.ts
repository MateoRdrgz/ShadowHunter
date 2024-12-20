import ChessPiece from "../chessPiece.model";
import chessPieceServices from "../../services/chessPiece.services";

class BishopPiece extends ChessPiece {
    public static createInstance(piece_type: string, color: string, position: string, gameId: number): BishopPiece {
        return ChessPiece.createInstance("bishop", color, position, gameId) as BishopPiece;
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        //Déplacement du fou
        //haut gauche
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) - 1; i <= 8 && j >= 97; i++, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //haut droite
        for(let i = parseInt(this.position[1]) + 1, j = this.position[0].charCodeAt(0) + 1; i <= 8 && j <= 104; i++, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas gauche
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) - 1; i >= 1 && j >= 97; i--, j--){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }

        //bas droite
        for(let i = parseInt(this.position[1]) - 1, j = this.position[0].charCodeAt(0) + 1; i >= 1 && j <= 104; i--, j++){
            if(await chessPieceServices.isTwoPiecesInSameColor(this.position, `${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
            slotsAvailable.push(`${String.fromCharCode(j)}${i}`);
            if(await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(j)}${i}`, this.game_id)){
                break;
            }
        }
        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }

}

export default BishopPiece;