import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Game from "./game.model";
import chessPieceServices from "../services/chessPiece.services";


interface ChessPieceAttributes {
    id: number;
    game_id: number;
    piece_type: string;
    color: string;
    position: string;
    has_moved?: boolean;
    is_captured?: boolean;
}


interface ChessPieceCreationAttributes extends Optional<ChessPieceAttributes, 'id'> {}

class ChessPiece extends Model<ChessPieceAttributes, ChessPieceCreationAttributes> implements ChessPieceAttributes {
    public id!: number;
    public game_id!: number;
    public piece_type!: string;
    public color!: string;
    public position!: string;
    public has_moved!: boolean;
    public is_captured!: boolean;

    public static createInstance(pieceType: string, color: string, position: string, gameId: number): ChessPiece {
        return ChessPiece.build({
            piece_type: pieceType,
            color: color,
            position: position,
            game_id: gameId,
            has_moved: false,
            is_captured: false,
        });
    }


    public moveTo(position: string): void{

    }

    public isPieceAlly(positionX: number, positionY: number): boolean {return true; }

    public getSlotsAvailable(): Promise<string[]> { return Promise.resolve(["oui"]); }

}

ChessPiece.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        piece_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        has_moved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_captured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'ChessPieces',
        sequelize,
    }
);

ChessPiece.belongsTo(Game, { foreignKey: "game_id" });
Game.hasMany(ChessPiece, { sourceKey: "id", foreignKey: "game_id" });



export default ChessPiece;