export const API_BASE_URL = 'http://localhost:8000';
export const API_GAME_URL = '/games/';
export const API_BASE_CONNECTION = '';
export const API_SLOTS_AVAILABLE = '/chessPieces/slots-available/';
export const API_MOVE_PIECE = '/chessPieces/move/';

export const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const ROWS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export type Cell = { pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn', color: 'white' | 'black' } | null;