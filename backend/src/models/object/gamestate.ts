import chessPieceService from "../../services/chessPiece.services";
import { chessPieceDto } from "../../dto/chessPiece.dto";

class Gamestate {
    public whitePieces: { [key: string]: chessPieceDto };
    public blackPieces: { [key: string]: chessPieceDto };
    public pieces: { [key: string]: {[key:string]:string} };
    public gameId: number;

    constructor(gameId: number) {
        this.whitePieces = {};
        this.blackPieces = {};
        this.pieces = {};
        this.gameId = gameId;
    }

    public numberToLetter(num: number): string {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        if (num < 1 || num > 26) {
            throw new Error('Le nombre doit être compris entre 1 et 26');
        }
        return alphabet[num - 1];
    }

    public async initStartGame(gameId: number): Promise<void> {
        for (let i = 0; i < 8; i++) {
            let piece = await chessPieceService.createChessPiece('pawn', 'white', `${this.numberToLetter(i+1)}2`, gameId);
            this.whitePieces[piece.position] = piece;
            this.pieces[piece.position] = {pieceType: piece.pieceType, color: piece.color};
            piece = await chessPieceService.createChessPiece('pawn', 'black', `${this.numberToLetter(i+1)}7`, gameId);
            this.pieces[piece.position] = {pieceType: piece.pieceType, color: piece.color};
            this.blackPieces[piece.position] = piece;
        }
        this.whitePieces['a1'] = await chessPieceService.createChessPiece('rook', 'white', 'a1', gameId);
        this.whitePieces['h1'] = await chessPieceService.createChessPiece('rook', 'white', 'h1', gameId);
        this.blackPieces['a8'] = await chessPieceService.createChessPiece('rook', 'black', 'a8', gameId);
        this.blackPieces['h8'] = await chessPieceService.createChessPiece('rook', 'black', 'h8', gameId);
        this.whitePieces['b1'] = await chessPieceService.createChessPiece('knight', 'white', 'b1', gameId);
        this.whitePieces['g1'] = await chessPieceService.createChessPiece('knight', 'white', 'g1', gameId);
        this.blackPieces['b8'] = await chessPieceService.createChessPiece('knight', 'black', 'b8', gameId);
        this.blackPieces['g8'] = await chessPieceService.createChessPiece('knight', 'black', 'g8', gameId);
        this.whitePieces['c1'] = await chessPieceService.createChessPiece('bishop', 'white', 'c1', gameId);
        this.whitePieces['f1'] = await chessPieceService.createChessPiece('bishop', 'white', 'f1', gameId);
        this.blackPieces['c8'] = await chessPieceService.createChessPiece('bishop', 'black', 'c8', gameId);
        this.blackPieces['f8'] = await chessPieceService.createChessPiece('bishop', 'black', 'f8', gameId);
        this.whitePieces['d1'] = await chessPieceService.createChessPiece('queen', 'white', 'd1', gameId);
        this.blackPieces['d8'] = await chessPieceService.createChessPiece('queen', 'black', 'd8', gameId);
        this.whitePieces['e1'] = await chessPieceService.createChessPiece('king', 'white', 'e1', gameId);
        this.blackPieces['e8'] = await chessPieceService.createChessPiece('king', 'black', 'e8', gameId);
        for(const key in this.whitePieces) {
            this.pieces[key] = {pieceType: this.whitePieces[key].pieceType, color: this.whitePieces[key].color};
        }
        for(const key in this.blackPieces) {
            this.pieces[key] = {pieceType: this.blackPieces[key].pieceType, color: this.blackPieces[key].color};
        }
    }


    public async updateGameState(oldPosition: string, position: string): Promise<void> {
        const pieceAtOldPosition = this.pieces[oldPosition];
        if (pieceAtOldPosition) {
            const pieceInfo = { ...pieceAtOldPosition };
            this.pieces[position] = pieceInfo;
            delete this.pieces[oldPosition];
        }


        if (this.whitePieces[oldPosition]) {
            this.whitePieces[position] = this.whitePieces[oldPosition];
            delete this.whitePieces[oldPosition];
        } else if (this.blackPieces[oldPosition]) {
            this.blackPieces[position] = this.blackPieces[oldPosition];
            delete this.blackPieces[oldPosition];
        }
    }

    public async updateGameStateAfterDelete(position: string): Promise<void> {
        if (this.whitePieces[position]) {
            delete this.whitePieces[position];
        } else if (this.blackPieces[position]) {
            delete this.blackPieces[position];
        }
        delete this.pieces[position];
    }

    public async updateGameStateAfterPromote(position: string, pieceType: string): Promise<void> {
        if (this.whitePieces[position]) {
            this.whitePieces[position].pieceType = pieceType;
        } else if (this.blackPieces[position]) {
            this.blackPieces[position].pieceType = pieceType;
        }
        this.pieces[position].pieceType = pieceType;
    }


    async updateGameStateAfterRoque(oldPosition: string, position: string, oldRookPosition: string, rookPosition: string) {

        const pieceAtOldPosition = this.pieces[oldPosition];
        const rookPiece = this.pieces[oldRookPosition];
        if (pieceAtOldPosition) {
            const pieceInfo = { ...pieceAtOldPosition };
            this.pieces[position] = pieceInfo;
            delete this.pieces[oldPosition];
        }
        if (rookPiece) {
            const rookInfo = { ...rookPiece };
            this.pieces[rookPosition] = rookInfo;
            delete this.pieces[oldRookPosition];
        }

        if (this.whitePieces[oldPosition]) {
            this.whitePieces[position] = this.whitePieces[oldPosition];
            delete this.whitePieces[oldPosition];
        } else if (this.blackPieces[oldPosition]) {
            this.blackPieces[position] = this.blackPieces[oldPosition];
            delete this.blackPieces[oldPosition];
        }
        if (this.whitePieces[oldRookPosition]) {
            this.whitePieces[rookPosition] = this.whitePieces[oldRookPosition];
            delete this.whitePieces[oldRookPosition];
        } else if (this.blackPieces[oldRookPosition]) {
            this.blackPieces[rookPosition] = this.blackPieces[oldRookPosition];
            delete this.blackPieces[oldRookPosition];
        }

    }
}

export default Gamestate;