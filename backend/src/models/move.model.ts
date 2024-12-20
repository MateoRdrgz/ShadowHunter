import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Game from "./game.model";
import ChessPiece from "./chessPiece.model";
import {User} from "./user.model";

interface MoveAttributes {
    id : number;
    game_id : number;
    move_number : number;
    player_id : number;
    piece_id : number;
    from_position : string;
    to_position : string;
    move_time : number;
}


interface MoveCreationAttributes extends Optional<MoveAttributes, 'id'> {}

class Move extends Model<MoveAttributes, MoveCreationAttributes> implements MoveAttributes {
    public id!: number;
    public game_id!: number;
    public move_number!: number;
    public player_id!: number;
    public piece_id!: number;
    public from_position!: string;
    public to_position!: string;
    public move_time!: number;

}


Move.init(
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
        move_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        piece_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from_position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        to_position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        move_time: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'Moves',
        sequelize,
    }
);

Move.belongsTo(Game, { foreignKey: "game_id" });
Game.hasMany(Move, { sourceKey: "id", foreignKey: "game_id" });

Move.belongsTo(ChessPiece, { foreignKey: "piece_id" });
ChessPiece.hasMany(Move, { sourceKey: "id", foreignKey: "piece_id" });

Move.belongsTo(User, { foreignKey: "player_id" });
User.hasMany(Move, { sourceKey: "id", foreignKey: "player_id" });



export default Move;