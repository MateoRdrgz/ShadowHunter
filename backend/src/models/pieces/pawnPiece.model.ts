import ChessPiece from '../chessPiece.model';
import chessPieceServices from "../../services/chessPiece.services";
import moveServices from "../../services/move.services";
import {gameService} from "../../services/game.services";


class PawnPiece extends ChessPiece {


    constructor(pawnPiece : PawnPiece) {
        super(pawnPiece);
    }


    public static createInstance(piece_type: string, color: string, position: string, gameId: number): PawnPiece {
        return ChessPiece.createInstance("pawn", color, position, gameId) as PawnPiece;
    }

    private letterToIndex(letter: string): number {
        return letter.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    public async getSlotsAvailable(): Promise<string[]> {
        let slotsAvailable: string[] = [];
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        //vérification d'une pièce devant le pion
        if((this.position[2]!=='8'&& this.color=='white')||(this.position[2]!=='1'&& this.color=='black')){
            let chessPieceInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) - 1}`, this.game_id);
            if(!chessPieceInfront) {
                slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 1}` : `${this.position[0]}${parseInt(this.position[1]) - 1}`);
            }
        }
        //vérification si le pion n'a pas bougé si il y a une pièce deux cases devant
        if(!this.has_moved){
            let chessPieceTwoInfront : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) + 2}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${this.position[0]}${parseInt(this.position[1]) - 2}`, this.game_id);
            if(!chessPieceTwoInfront) {
                slotsAvailable.push(this.color == 'white' ? `${this.position[0]}${parseInt(this.position[1]) + 2}` : `${this.position[0]}${parseInt(this.position[1]) - 2}`);
            }
        }
        //vérification des pièces à prendre
        let chessPieceLeft : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`, this.game_id);
        if(chessPieceLeft && !await chessPieceServices.isTwoPiecesInSameColor(this.position, this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`, this.game_id)){
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) - 1)}${parseInt(this.position[1]) - 1}`);
        }
        let chessPieceRight : boolean = this.color == 'white' ? await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}`, this.game_id) : await chessPieceServices.isChessPieceInPosition(`${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`, this.game_id);
        if(chessPieceRight && !await chessPieceServices.isTwoPiecesInSameColor(this.position, this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`, this.game_id)){
            slotsAvailable.push(this.color == 'white' ? `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) + 1}` : `${String.fromCharCode(this.position[0].charCodeAt(0) + 1)}${parseInt(this.position[1]) - 1}`);
        }

        return slotsAvailable;
    }

    public async moveTo(position: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        await chessPieceServices.moveTo(this, position);
    }



    public async promotePiece(pieceType: string): Promise<void> {
        if(!await chessPieceServices.isTurn(this.game_id, this.color)){throw new Error("Ce n'est pas à ce joueur de jouer");}
        if(pieceType == 'king' || pieceType == 'pawn') {throw new Error("Le pion ne peut pas être promu en roi ou en pion");}
        const [currentXLetter, currentY] = this.position.split('');
        const newX = this.letterToIndex(currentXLetter)+1;

        if(this.color == 'white') {

            if(parseInt(currentY) == 8 && pieceType != 'pawn' && newX >0 && newX < 9) {
                await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${currentXLetter}${parseInt(currentY)}`, this.game_id,this.has_moved);
            }
        }else {
            if(parseInt(currentY) == 1 && pieceType != 'pawn' && newX >0 && newX < 9) {
                await chessPieceServices.updateChessPiece(this.id, pieceType, this.color, `${currentXLetter}${parseInt(currentY)}`, this.game_id,this.has_moved);
            }
        }

        await gameService.nextTurnAfterPromote(this.game_id, this.position,pieceType);
        console.log(`PawnPiece is promoted to ${pieceType}`);
    }





}

export default PawnPiece;